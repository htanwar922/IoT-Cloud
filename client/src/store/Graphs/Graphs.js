import { createSlice } from '@reduxjs/toolkit';

const graphsSlice = createSlice({
	name: 'GraphProperties',
	initialState: {
		graphs: [],
		selectedGraph: undefined
	},
	reducers: {	// must be 'pure' functions - now async/await - not able to call api directly. (Themselves are API.)
		createGraph (state, action) {
			// console.log('Client action', action)
			state.graphs.push(action.payload)
		},
		rollGraphs(state, action) {

		},
		selectGraph(state, action) {
			state.selectedGraph = action.payload
		},
		updateGraph (state, action) {
			// state.graphs
		},
	}
})

export default graphsSlice