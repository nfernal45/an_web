import qs from 'qs'
import Vue from 'vue'
import { restApiGfActiviti } from '@/services/api/endpoints'

export default async function({
  axiosModule,
  requestId,
  nextStatusId,
  requestStatusId
}) {
  const url = restApiGfActiviti.statusMovement.postChange.replace(
    '{requestId}',
    requestId
  )

  const query = { newStatusId: nextStatusId, oldStatusId: requestStatusId }

  try {
    const { data } = await axiosModule.post(url, qs.stringify(query))
    Vue.prototype.$notify.success({
      title: 'Статус изменен',
      message: `Текущий статус изменён на "${data.statusName}".`
    })
  } catch (error) {
    if (error.status === 400) {
      Vue.prototype.$notify({
        type: 'warning',
        title: 'Внимание',
        message: error.message
      })
    } else {
      Vue.prototype.$notify.error({
        title: 'Ошибка смены статуса',
        message: error.message
      })
    }
  }
}
