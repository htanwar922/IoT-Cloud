import { Grid, Stack, Pagination, Popover, Typography, PaginationItem } from "@mui/material"
import { Fragment, useState } from "react"
import { useSelector } from "react-redux"

import Graph from "./Graph/Graph"
import useStyles from './styles'

var setAnchorElGlobal = null
var selectedMetric = null

const MetricPopover = () => {
	const [anchorEl, setAnchorEl] = useState(null)
	setAnchorElGlobal = (anchor, metrics) => {
		if(anchor && anchor.innerText - 1 >= 0)
			selectedMetric = metrics[anchor.innerText - 1]
		else
			selectedMetric = null
		setAnchorEl(anchor)
		console.log('anchor', anchor)
	}

	if(anchorEl && selectedMetric)
		return (
			<Popover id={'metric-popover'}
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				style={{ pointerEvents: 'none'}}
				disableRestoreFocus
			>
				<Typography margin={1} variant="h6">{selectedMetric}</Typography>
			</Popover>
		)
	else
		return <></>
}

export default function Graphs () {
	const classes = useStyles()

	const [page, setPage] = useState(1);

	/** @type {[import("../Applications/Application/Application").graphType]} */
	const graphIds = useSelector(state => state.graphs.map(graph => graph._id))
	const graphMetrics = useSelector(state => state.graphs.map(graph => graph.props.metrics[0]))
	const metrics = [...new Set(graphMetrics)]
	console.log('ReRendered', metrics)

	return (
		<Fragment>
			<Stack spacing={2}>
				<Pagination color="primary" shape="rounded"
					count={metrics.length} page={page}
					onChange={(event, value) => { setPage(value); }}
					sx={{
						bgcolor: 'background.paper',
						boxShadow: 1,
						borderRadius: 2,
						p: 0.5,
						alignSelf: 'center'
					}}
					renderItem={(item) => (
						<PaginationItem
							{...item}
							onMouseEnter={(event) => setAnchorElGlobal(event.currentTarget, metrics)}
							onMouseLeave={() => setAnchorElGlobal(null, null)}
						/>
					)}
				/>
			</Stack>

			<Typography variant="h4" align="center"
				margin={1} padding={1}
				bgcolor='white'
				boxShadow={1}
				borderRadius={2}
			>
				{metrics[page - 1]}
			</Typography>

			<Grid container direction="column" spacing={0} alignItems="center" justifyContent="center">
				{!graphIds.length ? <></> : <>
					{graphIds.map((id, index) =>
						<Grid item key={id} className={classes.graphContainer} maxWidth='lg'>
							<Graph id={id} doRender={metrics[page - 1] === graphMetrics[index]} />
						</Grid>
					)}
				</>}
			</Grid>
			<Stack spacing={2}>
				<Pagination color="primary" shape="rounded"
					count={metrics.length} page={page}
					onChange={(event, value) => { setPage(value); }}
					sx={{
						bgcolor: 'background.paper',
						boxShadow: 1,
						borderRadius: 2,
						p: 0.5,
						alignSelf: 'center'
					}}
					renderItem={(item) => (
						<PaginationItem
							{...item}
							onMouseEnter={(event) => { setAnchorElGlobal(event.currentTarget, metrics); }}
							onMouseLeave={() => setAnchorElGlobal(null, null)}
						/>
					)}
				/>
				<MetricPopover/>
			</Stack>
		</Fragment>
	)
}