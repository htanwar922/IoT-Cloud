import { Container } from '@mui/material'
import Plot from 'react-plotly.js'

import useStyles from './styles'

export default function Graph ({ graph }) {
	const classes = useStyles()

	return (
		<Container className={classes.graphContainer} maxWidth='lg'>
			<Plot
				data={[
					{
						x: [1, 2, 3],
						y: [2, 6, 3],
						type: 'scatter',
						mode: 'lines+markers',
						marker: {color: 'red'},
					},
					{
						type: 'bar',
						x: [1, 2, 3],
						y: [2, 5, 3]
					},
				]}
				layout={ {
					// width: '100%',
					title: 'A Fancy Plot'
				} }
			/>
		</Container>
	)
}