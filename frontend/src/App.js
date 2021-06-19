import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'
// import Template from './components/Template'
import store from './redux/store'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { lightTheme } from './theme/lightTheme'
import { darkTheme } from './theme/darkTheme'
import ErrorPage from './pages/ErrorPage';
import { URLS } from './consts'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import Activation from './pages/Activation';
import UploadMarksheet from './pages/UploadMarksheet';
import EditMarks from './pages/EditMarks';
import ManagementAccepted from './pages/ManagementAccepted';
import Home from './pages/Home';
import Settings from './pages/Settings'
import ApplyTranscript from './pages/ApplyTranscript'

function AppWithRedux() {
	const isDarkTheme = useSelector(state=>state.settings.darkTheme)
	return (
	<>
	<ThemeProvider theme={isDarkTheme?darkTheme:lightTheme}>
		<BrowserRouter>
			<Switch>
				<Route exact path="/demo"><EditMarks /></Route>
				<Route exact path={URLS.login}> <Login/> </Route>
				<Route exact path={URLS.signup}> <Signup /> </Route>
				<Route exact path={URLS.activate}><Activation /></Route>
				{/* <Route exact path={URLS.home}> <StudentViewall /> </Route> */}
				<ProtectedRoute exact path={URLS.transcript.createNew}> <ApplyTranscript /> </ProtectedRoute>
				<ProtectedRoute exact path={URLS.settings}><Settings /></ProtectedRoute>
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
	</>
	)
}
function App() {
	return (
		<Provider store={store}>
			<CssBaseline />
			<AppWithRedux />
		</Provider>
	);
}

export default App;
