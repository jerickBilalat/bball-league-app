import delay from './delay';
import {playersCollection} from "./mockPlayerAPI";
// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
let gamesCollection = [
  {
    "_id": "5c6962c7dea78f39a079fb04",
    "winners": ["Del","Allen", "Bong", "Evan"],
    "losers": ["Bo", "Rymart", "Jerick", "Ron"],
    "createdAt": "2019-05-27T13:33:59.273Z",
    "updatedAt": "2019-05-27T13:33:59.273Z"
  },
  {
    "_id": "5c6962c7dea72f39a079fb05",
    "winners": ["Bo", "Rymart", "Jerick", "Ron"],
    "losers": ["Del","Allen", "Bong", "Evan"],
    "createdAt": "2019-05-27T13:33:59.273Z",
    "updatedAt": "2019-05-27T13:33:59.273Z"
  },
  {
    "_id": "5c6962c7dea75f39a079fb06",
    "winners": ["Bo", "Rymart", "Jerick", "Ron", "Mark"],
    "losers": ["Del","Allen", "Bong", "Evan", "Kurt"],
    "createdAt": "2019-05-27T13:33:59.273Z",
    "updatedAt": "2019-05-27T13:33:59.273Z"
  },
  {
    "_id": "5c6962c7dea75f39a079fb07",
    "winners": ["Allen", "Bo", "Rymart", "Zion", "Kurt"],
    "losers": ["Del","Ron", "Bong", "Jerick", "Mark"],
    "createdAt": "2019-05-27T13:33:59.273Z",
    "updatedAt": "2019-05-27T13:33:59.273Z"
  },
  {
    "_id": "5c6962c7dea75f39a079fb08",
    "winners": ["Ron", "Bo", "Del"],
    "losers": ["Bong", "Rymart", "Jerick"],
    "createdAt": "2019-05-27T13:33:59.273Z",
    "updatedAt": "2019-05-27T13:33:59.273Z"
  },

];

function increaseStatByOne(statValue) {
  return (parseInt(statValue) + 1).toString();
}

class GameApi {
  static getAllGames() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let teams = [0,0,0]
        let mostPlayedGameType = 3

        gamesCollection.forEach( record => {
          switch (record.winners.length) {
            case 3:
              teams[0] += 1
              break
            case 4:
              teams[1] += 1
              break
            case 5:
              teams[2] += 1
              break
            default:
              throw new Error("games records error")
          }
        })
        
        switch(teams.lastIndexOf(Math.max(...teams))) {
          case 0:
              mostPlayedGameType = 3
            break
          case 1:
              mostPlayedGameType = 4
            break
          case 2:
              mostPlayedGameType = 5
            break
          default:
            throw new Error("team types is not valid")
        }
        resolve({gameList: gamesCollection, mostPlayedGameType: mostPlayedGameType});
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
