import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'
import Template from './components/Template'
import store from './redux/store'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { lightTheme } from './theme/lightTheme'

function App() {
	return (
		<Provider store={store}>
			<CssBaseline />
			<ThemeProvider theme={lightTheme}>
				<BrowserRouter>
					<Switch>
						{/* Routes outside template */}
						<Route exact path="/login"> Login page </Route>
						<Template>
							{/* Routes inside template */}
							<Route exact path="/"> Home page </Route>
							<ProtectedRoute exact path="/test"> Testing Protected Routes </ProtectedRoute>
						</Template>
					</Switch>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
