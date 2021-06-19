import { combineReducers } from 'redux';
import marksReducer from './MarksExtract/reducer';
import { studentDashboardReducer } from './StudentDashboard/reducer';
import { managementDashboardReducer } from './ManagementDashboard/reducer';
import userReducer from './User/reducer';
import settingsReducer from './Settings/reducer'
// This file exports the root reducer for our redux store

const rootReducer = combineReducers({
    user: userReducer,
    studentDashboard: studentDashboardReducer,
    marksExtractor: marksReducer,
    managementDasboard: managementDashboardReducer,
    settings: settingsReducer
})

export default rootReducer