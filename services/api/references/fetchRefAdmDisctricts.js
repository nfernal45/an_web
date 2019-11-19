import { restApiNsi } from '@/services/api/endpoints'

export default async function({ axiosModule }) {
  try {
    const data = await axiosModule.$get(restApiNsi.nsiAdmDistricts.list)

    return data
  } catch (error) {
    throw error
  }
}
