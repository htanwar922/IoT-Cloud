import React from "react"
import { Container, AppBar, Typography, Grow, Grid, Stack } from '@mui/material'
import { ImageBackground } from 'react-native' // https://rn-master.com/applying-blur-effect-in-react-native/#:~:text=Applying%20Blur%20Effect%20In%20React%20Native%201%20Introduction,Blur%20In%20React%20Native%20...%205%20Conclusion%20
import { BrowserRouter, Route, Routes } from "react-router-dom"

import useStyles from './styles'
import Applications, { ApplicationContainer } from "./components/Applications/Applications"

import logo from './images/IITD-Logo.jpg'

export default function App () {
	const classes = useStyles()
	return (
		<BrowserRouter> <ImageBackground>
			<Container className={classes.appContainer} maxwidth="lg">
				<Title />
				<Routes>
					<Route exact path={'/'} element={<Home />} />
					{Applications()}
				</Routes>
			</Container>
		</ImageBackground> </BrowserRouter>
	)
}

function Title () {
	const classes = useStyles()
	return (
		<AppBar className={classes.appBar} position="relative" color="inherit">
			<Stack direction="row" alignItems="center" gap={1}>
				<img className={classes.logo} src={logo} alt="IIT Delhi" height={60} />
				<Typography className={classes.heading} variant="h2"> <i>Baadal</i> - IIT Delhi Cloud </Typography>
				<img className={classes.logo} src={logo} alt="IIT Delhi" height={60} />
			</Stack>
		</AppBar>
	)
}

function Home () {
	const classes = useStyles()
	return (
		<Grow in>
			<Container>
				<Grid container alignItems="stretch" spacing={3}>
					<Grid item>	{/*xs='auto' sm='auto'*/}
						<ApplicationContainer />
					</Grid>
					<Grid item> {/*xs={12} sm={6}*/}
						<img className={classes.frontImage} src={logo} alt='IIT Delhi' height={450} />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	)
}