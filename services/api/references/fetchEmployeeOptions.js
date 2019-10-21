import { restApiNsi } from '@/services/api/endpoints'

export default async function({ axiosModule, query }) {
  query = 'limit==500'
  const url = restApiNsi.nsiRefOrgStructure.list

  try {
    const data = await axiosModule.$get(url, query)
    // eslint-disable-next-line no-console
    console.log(data)
    // return data
  } catch (error) {
    throw error
  }
}
