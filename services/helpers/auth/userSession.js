const sessionDuration = 1000 * 60 * 60 * 2 // 2 hour

const setLastTokenDate = function() {
  localStorage.setItem('lastTokenDate', new Date())
}

const checkUserSession = function() {
  const lastTokenDate = localStorage.getItem('lastTokenDate')
  const timeLeft = sessionDuration - (new Date() - new Date(lastTokenDate))
  return lastTokenDate === null ? true : timeLeft > 0
}

const clearUserSession = function() {
  localStorage.removeItem('lastTokenDate')
}

export { setLastTokenDate, checkUserSession, clearUserSession }
