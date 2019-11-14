import { restApiNsi } from '@/services/api/endpoints'

export default async function({ axiosModule, search }) {
  try {
    const params = {
      limit: 1000,
      start: 0,
      search
    }

    const url = restApiNsi.nsiAddresses.list

    const data = await axiosModule.$get(url, { params })

    return data
  } catch (error) {
    throw error
  }
}
