import {combineReducers} from 'redux';
import players from "./playerReducer";
import games from "./gameReducer";
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  players,
  games,
  ajaxCallsInProgress
});

export default rootReducer;
