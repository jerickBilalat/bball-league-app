
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
    return b.winningPercentage - a.winningPercentage;
  })
  
  // calculate average or median participation which for now should be the average between top 8 or 6 active players, 
  // if most games are played 4 vs 4, for now let's assume it's 4v4
  let sumOfTopAttendees = players
      .map( player => { return player.gamesPlayed})
      .sort((a,b) => b - a)
      .slice(0, (mostPlayedGameType * 2))
      .reduce((prev, cur) => cur += prev, 0 )
  
  let medianAttendance = Math.floor(+(sumOfTopAttendees / (mostPlayedGameType * 2)))
  // filter players with player higher than the median participation rate
  return players.filter( player =>  player.gamesPlayed >= medianAttendance)
}