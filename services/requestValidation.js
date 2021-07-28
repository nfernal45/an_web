import Vue from 'vue'

export const validation = function(request, rest) {
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

  if (
    request.reprFullname ||
    request.reprShortname ||
    request.reprInn ||
    request.reprOgrn
  ) {
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

  if (request.gfAbeyancesByRequestId.length) {
    // Оформляется решение === 6
    if (rest.nextStatusId === 6) {
      if (rest.docCheck && Object.keys(rest.docCheck).length !== 0) {
        if (
          rest.docCheck.gfCheckViolationsByCheckId &&
          rest.docCheck.gfCheckViolationsByCheckId.length
        ) {
          const checkIsDocCheckRequired = rest.docCheck.gfCheckViolationsByCheckId
            .filter((item) => {
              if (
                item.primaryInspResultId === 1 &&
                item.abeyanceInspResultId === 2 &&
                item.abeyanceInspDescr === null
              ) {
                return true
              }
              if (
                item.primaryInspResultId === 2 &&
                item.abeyanceInspResultId === 2 &&
                item.abeyanceInspDescr === null
              ) {
                return true
              }
              if (
                item.primaryInspResultId === 4 &&
                item.abeyanceInspResultId === 2 &&
                item.abeyanceInspDescr === null
              ) {
                return true
              }
              return false
            })
            .map((item) => item.refViolationGroupByGroupId.name)

          if (checkIsDocCheckRequired.length) {
            errors.push(
              'Необходимо заполнить поле "Описание нарушений после приостановки", вкладка "Ход рассмотрения", блоки:'
            )
            checkIsDocCheckRequired.forEach((item) => {
              errors.push(item)
            })
          }

          const checkIsPrimaryInspResultFilled = rest.docCheck.gfCheckViolationsByCheckId.filter(
            (item) => {
              if (item.primaryInspResultId === null) {
                return true
              } else {
                return false
              }
            }
          )

          if (checkIsPrimaryInspResultFilled.length) {
            errors.push(
              'Необходимо заполнить поле "Первичный осмотр, результат проверки", вкладка "Ход рассмотрения";'
            )
          }

          const checkIsAbeyanceInspResultFilled = rest.docCheck.gfCheckViolationsByCheckId.filter(
            (item) => {
              if (item.abeyanceInspResultId === null) {
                return true
              } else {
                return false
              }
            }
          )

          if (checkIsAbeyanceInspResultFilled.length) {
            errors.push(
              'Необходимо заполнить поле "Осмотр после приостановки, результат проверки", вкладка "Ход рассмотрения";'
            )
          }

          if (rest.docCheck.isInstructionRequired === null) {
            errors.push(
              'Необходимо выбрать флаг "Создание распоряжения в ходе рассмотрения заявления", вкладка "Ход рассмотрения";'
            )
          }
        }
      }
    }

    // Приостановление === 9
    if (rest.nextStatusId === 9) {
      if (rest.docCheck && Object.keys(rest.docCheck).length !== 0) {
        if (
          rest.docCheck.gfCheckViolationsByCheckId &&
          rest.docCheck.gfCheckViolationsByCheckId.length
        ) {
          const checkIsPrimaryInspResultFilled = rest.docCheck.gfCheckViolationsByCheckId.filter(
            (item) => {
              if (item.primaryInspResultId === null) {
                return true
              } else {
                return false
              }
            }
          )

          if (checkIsPrimaryInspResultFilled.length) {
            errors.push(
              'Необходимо заполнить поле "Первичный осмотр, результат проверки", вкладка "Ход рассмотрения";'
            )
          }

          if (rest.docCheck.isInstructionRequired === null) {
            errors.push(
              'Необходимо выбрать флаг "Создание распоряжения в ходе рассмотрения заявления", вкладка "Ход рассмотрения";'
            )
          }
        }
      }
    }
  }

  if (errors.length) {
    let errorMessage = ''
    for (const error of errors) {
      errorMessage += `<div> - ${error}</div>`
    }

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
