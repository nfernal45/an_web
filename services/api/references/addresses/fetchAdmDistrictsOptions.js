import { restApiNsi } from '@/services/api/endpoints'

export default async function({ axiosModule }) {
  const url = restApiNsi.nsiAdmDistricts.list

  try {
    const data = await axiosModule.$get(url)
    return data
  } catch (error) {
    throw error
  }
}
