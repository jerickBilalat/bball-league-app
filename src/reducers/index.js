import {combineReducers} from 'redux'
import players from "./playerReducer"
import games from "./gameReducer"
import user from "./userReducer"
import ajaxCallsInProgress from './ajaxStatusReducer'

const rootReducer = combineReducers({
  user,
  players,
  games,
  ajaxCallsInProgress
});

export default rootReducer
