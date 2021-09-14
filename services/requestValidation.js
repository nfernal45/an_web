import Vue from 'vue'

const filterArrayByField = (array, field) =>
  array.filter((item) => item[field] === null)

const isNeedCheckViolationsErrors = (array) =>
  array.docCheck &&
  Object.keys(array.docCheck).length !== 0 &&
  array.docCheck.gfCheckViolationsByCheckId &&
  array.docCheck.gfCheckViolationsByCheckId.length

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

  // Оформляется решение === 6 (без приостановки)
  if (rest.nextStatusId === 6) {
    if (
      !(
        request.typeId === 10 &&
        (request.agreementFoundationId === 5 ||
          request.agreementFoundationId === 6)
      )
    ) {
      if (isNeedCheckViolationsErrors(rest)) {
        const isPrimaryInspResultFilled = filterArrayByField(
          rest.docCheck.gfCheckViolationsByCheckId,
          'primaryInspResultId'
        ).length

        if (isPrimaryInspResultFilled) {
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
  // триггер "Оформить приостановление"
  if (rest.nextStatusId === 8) {
    if (isNeedCheckViolationsErrors(rest)) {
      const isPrimaryInspResultFilled = filterArrayByField(
        rest.docCheck.gfCheckViolationsByCheckId,
        'primaryInspResultId'
      ).length

      if (isPrimaryInspResultFilled) {
        errors.push(
          'Необходимо заполнить поле "Первичный осмотр, результат проверки", вкладка "Ход рассмотрения";'
        )
      }
    }
  }

  // (была приостановка)
  if (request.gfAbeyancesByRequestId.length) {
    switch (rest.nextStatusId) {
      // Оформляется решение === 6
      case 6: {
        if (isNeedCheckViolationsErrors(rest)) {
          const isAbeyanceInspResultFilled = filterArrayByField(
            rest.docCheck.gfCheckViolationsByCheckId,
            'abeyanceInspResultId'
          ).length

          if (isAbeyanceInspResultFilled) {
            errors.push(
              'Необходимо заполнить поле "Осмотр после приостановки, результат проверки", вкладка "Ход рассмотрения";'
            )
          }

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
        }
        break
      }

      // Приостановление === 9
      case 9: {
        if (isNeedCheckViolationsErrors(rest)) {
          const isPrimaryInspResultFilled = filterArrayByField(
            rest.docCheck.gfCheckViolationsByCheckId,
            'primaryInspResultId'
          ).length

          if (isPrimaryInspResultFilled) {
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
        break
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
