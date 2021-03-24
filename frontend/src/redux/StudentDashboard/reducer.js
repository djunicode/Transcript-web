import { FETCH_USER_APPLICATIONS_FAIL, FETCH_USER_APPLICATIONS_SUCCESS } from "./types";

const initialState = {
    applications : [],
}


const studentDashboardReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USER_APPLICATIONS_SUCCESS: {
            return {...state, applications: action.payload}
        }
        case FETCH_USER_APPLICATIONS_FAIL: {
            return { ...state, applications: [] }
        }
        default: return state
    }
}

export { studentDashboardReducer }