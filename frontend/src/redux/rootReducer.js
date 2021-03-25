import { combineReducers } from 'redux';
import { studentDashboardReducer } from './StudentDashboard/reducer';
import userReducer from './User/reducer'

// This file exports the root reducer for our redux store

const rootReducer = combineReducers({
    user: userReducer,
    studentDashboard: studentDashboardReducer
})

export default rootReducer