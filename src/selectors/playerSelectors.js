

// todo should be calculated in the server already by mongo
const caculateWinningPercentage = (wins,losses) => {
  wins = Number.parseInt(wins);
  losses = Number.parseInt(losses);
  let totalGamesPlayed = wins + losses;
  return Number.parseFloat(wins * 100 / totalGamesPlayed).toFixed(2);
}

// let client do this functionality
const caculateTotalGamesPlayed = (wins,losses) => {
  wins = Number.parseInt(wins);
  losses = Number.parseInt(losses);
  return (wins + losses).toFixed();
}

export function sortAlphabetically(players) {
  players.sort(function(a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  });

  return players;
}
export function rankPlayers(players, mostPlayedGameType = 3) {
  // sort players by winning percentage
  players.sort((a,b) => {
    let playerA = +caculateWinningPercentage(a.wins, a.losses),
        playerB = +caculateWinningPercentage(b.wins, b.losses)
    return playerB - playerA;
  })
  
  // calculate average or median participation which for now should be the average between top 8 or 6 active players, 
  // if most games are played 4 vs 4, for now let's assume it's 4v4
  let sumOfTopAttendees = players
      .map( player => +caculateTotalGamesPlayed(player.wins, player.losses))
      .sort((a,b) => b - a)
      .slice(0, (mostPlayedGameType * 2))
      .reduce((prev, cur) => cur += prev, 0 )
  
  let medianAttendance = Math.floor(+(sumOfTopAttendees / (mostPlayedGameType * 2)))

      console.log("top attendess of", mostPlayedGameType * 2)
      console.log("sum of tope attendees", sumOfTopAttendees)
      console.log("median attendance", medianAttendance)
  // filter players with player higher than the median participation rate
  return players.filter( player =>  +caculateTotalGamesPlayed(player.wins, player.losses) >= medianAttendance)
}