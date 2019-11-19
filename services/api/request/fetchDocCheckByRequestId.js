import { restApiGf } from '@/services/api/endpoints'

export default async function({ axiosModule, requestId }) {
  const url = restApiGf.gfDocCheck.list
  const params = {
    search: `requestId==${requestId}`
  }

  try {
    const { data } = await axiosModule.$get(url, { params })
    return data
  } catch (error) {
    throw error
  }
}
