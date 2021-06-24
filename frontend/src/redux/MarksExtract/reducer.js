import { EDIT_HEADING, EDIT_MARKS, EXTRACT_MARKS_SUCCESS } from "./types"

const initialState = {

}

const marksReducer = (state = initialState, action) => {
    switch(action.type){
        case EXTRACT_MARKS_SUCCESS: {
            return {...state, ...action.payload}
        }
        case EDIT_MARKS: {
            const sem = Object.keys(state)[0]
            const newSubject = [...state[sem].subject]
            newSubject[action.payload.idx][action.payload.key] = action.payload.newMarks
            return {...state,
                [sem]: {...state[sem], subject: newSubject}
            }
        }
        case EDIT_HEADING: {
            const sem = Object.keys(state)[0]
            return {...state, 
                [sem]: {...state[sem], [action.payload.key]: action.payload.value}
            }
        }
        default: {
            return state
        }
    }
}

export default marksReducer