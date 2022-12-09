import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'

const graphsSlice = createSlice({
	name: 'GraphProperties',
	initialState: {
		graphs: [],
		selectedGraph: undefined
	},
	reducers: {	// must be 'pure' functions - now async/await - not able to call api directly. (Themselves are API.)
		createGraph (state, action) {
			action.payload.props.metrics.forEach(metric => {
				state.graphs.push({
					_id: uuidv4(),
					...action.payload,
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
			state.selectedGraph = action.payload
		},
		updateGraph (state, action) {
			// state.graphs
		},
		removeGraph (state, action) {
			
		}
	}
})

export default graphsSlice