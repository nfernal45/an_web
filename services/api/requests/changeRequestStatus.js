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

  const query = `newStatusId=${nextStatusId}&oldStatusId=${requestStatusId}`
  console.log(query)
  try {
    const { data } = await axiosModule.post(url, query)
    Vue.prototype.$notify.success({
      title: 'Успех',
      offset: 180,
      message: `Текущий статус изменён на "${data.statusName}".`
    })
  } catch (error) {
    throw error
  }
}
