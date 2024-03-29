import dayjs from 'dayjs'

import ApplicationList from '../config/Applications.js';
import './Schemas/Schemas.js'

/**
 * Access database by appliction name (alias).
 * @param {import('../config/Applications.js').applicationType} applicationName Alias used in Application List.
 * @returns {import("mongoose").Model} Mongoose model.
 */
export function dbCollection(applicationName) {
	for(const application of ApplicationList) {
		if(applicationName === application.alias)
			return application.connection.models[`Test-${application.alias}`]
	}
}

ApplicationList.forEach(application => {
	application.connection.model(`Test-${application.alias}`, application.schema)	//, application.collectionName)
});

var dateIST = dayjs('Jun 16 2023 20:30:00.000 GMT+0530 (India Standard Time)', 'MMM D YYYY HH:mm:ss.SSS')
console.log(await dbCollection('APMD').findOne({ Timestamp: { $lte: dateIST.toISOString() } }))
console.log(await dbCollection('SM').findOne({}))
console.log(dateIST.toString())