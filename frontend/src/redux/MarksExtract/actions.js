import { EDIT_HEADING, EDIT_MARKS, EXTRACT_MARKS_SUCCESS } from "./types";

const extractMarksSuccess = (marks) => ({
        type: EXTRACT_MARKS_SUCCESS,
        payload: marks
    }
)

const editMarks = (idx, key, newMarks) => {
    return {
        type: EDIT_MARKS,
        payload: {idx, key, newMarks}
    }
}

const editHeading = (key, value) => {
    return {
        type: EDIT_HEADING,
        payload: {key, value}
    }
}
export { extractMarksSuccess, editMarks, editHeading }