import Vue from 'vue'

export const validation = function(request) {
  if (request.licenseeType === 'L') {
    if (String(request.licenseeInn).length < 10) {
      return showWarning(
        'Для данного типа заявителя/представителя заявителя допустимая длина поля "ИНН": 10 символов.'
      )
    } else if (String(request.licenseeOgrn).length < 13) {
      return showWarning(
        'Для данного типа заявителя/представителя заявителя допустимая длина поля "ОГРН": 13 символов.'
      )
    }
  } else if (request.licenseeType === 'I') {
    if (String(request.licenseeInn).length < 12) {
      return showWarning(
        'Для данного типа заявителя/представителя заявителя допустимая длина поля "ИНН": 12 символов.'
      )
    } else if (String(request.licenseeOgrn).length < 15) {
      return showWarning(
        'Для данного типа заявителя/представителя заявителя допустимая длина поля "ИНН": 15 символов.'
      )
    }
  }

  return true
}

const showWarning = function(message = '') {
  Vue.$notify.warn({
    title: 'Внимание',
    message
  })
}
