import * as types from './actionTypes';
import mockPlayerAPI from '../api/mockPlayerAPI';
import playerAPI from '../api';
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

export function savePlayer(player, playerID) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    if(playerID) {
      return playerAPI
      .updatePlayer(player)
      .then( res => dispatch(updatePlayerSuccess(res.data)))
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw(error);
      });
    }
    return playerAPI
    .createNewPlayer(player)
    .then( res => dispatch(createPlayerSuccess(res.data)))
    .catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
