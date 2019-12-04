import Vue from 'vue'
import { restApiGf } from '@/services/api/endpoints'

export default async function(axios, request) {
  try {
    const { data } = await axios({
      method: request.requestId ? 'PUT' : 'POST',
      url: `${restApiGf.gfRequest.save}`,
      data: request
    })

    Vue.prototype.$notify({
      title: 'Сохранено',
      message: 'Изменения сохранены',
      type: 'success'
    })

    return data
  } catch (error) {
    const code = parseInt(error.response && error.response.status)

    if (code === 409) {
      Vue.prototype.$notify({
        type: 'warning',
        title: 'Не удалось сохранить заявление',
        dangerouslyUseHTMLString: true,
        duration: 10000,
        message:
          'Данные были изменены или удалены другим пользователем. Пожалуйста, обновите страницу.'
      })
    } else {
      let message = error.response.data.message.split(',')
      message = message.map((subMessage) => subMessage.split(':')[1])
      message = message.join('</br></br>')

      const type = code === 400 ? 'warning' : 'error'

      Vue.prototype.$notify({
        type,
        title: 'Не удалось сохранить заявление',
        dangerouslyUseHTMLString: true,
        duration: 10000,
        message
      })
    }

    throw error
  }
}
