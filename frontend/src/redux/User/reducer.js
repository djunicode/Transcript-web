import { LOGIN_FAIL, LOGIN_SUCCESS } from "./types";

const initialState = {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken')
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_SUCCESS: {
            localStorage.setItem('accessToken', action.payload.access)
            localStorage.setItem('refreshToken', action.payload.refresh)
            return {...state, accessToken: action.payload.access, refreshToken: action.payload.refresh}
        }
        case LOGIN_FAIL: {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            return {...state, accessToken: null, refreshToken: null}
        }
        default: return state
    }
}

export default userReducer;