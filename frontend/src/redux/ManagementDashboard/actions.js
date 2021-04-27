import { FETCH_APPLICATIONS, FETCH_ACCEPTED_APPLICATIONS } from "./types";

const fetchApplications = (data) => ({
    type: FETCH_APPLICATIONS,
    payload: data
})
const fetchAcceptedApplications = (data) => ({
    type:  FETCH_ACCEPTED_APPLICATIONS,
    payload: data
})

export { fetchApplications, fetchAcceptedApplications }