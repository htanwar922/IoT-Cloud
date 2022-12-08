import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createTheme, ThemeProvider } from '@mui/material'

import App from './App'

import './index.css'

// const store = createStore(rootReducer, compose(applyMiddleware(thunk)))
const theme = createTheme()

ReactDOM.render(
	// <Provider store={store}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	// </Provider> */}
	,
	document.getElementById('root')
)