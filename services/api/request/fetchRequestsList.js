import { restApiGf } from '@/services/api/endpoints'

export default async function({ axiosModule, searchParams }) {
  try {
    const response = await axiosModule.$get(restApiGf.gfRequest.list, {
      params: searchParams
    })
    return response
  } catch (error) {
    throw error
  }
}
