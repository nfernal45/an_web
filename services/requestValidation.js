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

  if (!request.typeId) {
    errors.push('Укажите цель обращения.')
  }

  if (!request.regPlaceId) {
    errors.push('Укажите место подачи документов.')
  }

  if (request.isTsgRepr === 'N' || request.typeId === 11) {
    if (!request.currentLicenseSerNum) {
      errors.push(
        'Поле "Серия и номер действующей лицензии" обязательно для ввода'
      )
    }
    if (!request.currentLicenseDate) {
      errors.push(
        'Поле "Дата выдачи действующей лицензии" обязательно для ввода'
      )
    }
  }

  if (
    !(request.typeId === 10 && request.isTsgRepr === 'Y') &&
    request.regPlaceId !== 2
  ) {
    if (!request.infMkbNum) {
      errors.push(
        'Поле "Номер" в блоке "Сведения о договоре управления многоквартирным домом" обязательно для ввода'
      )
    }

    if (!request.infMkbDate) {
      errors.push(
        'Поле "Дата" в блоке "Сведения о договоре управления многоквартирным домом" обязательно для ввода'
      )
    }

    if (!request.infMkbRequestNum) {
      errors.push(
        'Поле "Номер Заявки размещения договора управления в ГИС ЖКХ" в блоке ' +
          '"Сведения о договоре управления многоквартирным домом" обязательно для ввода'
      )
    } else {
      const regExp = new RegExp('^[0-9]{9}$')

      if (!regExp.test(request.infMkbRequestNum)) {
        errors.push(
          'Поле "Номер Заявки размещения договора управления в ГИС ЖКХ" должно состоять из 9 цифр'
        )
      }
    }
  }

  if (!request.agreementDocNum) {
    errors.push(
      'Поле "Номер" в блоке "Дополнительные сведения" обязательно для ввода'
    )
  }
  if (!request.agreementDocDate) {
    errors.push(
      'Поле "Дата" в блоке "Дополнительные сведения" обязательно для ввода'
    )
  }

  if (request.typeId === 8 || request.typeId === 9) {
    if (
      (request.agreementFoundationId === 2 ||
        request.agreementFoundationId === 1) &&
      (!request.agreementRequestNum ||
        String(request.agreementRequestNum).length !== 9)
    ) {
      errors.push(
        'Поле "Номер Заявки размещения решения (протокола) в ГИС ЖКХ" в блоке "Дополнительные сведения" обязательно для ввода и имеет формат XXXXXXXXX, где X=цифра'
      )
    }
  }

  if (
    (request.typeId === 8 || request.typeId === 9 || request.typeId === 10) &&
    request.agreementFoundationId === 1
  ) {
    if (!request.agreementTransferDate) {
      errors.push(
        'Поле "Дата передачи" в блоке "Дополнительные сведения" обязательно для ввода'
      )
    }
    if (!request.transferMethod) {
      errors.push(
        'Поле "Способ передачи" в блоке "Дополнительные сведения" обязательно для ввода'
      )
    }
  }

  if (request.agreementFoundationId === 4) {
    if (!request.explMosGorOkrug) {
      errors.push(
        'Поле "Разрешение на ввод в эксплуатацию выдано Мосгосстройнадзором или Администрацией городского округа Троицк/Щербинка?" в блоке "Сведения о разрешении на ввод объекта в эксплуатацию" обязательно для ввода'
      )
    }
    if (!request.infInExplDatePermission) {
      errors.push(
        'Поле "Дата разрешения на ввод объекта в эксплуатацию" обязательно для ввода'
      )
    }
    if (request.explMosGorOkrug && request.explMosGorOkrug.codeChar === 'Y') {
      const value = request.infInExplNumPermission
      const regExp = new RegExp('^77-[0-9]{6}-[0-9]{6}-20[0-9]{2}$')
      if (!regExp.test(value)) {
        errors.push(
          'Поле "Номер разрешения на ввод в эксплуатацию" должно иметь формат 77-XXXXXX-XXXXXX-20XX, где X=цифра'
        )
      }
    } else if (!request.infInExplNumPermission) {
      errors.push(
        'Поле "Номер разрешения на ввод в эксплуатацию" обязательно для ввода'
      )
    }
  }

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
              // noinspection RedundantIfStatementJS
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
