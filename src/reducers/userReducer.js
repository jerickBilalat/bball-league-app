import initialState from './initialState'
import {LOGIN_SUCCESS, LOGIN_ERROR} from "../actions/actionTypes"


export default function userReducer( state = initialState.user, action) {
  if(action.type === LOGIN_ERROR) return {error: action.error}
  if(action.type === LOGIN_SUCCESS) return action.user
  return state
}