import { restApiNsi } from '@/services/api/endpoints'

export default async function({ axiosModule, query }) {
  query.limit = 10
  query.page = 1

  const url = restApiNsi.nsiHouseNumbers.list

  try {
    const data = await axiosModule.$get(url, { params: query })
    return data
  } catch (error) {
    throw error
  }
}
