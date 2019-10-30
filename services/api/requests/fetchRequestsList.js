import { restApiGf } from '@/services/api/endpoints'

export default async function({ axiosModule, searchParams }) {
  try {
    const { data } = await axiosModule.$get(restApiGf.gfRequest.list, {
      params: searchParams
    })
    return data
  } catch (error) {
    throw error
  }
}
