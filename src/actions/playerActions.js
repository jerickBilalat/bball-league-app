import * as types from './actionTypes';
import playerAPI from '../api/mockPlayerAPI';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadPlayersSuccess(players) {
  return { type: types.LOAD_PLAYERS_SUCCESS, players};
}

export function createPlayerSuccess(player) {
  return {type: types.CREATE_PLAYER_SUCCESS, player};
}

export function updatePlayerSuccess(player) {
  return {type: types.UPDATE_PLAYER_SUCCESS, player};
}

export function loadPlayers() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return playerAPI
      .getAllPlayers()
      .then(players => {
        
        dispatch(loadPlayersSuccess(players));
      })
      .catch(error => {
        throw(error);
      });
  };
}

export function savePlayer(name, playerID) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return playerAPI
      .savePlayer(name)
      .then( res => {
        playerID
        ? dispatch(updatePlayerSuccess(res.data))
        : dispatch(createPlayerSuccess(res.data));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw(error);
      });
  };
}
