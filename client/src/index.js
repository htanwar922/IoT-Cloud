import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material'

import App from './App'
import store from './store'

import './index.css'

const theme = createTheme()

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</Provider>
	,
	document.getElementById('root')
)