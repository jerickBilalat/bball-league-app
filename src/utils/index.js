export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const caculateTotalGamesPlayed = (wins,losses) => {
  wins = Number.parseInt(wins);
  losses = Number.parseInt(losses);
  return (wins + losses).toFixed();
}

export const caculateWinningPercentage = (wins,losses) => {
  wins = Number.parseInt(wins);
  losses = Number.parseInt(losses);
  let totalGamesPlayed = wins + losses;
  return wins !== 0 ? Number.parseFloat(wins * 100 / totalGamesPlayed).toFixed(2): "0.00";
}

export function rank(collection) {

  // sort collection by winning percentage
  collection.sort((a,b) => {
    let playerA = +caculateWinningPercentage(a.wins, a.losses),
        playerB = +caculateWinningPercentage(b.wins, b.losses)
    return playerB - playerA;
  })
  
  // calculate average or median participation, for now if player behind 10 games of the highest # of games played, he is out of the ranking
  let greatestGamesPlayed = collection
      .map( player => +caculateWinningPercentage(player.wins, player.losses) )
      .reduce( (max, cur) => Math.max(max, cur), -Infinity ),
    minimumParticipationDifference = 10;

  // filter collection with player higher than the median participation rate
  return collection.filter( player =>  greatestGamesPlayed - +caculateTotalGamesPlayed(player.wins, player.losses) <= minimumParticipationDifference )
}

export function formatDate(isoStringDate) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  const date = new Date(isoStringDate);

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`
}