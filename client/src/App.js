import React from "react"
import { Container, AppBar, Typography, Grow, Grid, Stack } from '@mui/material'

import useStyles from './styles'
import Applications from "./components/Applications/Applications"

// import bgImage from './images/IIT-Delhi.jpg'
import logo from './images/IITD-Logo.jpg'

// Create App
function App() {
	const classes = useStyles()
	return (
		<Container className={classes.appContainer} maxwidth="lg">
			<AppBar className={classes.appBar} position="relative" color="inherit">
				<Stack direction="row" alignItems="center" gap={1}>
					<img className={classes.logo} src={logo} alt="memories" height="60" />
					<Typography className={classes.heading} variant="h2"> <i>Baadal</i> - The IoT Cloud </Typography>
					<img className={classes.logo} src={logo} alt="memories" height="60" />
				</Stack>
			</AppBar>
			<Grow in>
				<Container>
					<Grid container alignItems="stretch" spacing={3}>
						<Grid item>	{/*xs='auto' sm='auto'*/}
							<Applications />
							<Applications />
						</Grid>
						<Grid item> {/*xs={12} sm={6}*/}
							<img className={classes.logo} src={logo} alt='IIT Delhi' height={400} />
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	)
}

export default App