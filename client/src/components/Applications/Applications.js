import { Button, Grid, Link, Typography } from "@mui/material";
import { Route } from 'react-router-dom'

import Application from "./Application/Application";
import useStyles from './styles'

/**
 * _Applications list._
 * @type {[{name: String, alias: String, parameters: [String], parameterAliases: [String]}]}  
 */
export const ApplicationList = [
	{
		name: 'Air Pollution Monitoring Devices',
		alias: 'APMD',
		parameters: ['Temperature', 'Humidity', 'NO2', 'OX', 'CO', 'SO2', 'H2S', 'NO', 'PM_1', 'PM_2&period;5', 'PM_10'],
		parameterAliases: ['Temperature', 'Humidity', 'NO2', 'O3', 'CO', 'SO2', 'H2S', 'NO', 'PM 1', 'PM 2.5', 'PM 10']
	},
	{
		name: 'Smart Meters',
		alias: 'SM',
		parameters: ['Voltage', 'Current'],
		parameterAliases: ['Voltage', 'Current']
	}
]

/**
 * _Application box._
 * Clicking this will open application specific page.
 * @param {{name: String, alias: String, parameters: [String], parameterAliases: [String]}} application  
 * @returns Link button
 */
export function ApplicationBox (application) {
	const classes = useStyles()
	return (
		<Link to={'/' + application.alias}>
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

export default function Applications () {
	return (
		<>
			{ApplicationList.map(
				(application, i) => ( <Route key={i} path={'/' + application.alias} element={<Application application={application} />} /> )
			)}
		</>
	)
}