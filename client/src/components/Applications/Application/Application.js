import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, Grow, Modal, Stack, TextField, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import { useEffect, useState } from "react";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useDispatch, useSelector } from "react-redux";

import useStyles from './styles'
import Graphs from "../../Graphs/Graphs";
import MapBox from "../../Map/MapBox";
import Props from "../../utils/Props";
import actions from '../../../actions'

/**
 * _Application interface._
 * This will have graphs and a button for adding more graphs.
 * @param {{application: import("../Applications").applicationType}} props  
 * @returns Grid
 */
export default function Application ({ application }) {
	const classes = useStyles()

	return (
		<Grow in>
			<Container>
				<Stack direction="column" alignItems="stretch" gap={3} marginBottom={5}>
					<Container className={classes.appTitle} maxWidth='lg'>
						<Typography variant="h2" align="center">{application.name}</Typography>
					</Container>
					
					<Container className={classes.graphsContainer} maxWidth='lg'>
							<Graphs />
					</Container>
					
					<Box maxWidth="lg" className={classes.newGraphButton}>
							<ModalBox application={application} />
					</Box>
				</Stack>
			</Container>
		</Grow>
	)
}

/**
 * _Modal interface._
 * This will have graphs and a button for adding more graphs.
 * @param {{
 * 		application: import("../Applications").applicationType,
 * }} props
 * @returns React.Fragment
 */
const ModalBox = ({ application }) => {
	const classes = useStyles()
	const dispatch = useDispatch()

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleCancel = () => {
		setOpen(false);
		dispatch(actions.selectGraph(null))
	}

	const [formState, setFormState] = useState(defaultGraph(application))

	const selectedGraph = useSelector(state =>
		state.selectedGraphId ?
		state.graphs.find(graph => graph._id === state.selectedGraphId) :
		null
	)

	useEffect(() => {
		if(selectedGraph) {
			setFormState(selectedGraph)
			setOpen(true)
		}
	}, [selectedGraph])

	/** @param event {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} */
	const handleSubmit = (event) => {
		event.preventDefault()
		if(!selectedGraph)
			dispatch(actions.createGraph(formState))
		else {
			dispatch(actions.updateGraph(formState))
		}
		console.log('FormState', formState)
		handleClear()
		setOpen(false)
	}

	/** @param event {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} */
	const handleClear = () => {
		setFormState(defaultGraph(application))
	}

	return (
		<>
			<Button className={classes.newGraphButton} variant='outlined' onClick={handleOpen}>
				<AddCircleIcon fontSize="large" />
			</Button>

			<Modal className={classes.modalObject} open={open} onClose={handleCancel} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
				<Box className={classes.modalBox}>

					<Stack direction='row'>
						<Container className={classes.appTitle} maxWidth='lg'>
							<Typography variant="h2" align="center">{application.name}</Typography>
						</Container>
						<Button variant='text' onClick={handleClear}>
							<BackspaceRoundedIcon fontSize="large" />
						</Button>
						<Button variant='text' onClick={handleCancel}>
							<CloseRoundedIcon fontSize="large" />
						</Button>
					</Stack>
					
					<FormGroup onSubmit={handleSubmit}>
							<Grid container alignItems="stretch" spacing={3}>
								<Grid item> {/*xs={12} sm={6}*/}
									<Props formState={formState} setFormState={setFormState}>
										<MapBox center={[77.18959/*E*/, 28.54513/*N*/]} zoom={17} />
									</Props>
								</Grid>

								<Grid item xs='auto' sm='auto'>
									<Props formState={formState} setFormState={setFormState}>
										<ModalDateSelector />
										<MetricsGrid metrics={application.parameters} metricAliases={application.parameterAliases} />
									</Props>

									<Button variant="contained" type="submit" onClick={handleSubmit}> {/*sx={{ position: "fixed", bottom: 0, right: 0 }}*/}
										{!selectedGraph ? 'Submit' : 'Update'}
									</Button>
								</Grid>
							</Grid>
					</FormGroup>

				</Box>
			</Modal>
		</>
	)
}

const ModalDateSelector = ({ formState, setFormState }) => {
	return (
		<Stack direction='column'>
			<FormControlLabel label={<font size='+2'>Rolling Plot</font>} sx={{p: 2}} control={
				<Checkbox name="rollingPlot" defaultChecked
					onChange={(event) => setFormState({...formState, props: {...formState.props, rollingPlot: event.target.checked}})
				} />
			} />
			
			<FormControlLabel disabled={formState.props.rollingPlot} sx={{p: 2}} control={
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DateTimePicker name='startDate' disabled={formState.props.rollingPlot}
						renderInput={(props) => <TextField onKeyDown={(event) => event.preventDefault()} {...props} />}
						label={<font size='+2'><em><b>Start Date</b></em></font>} value={formState.props.startDate}
						onChange={(newDate) => setFormState({...formState, props: {...formState.props, startDate: newDate.toISOString()}})}
					/>
				</LocalizationProvider>
			} />
			
			<FormControlLabel disabled={formState.props.rollingPlot} sx={{p: 2}} control={
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DateTimePicker name='endDate' disabled={formState.props.rollingPlot}
						renderInput={(props) => <TextField onKeyDown={(event) => event.preventDefault()} {...props} />}
						label={<font size='+2'><em><b>End Date</b></em></font>} value={formState.props.endDate}
						onChange={(newDate) => setFormState({...formState, props: {...formState.props, endDate: newDate.toISOString()}})}
					/>
				</LocalizationProvider>
			} />
		</Stack>
	)
}

const MetricsGrid = ({ metrics, metricAliases, formState, setFormState }) => {
	var columns = [
		{ field: 'id', headerName: 'ID', width: 10 },
		{ field: 'metric', headerName: 'Metrics', width: 250 }
	]
	var rows = metricAliases.map((metricName, i) => ({ id: i+1, metric: metricName}))
	return (
		<Box sx={{ width: '100%', marginBottom: 3 }}>
			<DataGrid sx={{maxWidth: 400}}
				rows={rows}
				columns={columns}
				// pageSize={6}
				rowsPerPageOptions={[5, 6, 10, 20, 100]}
				autoHeight
				checkboxSelection
				disableSelectionOnClick
				experimentalFeatures={{ newEditingApi: true }}
				onSelectionModelChange={(indices) => setFormState({...formState,
					props: {...formState.props,
						metrics: indices.map(index => metrics[index - 1]),
						metricAliases: indices.map(index => metricAliases[index - 1])
					}
				})}
			/>
		</Box>
	);
}

/**
 * @typedef {{
 * 		_id: String,
 * 		props: {
 *			rollingPlot: Boolean,
 *			rollingWindowWidthMinutes: Number,
 *			rollingIntervalSeconds: Number,
 *			startDate: String,
 *			endDate: String,
 *			metrics: [String],
 *			metricAliases: [String]
 *			location: String,
 *		},
 *		data: {
 *			Timestamp: [String],
 *			Samples: {}
 *		},
 * }} graphType
 * /

/** 
 * Returns default form/graph state for application.
 * @param {import("../Applications").applicationType} application
 * @return {graphType}
 */
const defaultGraph = (application) => ({
	_id: null,
	props: {
		applicationName: application.alias,
		rollingPlot: true,
		rollingWindowWidthMinutes: 20,
		rollingIntervalSeconds: 5,
		startDate: dayjs('Jun 14 2022 20:30:00.000 GMT+0530 (India Standard Time)',
						'MMM D YYYY HH:mm:ss.SSS').toISOString(),
		endDate: dayjs().toISOString(),
		metrics: [],
		metricAliases: [],
		location: 'Bharti-Building',
	},
	data: {
		Timestamp: [],
		Samples: {}
	},
})

dayjs.extend(customParseFormat)