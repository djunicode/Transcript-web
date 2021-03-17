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

export {loginSuccess, loginFail}