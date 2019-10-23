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
      title: 'Успех',
      message: 'Заявление сохранено',
      type: 'success'
    })

    return data
  } catch (error) {
    let message = error.response.data.message.split(',')
    message = message.map((subMessage) => subMessage.split(':')[1])
    message = message.join('</br></br>')

    Vue.prototype.$notify.error({
      title: 'Не удалось сохранить заявление',
      dangerouslyUseHTMLString: true,
      duration: 10000,
      message
    })

    throw error
  }
}
