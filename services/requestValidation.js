import Vue from 'vue'

export const validation = function(request) {
  const errors = []

  if (!request.typeId) errors.push('Укажите цель обращения.')
  if (!request.regPlaceId) errors.push('Укажите место подачи документов.')

  if (request.licenseeType === 'L') {
    if (String(request.licenseeInn).length !== 10)
      errors.push(
        'Для данного типа заявителя допустимая длина поля "ИНН": 10 символов.'
      )

    if (String(request.licenseeOgrn).length !== 13)
      errors.push(
        'Для данного типа заявителя допустимая длина поля "ОГРН": 13 символов.'
      )
  } else if (request.licenseeType === 'I') {
    if (String(request.licenseeInn).length !== 12)
      errors.push(
        'Для данного типа заявителя допустимая длина поля "ИНН": 12 символов.'
      )

    if (String(request.licenseeOgrn).length !== 15)
      errors.push(
        'Для данного типа заявителя допустимая длина поля "ОГРНИП": 15 символов.'
      )
  } else {
    errors.push('Необходимо выбрать тип заявителя.')
  }

  if (request.reprFullname || request.reprShortname) {
    if (request.reprType === 'L') {
      if (String(request.reprInn).length !== 10)
        errors.push(
          'Для данного типа представителя заявителя допустимая длина поля "ИНН": 10 символов.'
        )
      if (String(request.reprOgrn).length !== 13)
        errors.push(
          'Для данного типа представителя заявителя допустимая длина поля "ОГРН": 13 символов.'
        )
    } else if (request.reprType === 'I') {
      if (String(request.reprInn).length !== 12)
        errors.push(
          'Для данного типа представителя заявителя допустимая длина поля "ИНН": 12 символов.'
        )
      if (String(request.reprOgrn).length !== 15)
        errors.push(
          'Для данного типа представителя заявителя допустимая длина поля "ОГРНИП": 15 символов.'
        )
    } else {
      errors.push('Необходимо выбрать тип представителя заявителя.')
    }
  }

  if (errors.length) {
    let errorMessage = ''
    for (const error of errors) {
      errorMessage += `<div> - ${error}</div>`
    }

    console.log(errorMessage)

    Vue.prototype.$notify.warning({
      title: 'Внимание',
      message: errorMessage,
      dangerouslyUseHTMLString: true
    })

    return false
  } else {
    return true
  }
}
