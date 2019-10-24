import Vue from 'vue'
import { restApiGf } from '@/services/api/endpoints'

export default async function({ axiosModule, router, requestId }) {
  const url =
    !isNaN(parseFloat(requestId)) && isFinite(requestId)
      ? `${restApiGf.gfRequest.byId.replace('{requestId}', requestId)}`
      : `${restApiGf.gfRequest.empty}`

  try {
    const request = await axiosModule.$get(url)
    return request
  } catch (error) {
    Vue.prototype.$notify.error({
      title: 'Ошибка',
      message: 'Запрошенное заявление не найдено'
    })
    router.push('/registry')
  }
}
