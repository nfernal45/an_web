import Vue from 'vue'
import { restApiGf } from '@/services/api/endpoints'

export default async function({ axiosModule, router, appealId }) {
  const url =
    !isNaN(parseFloat(appealId)) && isFinite(appealId)
      ? `${restApiGf.gfAppeal.byId.replace('{requestId}', appealId)}`
      : `${restApiGf.gfAppeal.empty}`

  try {
    const appeal = await axiosModule.$get(url)
    return appeal
  } catch (error) {
    Vue.prototype.$notify.error({
      title: 'Ошибка',
      message: 'Запрошенное заявление не найдено'
    })
    router.push('/registry')
  }
}
