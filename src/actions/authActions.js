
import {LOGIN_SUCCESS, CLIENT_LOGOUT} from "./actionTypes"
import API from "../api"


function loginSuccess(user) {
  return { type: LOGIN_SUCCESS, user }
}

export function login(credentials) {
  return function(dispatch) {
    return API
      .login(credentials)
      .then( user => {
        dispatch(loginSuccess(user))
      })
  }
}


export function logout() {
  window.localStorage.removeItem('token')
  return { type: CLIENT_LOGOUT, user: null }
}