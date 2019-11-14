import { restApiNsi } from '@/services/api/endpoints'

export default async function({ axiosModule, query }) {
  query.limit = 100
  query.page = 1

  const url = restApiNsi.nsiStreets.list

  try {
    const data = await axiosModule.$get(url, { params: query })
    return data
  } catch (error) {
    throw error
  }
}
