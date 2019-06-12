export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
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