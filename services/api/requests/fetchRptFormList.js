import { restApiGf } from '@/services/api/endpoints'

export default async function({ axiosModule, requestTypeId, statusId }) {
  const url = restApiGf.gfRptForm.list
    .replace('{requestTypeId}', requestTypeId)
    .replace('{statusId}', statusId)

  try {
    const response = await axiosModule.$get(url)
    return response
  } catch (error) {
    throw error
  }
}
