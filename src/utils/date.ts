function sortByTimestamp(a: ChatMessage, b: ChatMessage) {
  return new Date(a.timestamp!).getTime() - new Date(b.timestamp!).getTime();
}

function getDay(timestamp: string) {
  return new Date(timestamp).getDate();
}

function getDayName(day: number) {
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return weekday[day];
}
function getCurrentDate() {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();
  return formattedDate;
}

const DateUtils = {
  sortByTimestamp,
  getDay,
  getDayName,
  getCurrentDate
};

export default DateUtils;