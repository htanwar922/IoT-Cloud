import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'

const graphsSlice = createSlice({
	name: 'GraphProperties',
	initialState: {
		graphs: [],
		selectedGraphId: null
	},
	reducers: {	// must be 'pure' functions - now async/await - not able to call api directly. (Themselves are API.)

		createGraph (state, action) {
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
					}
				})
			})
		},

		rollGraphs (state, action) {

		},

		selectGraph (state, action) {
			state.selectedGraphId = action.payload
			console.log('Selected', action.payload)
		},

		updateGraph (state, action) {
			let index = findElementById(state.graphs, state.selectedGraphId)
			state.graphs.splice(index, 1, ...action.payload.props.metrics.map(metric => ({
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
			state.selectedGraphId = null
		},

		removeGraph (state, action) {
			let index = findElementById(state.graphs, action.payload)
			if(index !== -1)
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