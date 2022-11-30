import { Button, Grid,
	Typography
} from "@mui/material";

import useStyles from './styles'

export const ApplicationList = [
	{
		name: 'Air Pollution Monitoring Devices',
		alias: 'APMD',
		parameters: ['Temperature', 'PM2.5']
	},
	{
		name: 'Smart Meters',
		alias: 'SM',
		parameters: ['Voltage', 'Current']
	}
]

export function ApplicationBox (application) {
	const classes = useStyles()
	return (
		<Button className={classes.appButton} variant='outlined'>
			<Typography className={classes.heading} fontSize={30} fontFamily='initial'>{application.name}</Typography>
		</Button>
	)
}

export default function Applications () {
	return (
		<Grid container spacing={1} paddingBottom={1}>
			{ApplicationList.map(
				(application, i) => ( <Grid item key={i} xs={12} sm={6}>{ApplicationBox(application)}</Grid> )
			)}
		</Grid>
	)
}