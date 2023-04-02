import { dbCollection } from "../models/models.js"

// Creating handlers for routes (definitions)

export const createGraph = async (req, res) => {
	console.log(req.body)
	if(Object.keys(req.body).length === 0 )
	{
		res.send("Invalid Request\n")
		return;
	}
	
	var element = req.body
	var dateIST_From = new Date(element.startDate)	// 'Jun 16 2022 14:00:00.000 GMT+0530 (India Standard Time)'
	if(element.endDate)
		var dateIST_To = new Date(element.endDate)	// 'Jun 16 2022 16:00:00.000 GMT+0530 (India Standard Time)'
	else
	{
		var dateIST_To = new Date(dateIST_From)
		dateIST_To.setDate(dateIST_To.getDate() + 1)
	}

	var query = { Timestamp: {}, Location: element.locations[0] }
	query.Timestamp['$gte'] = dateIST_From.toISOString()
	if(element.endDate)
		query.Timestamp['$lt'] = dateIST_To.toISOString()
	console.log('QUERY', query)

	var response = {
		Timestamp: [],
		Samples: {}
	}

	await dbCollection(req.body.applicationName).find(query).exec()
		.then(docs => {
			element.metrics.forEach(metric => response.Samples[metric] = [])
			docs.sort(GetSortOrder('Timestamp')).forEach(doc => {
				response.Timestamp.push(doc.Timestamp)
				element.metrics.forEach(metric => {
					response.Samples[metric].push(doc[metric])
				})
			})
		})
		.catch(error => {
			console.error(error)
		})
	
	// console.log(response)
	res.send(JSON.stringify(response))
	res.end()
}

const GetSortOrder = (prop) => (a, b) => {
	if (a[prop] > b[prop])
		return 1
	else if (a[prop] < b[prop])
		return -1
	return 0
}