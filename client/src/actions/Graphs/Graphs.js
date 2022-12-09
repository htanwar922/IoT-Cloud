import * as api from '../../api'
import { actions } from '../../store'

/**
 * Add new graphs to state.graphs
 * @param {{
 * 		_id: String,
 * 		props: {
 *			rollingPlot: Boolean,
 *			startDate: String,
 *			endDate: String,
 *			metrics: [String],
 *			location: String,
 *		},
 *		data: {
 *			Timestamp: [String],
 *			Samples: {}
 *		}
 * }} graph
 * @returns 
 */
export const createGraph = (graph) => async (dispatch) => {
	try {
		const { data } = await api.fetchData(graph.props)
		graph.data = data
		dispatch(actions.createGraph(graph))
	} catch (error) {
		console.log(error.message)
	}
}


export const rollGraphs = () => async (dispatch) => {
	try {
		// const { data } = await api.rollGraphs()
		dispatch(actions.rollGraphs)
	} catch (error) {
		console.log(error.message)
	}
}

/**
 * 
 * @param {Number} graphId 
 * @returns 
 */
 export const selectGraph = (graphId) => async (dispatch) => {
	try {
		dispatch(actions.selectGraph(graphId))
	} catch (error) {
		console.log(error.message)
	}
}

/**
 * 
 * @param {Object} graph
 * @returns 
 */
export const updateGraph = (graph) => async (dispatch) => {
	try {
		var newGraph = graph
		const { data } = await api.fetchData(newGraph.props)
		newGraph.data = data
		dispatch(actions.updateGraph(newGraph))
	} catch (error) {
		console.log(error.message)
	}
}

/**
 * 
 * @param {Number} graphId 
 * @returns 
 */
export const removeGraph = (graphId) => async (dispatch) => {
	try {
		dispatch(actions.removeGraph(graphId))
	} catch (error) {
		console.log(error.message)
	}
}