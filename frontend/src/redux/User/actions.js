import {LOGIN_SUCCESS, LOGIN_FAIL, FETCH_USER_DATA_SUCCESS, FETCH_USER_DATA_FAIL, LOGOUT} from './types'

const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data
})

const loginFail = () => ({
    type: LOGIN_FAIL
})

const fetchUserDataSuccess = (data) => ({
    type: FETCH_USER_DATA_SUCCESS,
    payload: data
})
const fetchUserDataFail = () => ({
    type: FETCH_USER_DATA_FAIL
})

const logout = () => ({
    type: LOGOUT
})

export {loginSuccess, loginFail, fetchUserDataSuccess, fetchUserDataFail, logout}