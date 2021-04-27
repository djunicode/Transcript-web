// This file is just a wrapper around all actions so that importing them is easier
export { loginSuccess, loginFail, fetchUserDataFail, fetchUserDataSuccess, logout } from './User/actions'
export { fetchUserApplicationsFail, fetchUserApplicationsSuccess} from './StudentDashboard/actions'
export { extractMarksSuccess, editMarks } from './MarksExtract/actions'
export { fetchApplications, fetchAcceptedApplications } from './ManagementDashboard/actions'