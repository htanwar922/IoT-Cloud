import { CircularProgress, Grid } from "@mui/material"
import { useSelector } from "react-redux"

import Graph from "./Graph/Graph"
import useStyles from './styles'

export default function Graphs () {
	const classes = useStyles()

	/** @type {[import("../Applications/Application/Application").graphType]} */
	const graphIds = useSelector(state => state.graphs.map(graph => graph._id))
	// console.log('ReRendered', Array(graphIds.length))

	return (
		<Grid container direction="column" spacing={0} alignItems="center" justifyContent="center">
			{!graphIds.length ? <CircularProgress /> : <>
				{graphIds.map(id =>
					<Grid item key={id} className={classes.graphContainer} maxWidth='lg'>
						<Graph id={id} />
					</Grid>
				)}
			</>}
		</Grid>
	)
}