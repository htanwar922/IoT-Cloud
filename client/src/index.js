import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createTheme, ThemeProvider, Typography } from '@mui/material'

import App from './App'
import store from './store'

import './index.css'

const theme = createTheme()

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<App />
			<Typography position={{position: "fixed", bottom: theme.spacing(2), right: theme.spacing(2)}} variant='h6'>Created by Himanshu</Typography>
		</ThemeProvider>
	</Provider>
	,
	document.getElementById('root')
)