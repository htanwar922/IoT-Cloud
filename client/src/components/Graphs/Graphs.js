import { CircularProgress } from "@mui/material"
import { useState } from "react"

import Graph from "./Graph/Graph"

export default function Graphs () {
	const graphs = useState((state) => state.graphs)
	return (
		!(graphs.length + 1) ? <CircularProgress /> : (
			<>
			{
				graphs.map((graph, i) => {
					<Graph key={i} graph={graph} />
				})
			}
			</>
		)
	)
}