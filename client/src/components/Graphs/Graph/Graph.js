import { Button, Grid, Popover, Stack } from '@mui/material'
import { Fragment, useEffect, useRef, useState } from 'react'
import Plot from 'react-plotly.js'
import EditRounded from '@mui/icons-material/EditRounded'
import CloseRounded from '@mui/icons-material/CloseRounded'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'

import useStyles from './styles'
import actions from '../../../actions'

// var rollDispatched = false

export default function Graph ({ id, doRender }) {
	const classes = useStyles()
	const dispatch = useDispatch()

	/** @type {import('../../Applications/Application/Application').graphType} */
	const graph = useSelector(state => state.graphs.find(graph => graph._id === id))

	const graphId = graph._id
	const metric = graph.props.metrics[0]
	const location = graph.props.locations[0]
	const metricLabel = graph.props.metricAliases[0]
	const rollingInterval = graph.props.rollingIntervalSeconds * 1000

	const timerIdRef = useRef(null)
	const mRef = useRef(1)

	var xData = graph.data.Timestamp[location].map(timestamp => dayjs(timestamp).add(5*60+30, 'minute').toISOString())
	var yData = graph.data.Samples[location][metric]
	
	const [timerId, setTimerId] = useState(null)

	useEffect(() => {
		// console.log('TID', timerId, timerIdRef.current)
		if(graph.props.rollingPlot) {	// && timerId === null
			// if(rollDispatched)
			// 	return
			// rollDispatched = true
			clearInterval(timerIdRef.current)
			clearInterval(timerId)
			var tid = setInterval(() => {
				dispatch(actions.rollGraph(graph, mRef))
				// rollDispatched = false
			}, rollingInterval)
			setTimerId(tid)
			timerIdRef.current = tid
			// console.log('Roll', tid)
			// console.log(timerIdRef.current)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setTimerId, graph])

	// useEffect(() => {
	// 	clearInterval(timerIdRef.current)
	// 	clearInterval(timerId)
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [graphId])

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleEdit = () => {
		clearInterval(timerIdRef.current)
		clearInterval(timerId)
		dispatch(actions.selectGraph(graphId))
		setAnchorEl(null)
	}

	const handleClose = () => {
		// console.log('CTID', timerId, timerIdRef.current)
		clearInterval(timerId)
		clearInterval(timerIdRef.current)
		dispatch(actions.removeGraph(graphId))
	}

	if(!doRender)
		return <></>
	return (
		<Grid item key={id} className={classes.graphContainer} maxWidth='lg'>
			<Plot data={[{
					x: xData,
					y: yData,
					type: 'time',
					// mode: 'lines+markers',
					marker: {color: `#${Math.floor(Math.random() * 0xffffff).toString(16)}`},
				}]}
				layout={{
					width: '1080',
					title: `${location}`,
					xaxis: {
						title: 'Timeseries',
						type: 'time',
						zeroline: false
					},
					yaxis: {
						title: `${metricLabel}`,
					}
				}}
			/>
			<div className={classes.overlay}>
				<Button variant='text' onClick={handleClose}>
					<CloseRounded />
				</Button>
				<Button size='small' onClick={(event) => setAnchorEl(event.currentTarget)}>
					<EditRounded />
				</Button>
			</div>
			<Popover open={open} anchorEl={anchorEl}
				id={open ? 'simple-popover' : undefined}
				onClose={() => setAnchorEl(null)}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Stack>
					<Button variant='outlined' onClick={handleEdit}>
						Edit
					</Button>
				</Stack>
			</Popover>
		</Grid>
	)
}