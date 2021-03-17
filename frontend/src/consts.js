const URLS = {
    home: "/",
    login: "/accounts/login",
    signup: "/accounts/signup",
    transcript: {
        viewAll: "/transcript/view-all",
        uploadMarksheet: "/transcript/upload-marksheet",
        createNew: "/transcript/apply",
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