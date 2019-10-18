import Vue from 'vue'
import { restApiGf } from '@/services/api/endpoints'

export default async function(axios, appeal) {
  try {
    await axios({
      method: appeal.requestId ? 'PUT' : 'POST',
      url: `${restApiGf.gfAppeal.save}`,
      data: appeal
    })

    Vue.prototype.$notify({
      title: 'Успех',
      message: 'Заявление сохранено',
      type: 'success'
    })
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
  }
}
