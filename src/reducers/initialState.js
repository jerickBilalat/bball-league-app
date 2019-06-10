import authUtils from "../utils/authUtils"

let user = authUtils.getUser();
export default {
  user,
  players: [],
  games: {gameList: [], mostPlayedGameType: 3},
  settings: {
    minPlayersInTeam: 3
  },
  ajaxCallsInProgress: 0
};
