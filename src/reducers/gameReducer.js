import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function gameReducer(state = initialState.games, action) {
  switch (action.type) {
    case types.LOAD_GAMES_SUCCESS:
      return action.games;

    case types.CREATE_GAME_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.game)
      ];

    case types.UPDATE_GAME_SUCCESS:
      return [
        ...state.filter(game => game._id !== action.game._id),
        Object.assign({}, action.game)
      ];

    default:
      return state;
  }
}
