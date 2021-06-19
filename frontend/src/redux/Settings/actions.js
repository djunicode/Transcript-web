import { EDIT_PROFILE_DATA, TOGGLE_THEME } from './types'

const toggleTheme = () => ({
    type: TOGGLE_THEME
})
const editProfile = (data) => ({
    type: EDIT_PROFILE_DATA,
    payload: data // {key: <key>, value: <value>}
})
export {toggleTheme, editProfile}