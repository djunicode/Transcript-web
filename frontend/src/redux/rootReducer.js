import { combineReducers } from 'redux';
import userReducer from './User/reducer'

// This file exports the root reducer for our redux store

const rootReducer = combineReducers({
    user: userReducer
})

export default rootReducer