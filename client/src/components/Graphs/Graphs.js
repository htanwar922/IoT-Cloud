import { CircularProgress, Grid, Stack, Pagination } from "@mui/material"
import { Fragment, useState } from "react"
import { useSelector } from "react-redux"

import Graph from "./Graph/Graph"
import useStyles from './styles'

export default function Graphs () {
	const classes = useStyles()

	const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

	/** @type {[import("../Applications/Application/Application").graphType]} */
	const graphIds = useSelector(state => state.graphs.map(graph => graph._id))
	// console.log('ReRendered', Array(graphIds.length))

	return (
		<Fragment>
			<Stack spacing={2}>
				<Pagination count={10} variant="outlined" shape="rounded" page={page} onChange={handleChange} />
			</Stack>
			<Grid container direction="column" spacing={0} alignItems="center" justifyContent="center">
				{!graphIds.length ? <CircularProgress /> : <>
					{graphIds.map(id =>
						<Grid item key={id} className={classes.graphContainer} maxWidth='lg'>
							<Graph id={id} />
						</Grid>
					)}
				</>}
			</Grid>
			<Stack spacing={2}>
				<Pagination count={10} variant="outlined" shape="rounded" page={page} onChange={handleChange} />
			</Stack>
		</Fragment>
	)
}