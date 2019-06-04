import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
export let playersCollection = [
  {
    _id: "del",
    name: "del",
    wins: "2",
    losses: "4",
  },
  {
    _id: "allen",
    name: "allen",
    wins: "3",
    losses: "2"
  },
  {
    _id: "ron",
    name: "ron",
    wins: "3",
    losses: "3"
  },
  {
    _id: "bo",
    name: "bo",
    wins: "5",
    losses: "1"
  },
  {
    _id: "bong",
    name: "bong",
    wins: "2",
    losses: "4"
  },
  {
    _id: "jerick",
    name: "jerick",
    wins: "2",
    losses: "4"
  },
  {
    _id: "mark",
    name: "mark",
    wins: "1",
    losses: "2",
  },
  {
    _id: "kurt",
    name: "kurt",
    wins: "1",
    losses: "1",
  },
  {
    _id: "zion",
    name: "zion",
    wins: "1",
    losses: "0",
  },
  {
    _id:"rymart",
    name: "rymart",
    wins: "4",
    losses: "2"
  },
  {
    _id:"evan",
    name: "evan",
    wins: "1",
    losses: "2"
  }
];

// let client do this functionality
const caculateWinningPercentage = (wins,losses) => {
  wins = Number.parseInt(wins);
  losses = Number.parseInt(losses);
  let totalGamesPlayed = wins + losses;
  return wins !== 0 ? Number.parseFloat(wins * 100 / totalGamesPlayed).toFixed(2): "0.00";
}

// let client do this functionality
const caculateTotalGamesPlayed = (wins,losses) => {
  wins = Number.parseInt(wins);
  losses = Number.parseInt(losses);
  return (wins + losses).toFixed();
}

// let client do this functionality
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class PlayerApi {
  static getAllPlayers() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let players = [...playersCollection
          .map( player => {
            player.name = capitalize(player.name);
            player["winningPercentage"] = caculateWinningPercentage(player.wins, player.losses);
            player.gamesPlayed = caculateTotalGamesPlayed(player.wins, player.losses);
            return player;
          })
        ];
        resolve(players);
      }, delay);
    });
  }

  static savePlayer(playerName, playerID) {
    let newPlayer = {}; // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        if(!playerID) {
          // create new player
          newPlayer["name"] = playerName.toLowerCase();
          newPlayer["_id"] = `${new Date().toISOString()}`;
          newPlayer["wins"] = "0";
          newPlayer["losses"] = "0";
          newPlayer["createdAt"] = new Date().toISOString();
          newPlayer["updatedAt"] = new Date().toISOString();
          playersCollection.push(newPlayer);

          // resolve promise
          return resolve({data: newPlayer});
        }
  
        // else build updated player
        let updatedPlayer = playersCollection.filter( item => item._id === playerID )[0];
        for(let key in updatedPlayer) {
          if(newPlayer[key]) {
            updatedPlayer[key] = newPlayer[key];
          }
        }
        updatedPlayer.updatedAt = new Date().toISOString();
        
        // update players collection
        playersCollection = playersCollection
          .filter( item => item._id !== playerID )
          .push(updatedPlayer);
        
        // resolve promise
        return resolve({data: capitalize(playerName)});
      }, delay);
    });
  }

  static deletePlayer(playerId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfplayerToDelete = playersCollection.findIndex(player => {
          return player._id === playerId;
        });
        playersCollection.splice(indexOfplayerToDelete, 1);
        resolve();
      }, delay);
    });
  }
}
export default PlayerApi;
