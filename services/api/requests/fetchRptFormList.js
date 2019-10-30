import { restApiGf } from '@/services/api/endpoints'

export default async function({ axiosModule, requestTypeId, statusId }) {
  const url = restApiGf.gfRptForm.list

  const params = {
    search: `statusId==${statusId};typeId==${requestTypeId}`
  }

  try {
    const { data } = await axiosModule.$get(url, { params })
    return data
  } catch (error) {
    throw error
  }
}
