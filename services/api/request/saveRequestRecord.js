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
    let message = error.response.data.message.split(',')
    message = message.map((subMessage) => subMessage.split(':')[1])
    message = message.join('</br></br>')

    const code = parseInt(error.response && error.response.status)
    const type = code === 400 ? 'warning' : 'error'

    Vue.prototype.$notify({
      type,
      title: 'Не удалось сохранить заявление',
      dangerouslyUseHTMLString: true,
      duration: 10000,
      message
    })

    throw error
  }
}
