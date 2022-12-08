import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, Modal, Stack, TextField, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import { useState } from "react";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';

import useStyles from './styles'
import Graphs from "../../Graphs/Graphs";
import MapBox from "../../Map/MapBox";

/**
 * _Application interface._
 * This will have graphs and a button for adding more graphs.
 * @param {{application: {name: String, alias: String, parameters: [String], parameterAliases: [String]}}} props  
 * @returns Grid
 */
export default function Application ({ application }) {
	const classes = useStyles()

	/** @param event {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} */
	// const handleAddGraph = (event) => {
	// 	event.preventDefault()
	// }

	return (
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
	)
}

/**
 * _Application interface._
 * This will have graphs and a button for adding more graphs.
 * @param {{application: {name: String, alias: String, parameters: [String], parameterAliases: [String]}}} props  
 * @returns React.Fragment
 */
export const ModalBox = ({ application }) => {
	const classes = useStyles()

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleCancel = () => setOpen(false);

	const handleClear = () => {}

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
					<FormGroup>
						<Grid container alignItems="stretch" spacing={3}>
							<Grid item xs='auto' sm='auto'>
								<ModalDateSelector />
								<MetricsGrid metrics={application.parameterAliases} />
							</Grid>
							<Grid item> {/*xs={12} sm={6}*/}
								<MapBox center={[77.18959/*E*/, 28.54513/*N*/]} zoom={17} />
							</Grid>
						</Grid>
					</FormGroup>
				</Box>
			</Modal>
		</>
	)
}

export const ModalDateSelector = () => {
	const [startDate, setStartDate] = useState(dayjs('2022-04-07'));
	const [endDate, setEndDate] = useState(dayjs('2022-04-07'));
	const [rollingPlot, setRollingPlot] = useState(false);

	return (
		<Stack direction='column'>
			<FormControlLabel label={<font size='+2'>Rolling Plot</font>} control={<Checkbox onChange={() => setRollingPlot(!rollingPlot)} />} sx={{p: 2}} />
			<FormControlLabel label={<font size='+1'>Start Date</font>} disabled={rollingPlot} control={
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DateTimePicker disabled={rollingPlot}
						renderInput={(props) => <TextField {...props} />}
						label="DateTimePicker" value={startDate}
						onChange={(newDate) => setStartDate(newDate)}
					/>
				</LocalizationProvider>
			} sx={{p: 2}} />
			<FormControlLabel label={<font size='+1'>End Date</font>} disabled={rollingPlot} control={
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DateTimePicker disabled={rollingPlot}
						renderInput={(props) => <TextField {...props} />}
						label="DateTimePicker" value={endDate}
						onChange={(newDate) => setEndDate(newDate)}
					/>
				</LocalizationProvider>
			} sx={{p: 2}} />
		</Stack>
	)
}

export const MetricsGrid = ({ metrics }) => {
	var columns = [
		{ field: 'id', headerName: 'ID', width: 10 },
		{ field: 'metric', headerName: 'Metrics', width: 250 }
	]
	var rows = metrics.map((metric, i) => ({ id: i+1, metric: metric}))
	return (
		<Box sx={{ width: '100%' }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={6}
				rowsPerPageOptions={[6, 6]}
				autoHeight
				checkboxSelection
				disableSelectionOnClick
				experimentalFeatures={{ newEditingApi: true }}
			/>
		</Box>
	);
}