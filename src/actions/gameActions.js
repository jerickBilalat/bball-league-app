import * as types from './actionTypes';
import gameAPI from '../api';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadGamesSuccess(gamesData) {
  return { type: types.LOAD_GAMES_SUCCESS, gamesData};
}

export function createGameSuccess(game) {
  return {type: types.CREATE_GAME_SUCCESS, game};
}

export function updateGameSuccess(game) {
  return {type: types.UPDATE_GAME_SUCCESS, game};
}

export function loadGames() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return gameAPI
      .getAllGames()
      .then(gamesData => {
        dispatch(loadGamesSuccess(gamesData));
      })
      .catch(error => {
        throw(error);
      });
  };
}

export function saveGame(game, gameID) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return gameAPI
      .saveGame(game, gameID)
      .then(res => {
        gameID 
        ? dispatch(updateGameSuccess(res.data)) 
        : dispatch(createGameSuccess(res.data))
        return
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw(error);
      })
  };
}
