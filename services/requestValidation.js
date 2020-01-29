import Vue from 'vue'

export const validation = function(request) {
  // if (request.reprFullname.length || request.reprShortname.length)

  if (request.licenseeType === 'L') {
    if (String(request.licenseeInn).length !== 10) {
      showWarning(
        'Для данного типа заявителя допустимая длина поля "ИНН": 10 символов.'
      )
      return false
    } else if (String(request.licenseeOgrn).length !== 13) {
      showWarning(
        'Для данного типа заявителя допустимая длина поля "ОГРН": 13 символов.'
      )
      return false
    }
  } else if (request.licenseeType === 'I') {
    if (String(request.licenseeInn).length !== 12) {
      showWarning(
        'Для данного типа заявителя допустимая длина поля "ИНН": 12 символов.'
      )
      return false
    } else if (String(request.licenseeOgrn).length !== 15) {
      showWarning(
        'Для данного типа заявителя допустимая длина поля "ОГРНИП": 15 символов.'
      )
      return false
    }
  } else {
    showWarning('Необходимо выбрать тип заявителя.')
    return false
  }

  if (request.reprFullname || request.reprShortname) {
    if (request.reprType === 'L') {
      if (String(request.reprInn).length !== 10) {
        showWarning(
          'Для данного типа представителя заявителя допустимая длина поля "ИНН": 10 символов.'
        )
        return false
      } else if (String(request.reprOgrn).length !== 13) {
        showWarning(
          'Для данного типа представителя заявителя допустимая длина поля "ОГРН": 13 символов.'
        )
        return false
      }
    } else if (request.reprType === 'I') {
      if (String(request.reprInn).length !== 12) {
        showWarning(
          'Для данного типа представителя заявителя допустимая длина поля "ИНН": 12 символов.'
        )
        return false
      } else if (String(request.reprOgrn).length !== 15) {
        showWarning(
          'Для данного типа представителя заявителя допустимая длина поля "ОГРНИП": 15 символов.'
        )
        return false
      }
    } else {
      showWarning('Необходимо выбрать тип представителя заявителя.')
      return false
    }
  }

  return true
}

const showWarning = function(message = '') {
  Vue.prototype.$notify.warning({
    title: 'Внимание',
    message
  })
}
