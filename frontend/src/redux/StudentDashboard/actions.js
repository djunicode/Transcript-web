import { FETCH_USER_APPLICATIONS_FAIL, FETCH_USER_APPLICATIONS_SUCCESS } from "./types";

const fetchUserApplicationsSuccess = (data) => ({
    type: FETCH_USER_APPLICATIONS_SUCCESS,
    payload: data
})
const fetchUserApplicationsFail = () => ({
    type: FETCH_USER_APPLICATIONS_FAIL
})

export { fetchUserApplicationsFail, fetchUserApplicationsSuccess }