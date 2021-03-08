import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'
import Template from './components/Template'
import store from './redux/store'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { lightTheme } from './theme/lightTheme'
import ErrorPage from './pages/ErrorPage';
import { URLS } from './consts'
function App() {
	return (
		<Provider store={store}>
			<CssBaseline />
			<ThemeProvider theme={lightTheme}>
				<BrowserRouter>
					<Switch>
						{/* Routes outside template */}
						<Route exact path={URLS.login}> Login page </Route>
						<Route exact path={URLS.home}> 
							<ErrorPage code="400" subtitle="Bad Request" text="The server cannot or will not process the request due to something that is perceived to be a client error."/> 
						</Route>
						<Template>
							{/* Routes inside template */}
							<ProtectedRoute exact path="/test"> Testing Protected Routes </ProtectedRoute>
						</Template>
					</Switch>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
