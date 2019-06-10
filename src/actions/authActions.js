
import {LOGIN_SUCCESS, LOGIN_ERROR} from "./actionTypes"
import API from "../api"


function loginSuccess(user) {
  return { type: LOGIN_SUCCESS, user }
}
function loginFailure(error) {
  return { type: LOGIN_SUCCESS, error }
}


export function login(credentials) {
  return function(dispatch) {
    return API
      .login(credentials)
      .then( res => {
        dispatch(loginSuccess(res.data.user))
      })
      .catch( error => {
        dispatch(loginFailure(error))
      })
  }
}