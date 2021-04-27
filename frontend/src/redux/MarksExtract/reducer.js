import { EDIT_MARKS, EXTRACT_MARKS_SUCCESS } from "./types"

const initialState = {
    marks: {}
}

const marksReducer = (state = initialState, action) => {
    switch(action.type){
        case EXTRACT_MARKS_SUCCESS: {
            return {...state, marks: action.payload}
        }
        case EDIT_MARKS: {
            const newCourses = [...state.marks.courses]
            newCourses[action.payload.idx]['marks'] = action.payload.newMarks
            return {...state, marks: {...state.marks, courses:newCourses}}
        }
        default: {
            return state
        }
    }
}

export default marksReducer