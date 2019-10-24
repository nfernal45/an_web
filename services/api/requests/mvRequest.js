import Vue from 'vue'
import { restApiGfRabbitmq } from '@/services/api/endpoints'

export default async function({ axiosModule, documentId }) {
  const url = restApiGfRabbitmq.sendingToEtp.send
  const data = `queriedDocId=${documentId}`

  try {
    const response = await axiosModule.$post(url, data)
    Vue.prototype.$notify.success({
      title: 'Внимание',
      message: 'Запрос успешно отправлен'
    })
    return response
  } catch (error) {
    Vue.prototype.error({
      title: 'Внимание',
      message: 'Всё печально'
    })
    return error
  }
}
