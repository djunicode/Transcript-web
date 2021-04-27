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
}
const API_BASE = 'http://unicode2021.pythonanywhere.com'
export { URLS, API_BASE }