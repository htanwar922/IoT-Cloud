import dayjs from 'dayjs'
import minMax from 'dayjs/plugin/minMax'
import duration from 'dayjs/plugin/duration'
import * as api from '../../api'
import { actions } from '../../store'

/**
 * _Create Graph._
 * Add new graphs to state.graphs
 * @param {import('../../components/Applications/Application/Application').graphType} graph
 * @returns 
 */
export const createGraph = (graph) => async (dispatch) => {
	try {
		if(graph.props.rollingPlot) {
			graph.props.startDate = dayjs().subtract(dayjs.duration({'minutes': graph.props.rollingWindowWidthMinutes})).toISOString()
			graph.props.endDate = dayjs().toISOString()

			// graph.props.startDate = dayjs('Jun 14 2022 20:30:00.000 GMT+0530 (India Standard Time)',
			// 	'MMM D YYYY HH:mm:ss.SSS').subtract(dayjs.duration({'days' : 1})).toISOString()
			// graph.props.endDate = dayjs('Jun 14 2022 20:30:00.000 GMT+0530 (India Standard Time)',
			// 	'MMM D YYYY HH:mm:ss.SSS').add(dayjs.duration({'days' : 1})).toISOString()
		}
		console.log('CREATE', graph.props)
		const { data } = await api.fetchData(graph.props)
		graph.data = data
		dispatch(actions.createGraph(graph))
	} catch (error) {
		console.log(error.message)
	}
}

/**
 * 
 * @param {import('../../components/Applications/Application/Application').graphType} graph
 * @returns 
 */
export const streamGraph = (graph, mRef) => async (dispatch) => {
	try {
		var lastTimestamp = graph.data.Timestamp[graph.data.Timestamp.length - 1]
		lastTimestamp = lastTimestamp ? lastTimestamp : graph.props.endDate
		const { data } = await api.fetchData({
			...graph.props,
			startDate:
					dayjs(lastTimestamp).add(dayjs.duration({
						'seconds': graph.props.rollingIntervalSeconds - 1
					})).toISOString(),
			endDate:
					dayjs.min(
						dayjs(),
						dayjs(lastTimestamp).add(dayjs.duration({
							'days' : mRef.current,
						}))
					).toISOString()
		})

		console.log(mRef.current, 'Len', graph.data.Timestamp.length, data.Timestamp.length)

		if(!data.Timestamp.length) {
			console.log(lastTimestamp, dayjs(lastTimestamp).add(dayjs.duration({'days' : mRef.current})).toString(), dayjs().toString())
			if(dayjs(lastTimestamp).add(dayjs.duration({'days' : mRef.current})) < dayjs())
				mRef.current += 1
			return
		}
		mRef.current = 1
		dispatch(actions.streamGraph({graph, data}))
	} catch (error) {
		console.log(error.message)
	}
}

/**
 * 
 * @param {import('../../components/Applications/Application/Application').graphType} graph
 * @returns 
 */
 export const rollGraph = (graph, mRef) => async (dispatch) => {
	try {
		const props = {
			...graph.props,
			startDate:
					dayjs().subtract(dayjs.duration({
						'minutes': graph.props.rollingWindowWidthMinutes
					})).toISOString(),
			endDate:
					dayjs().toISOString()
		}
		const { data } = await api.fetchData(props)
		console.log('HERE', props, data)
		dispatch(actions.rollGraph({graph, props, data}))
	} catch (error) {
		console.log(error.message)
	}
}

/**
 * 
 * @param {String} graphId 
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
 * @param {import('../../components/Applications/Application/Application').graphType} graph
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
 * @param {String} graphId 
 * @returns 
 */
export const removeGraph = (graphId) => async (dispatch) => {
	try {
		dispatch(actions.removeGraph(graphId))
	} catch (error) {
		console.log(error.message)
	}
}

dayjs.extend(minMax)
dayjs.extend(duration)