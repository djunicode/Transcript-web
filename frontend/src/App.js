import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'
import SideNav from './components/SideNav';
import Appbar from './components/Appbar'
import store from './redux/store'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { lightTheme } from './theme/lightTheme'

function App() {
	return (
		<Provider store={store}>
			<CssBaseline />
			<ThemeProvider theme={lightTheme}>
				<BrowserRouter>
				{/* <SideNav /> */}
				<Appbar />
				<Route exact path="/"> Home page </Route>
				<Route exact path="/login"> Login page </Route>
				<ProtectedRoute exact path="/test"> Testing Protected Routes </ProtectedRoute>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
