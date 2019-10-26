import { restApiNsi } from '@/services/api/endpoints'

export default async function({ axiosModule, employeeId }) {
  const url = restApiNsi.nsiRefOrgStructure.byId.replace('{id}', employeeId)

  try {
    const { data } = await axiosModule.$get(url)
    return data
  } catch (error) {
    throw error
  }
}
