import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'
import store from './redux/store'

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Route exact path="/"> Home page </Route>
				<Route exact path="/login"> Login page </Route>
				<ProtectedRoute exact path="/test"> Testing Protected Routes </ProtectedRoute>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
