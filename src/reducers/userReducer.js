import initialState from './initialState'
import {LOGIN_SUCCESS, CLIENT_LOGOUT} from "../actions/actionTypes"


export default function userReducer( state = initialState.user, action) {
  if(action.type === LOGIN_SUCCESS) return action.user
  if(action.type === CLIENT_LOGOUT) return null
  return state
}