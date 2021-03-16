import axios from 'axios'
import { API_BASE, URLS } from '../../consts'
import {LOGIN_SUCCESS, LOGIN_FAIL} from './types'

const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data
})

const loginFail = () => ({
    type: LOGIN_FAIL
})
const loginAttempt = (username, password, history) => dispatch => {
    axios.post(`${API_BASE}/api/auth/jwt/create/`, {
        email: username,
        password: password
      })
      .then(res=>{
        dispatch(loginSuccess(res.data));
        history.push(URLS.home)
      })
      .catch(err=>{
        dispatch(loginFail())
        if(err.response.status===401){
          //display invalid credentials on login
        }
      })
}
export {loginSuccess, loginFail, loginAttempt}