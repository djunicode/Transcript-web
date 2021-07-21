import { FETCH_USER_DATA_FAIL, FETCH_USER_DATA_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from "./types";

const initialState = {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    name:  localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    is_management: localStorage.getItem('is_management')==='true'
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_SUCCESS: {
            localStorage.setItem('accessToken', action.payload.access)
            localStorage.setItem('refreshToken', action.payload.refresh)
            localStorage.setItem('name', action.payload.name)
            return {...state, accessToken: action.payload.access, refreshToken: action.payload.refresh, name: action.payload.name}
        }
        case LOGIN_FAIL: {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('name')
            return {...state, accessToken: null, refreshToken: null}
        }
        case FETCH_USER_DATA_SUCCESS: {
            localStorage.setItem('is_management', action.payload.is_management)
            localStorage.setItem('email', action.payload.email)
            return {...state, email: action.payload.email, is_management: action.payload.is_management}
        }
        case FETCH_USER_DATA_FAIL: {
            localStorage.removeItem('is_management')
            localStorage.removeItem('email')
            return {...state, is_management: null, email: null}
        }
        case LOGOUT: {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('is_management')
            localStorage.removeItem('name')
            localStorage.removeItem('email')
            return {accessToken: null, refreshToken: null, is_management: null, email: null}
        }
        default: return state
    }
}

export default userReducer;