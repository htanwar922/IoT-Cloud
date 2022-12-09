import { Button, Popover, Stack } from '@mui/material'
import { Fragment, useState } from 'react'
import Plot from 'react-plotly.js'
import EditRounded from '@mui/icons-material/EditRounded'
import CloseRounded from '@mui/icons-material/CloseRounded'
import { useDispatch } from 'react-redux'

import useStyles from './styles'
import actions from '../../../actions'

export default function Graph ({ graphId, metric, xData, yData }) {
	const classes = useStyles()
	const dispatch = useDispatch()

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleEdit = () => {
		dispatch(actions.selectGraph(graphId))
		setAnchorEl(null)
	}

	const handleClose = () => {
		dispatch(actions.removeGraph(graphId))
	}

	return (
		<Fragment>
			<Plot data={[{
					x: xData,
					y: yData,
					type: 'time',
					// mode: 'lines+markers',
					marker: {color: `#${Math.floor(Math.random() * 0xffffff).toString(16)}`},
				}]}
				layout={{
					width: '1080',
					title: `${metric}`,
					xaxis: {
						title: 'Timeseries',
						type: 'time',
						zeroline: false
					},
					yaxis: {
						title: `${metric}`,
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
		</Fragment>
	)
}