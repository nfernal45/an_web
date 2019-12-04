const dateToString = function(date) {
  return `${('0' + date.getDate()).slice(-2)}.${(
    '0' +
    (date.getMonth() + 1)
  ).slice(-2)}.${date.getFullYear()}`
}

const stringToDate = function(string) {
  if (!string) return string
  const dateParts = string.split('.')
  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
}

export { dateToString, stringToDate }
