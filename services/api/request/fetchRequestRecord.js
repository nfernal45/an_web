import Vue from 'vue'
import isNumber from '@/services/helpers/isNumber'
import { restApiGf } from '@/services/api/endpoints'

export default async function({ axiosModule, router, requestId }) {
  const url = isNumber(requestId)
    ? `${restApiGf.gfRequest.byId.replace('{requestId}', requestId)}`
    : `${restApiGf.gfRequest.empty}`

  try {
    const request = await axiosModule.$get(url)
    return request
  } catch (error) {
    const code = parseInt(error.response && error.response.status)

    if (code === 404) {
      Vue.prototype.$notify.error({
        title: 'Ошибка',
        message: 'Запрошенное заявление не найдено'
      })
      router.push('/registry')
    }
  }
}
