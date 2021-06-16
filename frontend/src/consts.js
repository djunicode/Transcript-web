const URLS = {
    home: "/",
    login: "/accounts/login",
    signup: "/accounts/signup",
    activate: "/activate/:uid/:token",
    transcript: {
        viewAll: "/",   //View all is home page for logged in student user
        uploadMarksheet: "/transcript/upload-marksheet",
        createNew: "/transcript/apply",
        editMarks: "/transcript/edit-marks",
    },
    sop: {
        plagarismChecker: "/sop/plagarism",
    },
    lor: {
        viewAll: "/lor/view-all",
        createNew: "/lor/create",
    },
    settings: "/accounts/settings",
    management: {
        applications: "/", //homepage
        accepted : "/management/accepted",
    },
}
const API_BASE = 'https://transcripts-app.herokuapp.com'

const DEPARTMENTS = [
    ['CS', 'COMPUTERS'],
    ['IT', 'INFORMATION TECHNOLOGY'],
    ['EXTC', 'ELECTRONICS AND TELECOMMUNICATION'],
    ['ELEX', 'ELECTRONICS'],
    ['MECH', 'MECHANICAL'],
    ['CHEM', 'CHEMICAL'],
    ['BIOMED', 'BIOMED'],
    ['PROD', 'PRODUCTION'],
    ['OTHERS', 'OTHERS'],
  ]
export { URLS, API_BASE, DEPARTMENTS}