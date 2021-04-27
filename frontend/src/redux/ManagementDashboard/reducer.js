import { FETCH_APPLICATIONS, FETCH_ACCEPTED_APPLICATIONS } from "./types";

const initialState = {
    applications : [],
    acceptedApplications : [],
}


const managementDashboardReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_APPLICATIONS: {
            return {...state, applications: action.payload}
        }
        case FETCH_ACCEPTED_APPLICATIONS: {
            return { ...state, aceeptedApplications: action.payload }
        }
        default: return state
    }
}

export { managementDashboardReducer }