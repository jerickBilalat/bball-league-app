
import {LOGIN_SUCCESS, LOGIN_ERROR} from "./actionTypes"
import API from "../api"


function loginSuccess(user) {
  return { type: LOGIN_SUCCESS, user }
}
function loginFailure(error) {
  return { type: LOGIN_ERROR, error }
}


export function login(credentials) {
  return function(dispatch) {
    return API
      .login(credentials)
      .then( user => {
        dispatch(loginSuccess(user))
      })
      .catch( error => {
        dispatch(loginFailure(error))
      })
  }
}