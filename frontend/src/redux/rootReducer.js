import { combineReducers } from 'redux';
import marksReducer from './MarksExtract/reducer';
import { studentDashboardReducer } from './StudentDashboard/reducer';
import userReducer from './User/reducer'

// This file exports the root reducer for our redux store

const rootReducer = combineReducers({
    user: userReducer,
    studentDashboard: studentDashboardReducer,
    marksExtractor: marksReducer
})

export default rootReducer