import { EDIT_MARKS, EXTRACT_MARKS_SUCCESS } from "./types";

const extractMarksSuccess = (marks) => ({
        type: EXTRACT_MARKS_SUCCESS,
        payload: marks
    }
)

const editMarks = (idx, newMarks) => {
    return {
        type: EDIT_MARKS,
        payload: {idx, newMarks}
    }
}
export { extractMarksSuccess, editMarks }