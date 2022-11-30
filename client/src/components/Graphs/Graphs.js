import Graph from "./Graph/Graph"

export default function Graphs () {
	var graphs = []
	for (let i = 0; i < 2; i++) {
		graphs.push(<Graph key={i} />)
	}
	return (
		<>
			<h1>Graphs</h1>
			{graphs}
		</>
	)
}