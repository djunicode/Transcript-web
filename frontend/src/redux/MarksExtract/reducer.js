import { EDIT_HEADING, EDIT_MARKS, EXTRACT_MARKS_SUCCESS } from "./types"

const initialState = {
    marks: JSON.parse(localStorage.getItem('marks')) || {} //For testing
}

const marksReducer = (state = initialState, action) => {
    switch(action.type){
        case EXTRACT_MARKS_SUCCESS: {
            localStorage.setItem('marks', JSON.stringify(action.payload))
            return {...state, marks: action.payload}
        }
        case EDIT_MARKS: {
            const newCourses = [...state.marks.courses]
            newCourses[action.payload.idx][action.payload.key] = action.payload.newMarks
            return {...state, marks: {...state.marks, courses:newCourses}}
        }
        case EDIT_HEADING: {
            const newM = {...state.marks}
            newM[action.payload.key] = action.payload.value
            return {...state, marks: newM}
        }
        default: {
            return state
        }
    }
}

export default marksReducer