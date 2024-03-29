import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid'

const graphsSlice = createSlice({
	name: 'GraphProperties',
	initialState: {
		graphs: [],
		selectedGraphId: null
	},
	reducers: {	// must be 'pure' functions - no async/await - not able to call api directly.
		// (Themselves are API - deep inner content not visible outside to reducer-user.)

		createGraph (state, action) {	// payload - graph
			action.payload.props.metrics.forEach((metric, i) => {
				action.payload.props.locations.forEach((location, j) => {
					state.graphs.push({
						...action.payload,
						_id: uuidv4(),
						props: {
							...action.payload.props,
							metrics: [metric],
							metricAliases: [action.payload.props.metricAliases[i]],
							locations: [location]
						},
						data: {
							...action.payload.data,
							Timestamp: (() => {
								var object = {}
								object[location] = action.payload.data.Timestamp[location]
								return object
							})(),
							Samples: (() => {
								var object = {}
								object[location] = {}
								object[location][metric] = action.payload.data.Samples[location][metric]
								return object
							})(),
						},
					})
				})
			})
		},

		streamGraph (state, action) {		// payload - {graph, data}
			let index = findElementById(state.graphs, action.payload.graph._id)
			if(index === -1)
				return
			var metric = state.graphs[index].props.metrics[0]
			var location = state.graphs[index].props.locations[0]
			state.graphs[index].props = action.payload.props
			state.graphs[index].data.Timestamp[location] = [
				state.graphs[index].props.startDate,
				...action.payload.data.Timestamp[location],
				state.graphs[index].props.endDate
			]
			state.graphs[index].data.Samples[location][metric] = [
				state.graphs[index].data.Timestamp[location].length === 2 ? 0 : null,
				...action.payload.data.Samples[location][metric],
				state.graphs[index].data.Timestamp[location].length === 2 ? 0 : null
			]

			// var sortIndex = argSort(state.graphs[index].data.Timestamp[location])
			// state.graphs[index].data.Timestamp[location] = arraySliceAt(state.graphs[index].data.Timestamp[location], sortIndex)
			// state.graphs[index].data.Samples[location][metric] = arraySliceAt(state.graphs[index].data.Samples[location][metric], sortIndex)
			
			state.graphs[index].props.endDate = dayjs(
					action.payload.data.Timestamp[location][action.payload.data.Timestamp[location].length - 1]
				).add(state.graphs[index].props.rollingIntervalSeconds, 'second').toISOString()
			
			console.log('Len', state.graphs[index].data.Timestamp[location].length)
		},

		rollGraph (state, action) {		// payload - {graph, data}
			let index = findElementById(state.graphs, action.payload.graph._id)
			if(index === -1)
				return
			console.log(action.payload)
			var metric = state.graphs[index].props.metrics[0]
			var location = state.graphs[index].props.locations[0]
			state.graphs[index].props = action.payload.props
			state.graphs[index].data.Timestamp[location] = [
				state.graphs[index].props.startDate,
				...action.payload.data.Timestamp[location],
				state.graphs[index].props.endDate
			]
			state.graphs[index].data.Samples[location][metric] = [
				state.graphs[index].data.Timestamp[location].length === 2 ? 0 : null,
				...action.payload.data.Samples[location][metric],
				state.graphs[index].data.Timestamp[location].length === 2 ? 0 : null
			]

			// var sortIndex = argSort(state.graphs[index].data.Timestamp[location])
			// state.graphs[index].data.Timestamp[location] = arraySliceAt(state.graphs[index].data.Timestamp[location], sortIndex)
			// state.graphs[index].data.Samples[location][metric] = arraySliceAt(state.graphs[index].data.Samples[location][metric], sortIndex)
			
			state.graphs[index].props.endDate = dayjs(
					action.payload.data.Timestamp[location][action.payload.data.Timestamp[location].length - 1]
				).add(state.graphs[index].props.rollingIntervalSeconds, 'second').toISOString()
			
			console.log('Len', state.graphs[index].data.Timestamp[location].length)
		},

		selectGraph (state, action) {	// payload - graph id
			state.selectedGraphId = action.payload
		},

		updateGraph (state, action) {	// payload - current graph
			let index = findElementById(state.graphs, state.selectedGraphId)
			state.graphs.splice(index + 1, 0, ...action.payload.props.metrics.forEach((metric, i) => {
				action.payload.props.locations.forEach((location, j) => {
					state.graphs.push({
						...action.payload,
						_id: uuidv4(),
						props: {
							...action.payload.props,
							metrics: [metric],
							metricAliases: [action.payload.props.metricAliases[i]],
							locations: [location]
						},
						data: {
							...action.payload.data,
							Timestamp: (() => {
								var object = {}
								object[location] = action.payload.data.Timestamp[location]
								return object
							})(),
							Samples: (() => {
								var object = {}
								object[location] = {}
								object[location][metric] = action.payload.data.Samples[location][metric]
								return object
							})(),
						},
					})
				})
			}))
			graphsSlice.caseReducers.removeGraph(state, {payload: state.selectedGraphId})
			state.selectedGraphId = null
		},

		removeGraph (state, action) {	// payload - graph id
			let index = findElementById(state.graphs, action.payload)
			state.graphs.splice(index, 1)
		}
	}
})

export default graphsSlice

const findElementById = (array, id) => {
	for (let index = 0; index < array.length; index++) {
		if(array[index]._id === id) {
			return index
		}
	}
	return -1;
}

// const argSort = array =>
// 	array.map((value, index) => [value, index])
// 	.sort()
// 	.map((_, index) => index)

// const arraySliceAt = (array, indices) =>
// 	indices.map(index =>array[index])