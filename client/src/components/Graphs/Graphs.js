import { CircularProgress, Grid } from "@mui/material"
import { useSelector } from "react-redux"

import Graph from "./Graph/Graph"
import useStyles from './styles'

export default function Graphs () {
	const classes = useStyles()

	const graphs = useSelector(state => state.graphs)
	
	return (
		<Grid container direction="column" spacing={0} alignItems="center" justifyContent="center">
			{!graphs.length ? <CircularProgress /> : <>
				{graphs.map((graph, i) => <div key={i}>
					{graph.props.metrics.map(metric =>
						<Grid item key={`${i}_${metric}`} className={classes.graphContainer} maxWidth='lg'>
							<Graph graphId={graph._id} metric={metric}
								xData={graph.data.Timestamp}
								yData={graph.data.Samples[metric]}
							/>
						</Grid>
					)}
				</div>)}
			</>}
		</Grid>
	)
}