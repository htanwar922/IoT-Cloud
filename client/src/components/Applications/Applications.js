import { Button, Grid, Link, Typography } from "@mui/material";
import { Route } from 'react-router-dom'

import Application from "./Application/Application";
import useStyles from './styles'

/**
 * _Applications list._
 * @typedef {{
 * 		'Bharti-Building': [Number],
 * 		'Library': [Number],
 *	}} locationsType
 *
 * @typedef {{
 * 		name: String,
 * 		alias: String,
 * 		parameters: [String],
 * 		parameterAliases: [String],
 * 		locations: locationsType
 * 		options: [String]
 *	}} applicationType
 *
 * @type {[applicationType]}  
 */
export const ApplicationList = [
	{
		name: 'Air Pollution Monitoring Devices',
		alias: 'APMD',
		parameters: ['Temperature', 'Humidity', 'NO2', 'OX', 'CO', 'SO2', 'H2S', 'NO', 'PM_1', 'PM_2&period;5', 'PM_10'],
		parameterAliases: ['Temperature', 'Humidity', 'NO2', 'O3', 'CO', 'SO2', 'H2S', 'NO', 'PM 1', 'PM 2.5', 'PM 10'],
		locations: {
			'Bharti-Building': [77.19035/*E*/, 28.54486/*N*/],
			'Library': [77.19135/*E*/, 28.5444/*N*/],
		},
		options: []
	},
	{
		name: 'Smart Meters',
		alias: 'SM',
		parameters: [
			"Energy", "Frequency",
			"AppPower (R)", "Power (R)", "PF (R)", "Voltage (R)", "Current (R)",
			"AppPower (Y)", "Power (Y)", "PF (Y)", "Voltage (Y)", "Current (Y)",
			"AppPower (B)", "Power (B)", "PF (B)", "Voltage (B)", "Current (B)",
		],
		parameterAliases: [
			"Energy", "Frequency",
			"AppPower (R)", "Power (R)", "PF (R)", "Voltage (R)", "Current (R)",
			"AppPower (Y)", "Power (Y)", "PF (Y)", "Voltage (Y)", "Current (Y)",
			"AppPower (B)", "Power (B)", "PF (B)", "Voltage (B)", "Current (B)",
		],
		locations: {
			'Bharti-Building': [77.18959/*E*/, 28.54513/*N*/],
			// ToDo
		},
		options: ['Original', 'Reconstructed']
	}
]

export default function Applications () {
	return (
		<>
			{ApplicationList.map(
				(application, i) => ( <Route key={i} path={'/' + application.alias} element={<Application application={application} />} /> )
			)}
		</>
	)
}

/**
 * _Application box._
 * Clicking this will open application specific page.
 * @param {{name: String, alias: String, parameters: [String], parameterAliases: [String]}} application  
 * @returns Link button
 */
export function ApplicationBox (application) {
	const classes = useStyles()
	return (
		<Link href={'/' + application.alias}>
			<Button className={classes.appButton} variant='outlined'>
				<Typography className={classes.heading} fontSize={30} fontFamily='initial'>{application.name}</Typography>
			</Button>
		</Link>
	)
}

export function ApplicationContainer () {
	return (
		<Grid container spacing={1} paddingBottom={1}>
			{ApplicationList.map(
				(application, i) => ( <Grid item key={i} xs={12} sm={6}>{ApplicationBox(application)}</Grid> )
			)}
		</Grid>
	)
}