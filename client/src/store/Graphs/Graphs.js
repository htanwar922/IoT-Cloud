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
			action.payload.props.metrics.forEach(metric => {
				state.graphs.push({
					...action.payload,
					_id: uuidv4(),
					props: {
						...action.payload.props,
						metrics: [metric]
					},
					data: {
						...action.payload.data,
						Samples: (() => {
							var object = {}
							object[metric] = action.payload.data.Samples[metric]
							return object
						})()
					},
				})
			})
		},

		streamGraph (state, action) {		// payload - {graph, data}
			let index = findElementById(state.graphs, action.payload.graph._id)
			if(index === -1)
				return
			var metric = state.graphs[index].props.metrics[0]
			state.graphs[index].props = action.payload.props
			state.graphs[index].data.Timestamp = [
				state.graphs[index].props.startDate,
				...action.payload.data.Timestamp,
				state.graphs[index].props.endDate
			]
			state.graphs[index].data.Samples[metric] = [
				state.graphs[index].data.Timestamp.length === 2 ? 0 : null,
				...action.payload.data.Samples[metric],
				state.graphs[index].data.Timestamp.length === 2 ? 0 : null
			]

			// var sortIndex = argSort(state.graphs[index].data.Timestamp)
			// state.graphs[index].data.Timestamp = arraySliceAt(state.graphs[index].data.Timestamp, sortIndex)
			// state.graphs[index].data.Samples[metric] = arraySliceAt(state.graphs[index].data.Samples[metric], sortIndex)
			
			state.graphs[index].props.endDate = dayjs(
					action.payload.data.Timestamp[action.payload.data.Timestamp.length - 1]
				).add(state.graphs[index].props.rollingIntervalSeconds, 'second').toISOString()
			
			console.log('Len', state.graphs[index].data.Timestamp.length)
		},

		rollGraph (state, action) {		// payload - {graph, data}
			let index = findElementById(state.graphs, action.payload.graph._id)
			if(index === -1)
				return
			console.log(action.payload)
			var metric = state.graphs[index].props.metrics[0]
			state.graphs[index].props = action.payload.props
			state.graphs[index].data.Timestamp = [
				state.graphs[index].props.startDate,
				...action.payload.data.Timestamp,
				state.graphs[index].props.endDate
			]
			state.graphs[index].data.Samples[metric] = [
				state.graphs[index].data.Timestamp.length === 2 ? 0 : null,
				...action.payload.data.Samples[metric],
				state.graphs[index].data.Timestamp.length === 2 ? 0 : null
			]

			// var sortIndex = argSort(state.graphs[index].data.Timestamp)
			// state.graphs[index].data.Timestamp = arraySliceAt(state.graphs[index].data.Timestamp, sortIndex)
			// state.graphs[index].data.Samples[metric] = arraySliceAt(state.graphs[index].data.Samples[metric], sortIndex)
			
			state.graphs[index].props.endDate = dayjs(
					action.payload.data.Timestamp[action.payload.data.Timestamp.length - 1]
				).add(state.graphs[index].props.rollingIntervalSeconds, 'second').toISOString()
			
			console.log('Len', state.graphs[index].data.Timestamp.length)
		},

		selectGraph (state, action) {	// payload - graph id
			state.selectedGraphId = action.payload
		},

		updateGraph (state, action) {	// payload - current graph
			let index = findElementById(state.graphs, state.selectedGraphId)
			state.graphs.splice(index + 1, 0, ...action.payload.props.metrics.map(metric => ({
					...action.payload,
					_id: uuidv4(),
					props: {
						...action.payload.props,
						metrics: [metric]
					},
					data: {
						...action.payload.data,
						Samples: (() => {
							var object = {}
							object[metric] = action.payload.data.Samples[metric]
							return object
						})()
					}
				})
			))
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