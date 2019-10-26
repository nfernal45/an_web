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
      offset: 180,
      message: `Текущий статус изменён на "${data.statusName}".`
    })
  } catch (error) {
    throw error
  }
}
