import Vue from 'vue'
import qs from 'qs'
import { restApiGfRabbitmq } from '@/services/api/endpoints'

export default async function({
  axiosModule,
  documentQueryId,
  userLogin,
  etpOutMessageEntityId
}) {
  const url = restApiGfRabbitmq.sendingToEtp.send
  const data = {
    queriedDocId: documentQueryId,
    userLogin,
    etpOutMessageEntityId
  }

  try {
    const response = await axiosModule.$post(url, qs.stringify(data))
    Vue.prototype.$notify.success({
      title: 'Внимание',
      message: 'Запрос успешно отправлен'
    })
    return response
  } catch (error) {
    Vue.prototype.$notify.error({
      title: 'Внимание',
      message: 'Произошла ошибка. Повторите попытку позже.'
    })
    return error
  }
}
