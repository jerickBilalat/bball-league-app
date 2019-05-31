import delay from './delay';
import {playersCollection} from "./mockPlayerAPI";
// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
let gamesCollection = [
  {
    "_id": "5c6962c7dea78f39a079fb04",
    "winners": ["Bo","Allen", "Del"],
    "losers": ["Bong", "Ron", "Jerick"],
    "createdAt": "2019-02-17T13:33:59.273Z",
    "updatedAt": "2019-02-17T13:33:59.273Z"
  },
  {
    "_id": "5c6962c7dea72f39a079fb04",
    "winners": ["Bo","Allen", "Del"],
    "losers": ["Bong", "Ron", "Jerick"],
    "createdAt": "2019-02-17T13:33:59.273Z",
    "updatedAt": "2019-02-17T13:33:59.273Z"
  },
  {
    "_id": "5c6962c7dea75f39a079fb04",
    "winners": ["Bo","Allen", "Del"],
    "losers": ["Bong", "Ron", "Jerick"],
    "createdAt": "2019-02-17T13:33:59.273Z",
    "updatedAt": "2019-02-17T13:33:59.273Z"
  }
];

function increaseStatByOne(statValue) {
  return (parseInt(statValue) + 1).toString();
}

class GameApi {
  static getAllGames() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], gamesCollection));
      }, delay);
    });
  }

  static saveGame(game, gameID) {
    let newGame = Object.assign({}, game); // to avoid manipulating object passed in.
    let players = playersCollection;
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        if(!gameID) {
          // create new game
          newGame["_id"] = `${new Date().toISOString()}`;
          newGame["createdAt"] = new Date().toISOString();
          newGame["updatedAt"] = new Date().toISOString();
          gamesCollection.push(newGame);

          // update player stats
          players = players.map( player => {
            if(newGame.winners.includes(player.name)) {
              player.wins = increaseStatByOne(player.wins);
            }else if(newGame.losers.includes(player.name)) {
              player.losses = increaseStatByOne(player.losses);
            }
            return player;
          })

          // resolve promise
          return resolve({data: newGame});
        }
  
        // else build updated game
        let updatedGame = gamesCollection.filter( item => item._id === gameID )[0];
        for(let key in updatedGame) {
          if(newGame[key]) {
            updatedGame[key] = newGame[key];
          }
        }
        updatedGame.updatedAt = new Date().toISOString();
        
        // update games collection
        gamesCollection = gamesCollection
          .filter( item => item._id !== gameID )
          .push(updatedGame);
        
        // resolve promise
        return resolve({data: game});
      }, delay);
    });
  }

  static deleteGame(gameId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfgameToDelete = gamesCollection.findIndex(game => {
          return game._id === gameId;
        });
        gamesCollection.splice(indexOfgameToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default GameApi;
