import { configureStore, createSlice } from '@reduxjs/toolkit';

const graphPropertiesSlice = createSlice({
	name: 'GraphProperties',
	initialState: {
		graphs: []
		// rolling: true,
		// startDate: '',
		// endDate: '',
		// metrics: [],
		// locations: [],
		// data: {
		// 	timestamps: [],
		// 	samples: []
		// }
	},
	reducers: {
		createGraph (state, action) {
			state.graphs += action.payload
		},
		updateGraph (state, action) {
			state.graphs
		}
	}
})