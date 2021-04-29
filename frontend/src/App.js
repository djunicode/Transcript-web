import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'
// import Template from './components/Template'
import store from './redux/store'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { lightTheme } from './theme/lightTheme'
import ErrorPage from './pages/ErrorPage';
import { URLS } from './consts'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import Activation from './pages/Activation';
import UploadMarksheet from './pages/UploadMarksheet';
import EditMarks from './pages/EditMarks';
import ManagementAccepted from './pages/ManagementAccepted';
import Home from './pages/Home';

function App() {
	return (
		<Provider store={store}>
			<CssBaseline />
			<ThemeProvider theme={lightTheme}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/demo"><EditMarks /></Route>
						<Route exact path={URLS.login}> <Login/> </Route>
						<Route exact path={URLS.signup}> <Signup /> </Route>
						<Route exact path={URLS.activate}><Activation /></Route>
						{/* <Route exact path={URLS.home}> <StudentViewall /> </Route> */}
						<ProtectedRoute exact path={URLS.transcript.uploadMarksheet}> <UploadMarksheet /> </ProtectedRoute>
						<ProtectedRoute exact path={URLS.transcript.editMarks}><EditMarks /></ProtectedRoute>
						<ProtectedRoute exact path={URLS.home}> <Home /> </ProtectedRoute>
						<ProtectedRoute exact path={URLS.management.accepted}> <ManagementAccepted /> </ProtectedRoute>
						<ProtectedRoute exact path="/test"> Testing Protected Routes </ProtectedRoute>
						{/* Catch all */}
						<Route path="*" exact>
							<ErrorPage code="404" subtitle="Not found!" text="The resource you’re looking for doesn’t exist or is temporarily under maintainence." />
						</Route>
					</Switch>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
