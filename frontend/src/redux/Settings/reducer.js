import {EDIT_PROFILE_DATA, TOGGLE_THEME} from './types'
const initialState = {
    darkTheme: localStorage.getItem('darkTheme')==='true',
    admission_year: null,
    contact_no: null,
    department: null,
    name: null,
    // staff_sap: null
}

const settingsReducer = (state = initialState, action) => {
    switch(action.type){
        case TOGGLE_THEME: {
            if(state.darkTheme){
                // if already in dark theme, then set to false
                localStorage.setItem('darkTheme', 'false')
            } else {
                localStorage.setItem('darkTheme', 'true')
            }
            return {...state, darkTheme: !state.darkTheme}
        }
        case EDIT_PROFILE_DATA: {
            return {...state, [action.payload.key]: action.payload.value}
        }
        default: return state
    }
}

export default settingsReducer;