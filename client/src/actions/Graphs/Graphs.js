
import * as api from '../../api'
import { actions } from '../../store'

export const createGraph = (graph) => async (dispatch) => {
	try {
		const { data } = await api.createGraph(graph.props)
		graph.data = data
		// console.log('Server response', graph)
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

export const selectGraph = (graphId) => async (dispatch) => {
	try {
		dispatch(actions.selectGraph(graphId))
	} catch (error) {
		console.log(error.message)
	}
}

export const updateGraph = (selectGraph) => async (dispatch) => {
	try {
		// const { data } = await api.updateGraph()
		dispatch(actions.updateGraph(selectGraph))
	} catch (error) {
		console.log(error.message)
	}
}