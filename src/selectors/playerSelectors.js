

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
export function rankPlayers(players) {
  // sort players by winning percentage
  players.sort((a,b) => {
    let playerA = +caculateWinningPercentage(a.wins, a.losses),
        playerB = +caculateWinningPercentage(b.wins, b.losses)
    return playerB - playerA;
  })
  
  // calculate average or median participation which for now should be the average between top 6 active players, and let us say every meeting the average games will be 5 so if a player miss two metting he will most likely be out
  let sumOfTopAttendees = players
      .map( player => +caculateTotalGamesPlayed(player.wins, player.losses))
      .sort((a,b) => b - a)
      .slice(0,7)
      .reduce((prev, cur) => cur += prev, 0 ),
      medianAttendance = +(sumOfTopAttendees / 6).toFixed(2),
      minimumParticipationDifference = 10;
    
  // filter players with player higher than the median participation rate
  return players.filter( player =>  medianAttendance - +caculateTotalGamesPlayed(player.wins, player.losses) <= minimumParticipationDifference )
}