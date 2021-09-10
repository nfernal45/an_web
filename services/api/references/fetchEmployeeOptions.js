import { restApiNsi } from '@/services/api/endpoints'

export default async function({ axiosModule, query }) {
  const search = []

  Object.keys(query).forEach((key) => {
    search.push(`${key}=="${query[key]}"`)
  })

  const params = {
    search: search.join(';')
  }

  const url = restApiNsi.nsiRefOrgStructure.list

  try {
    const { data } = await axiosModule.$get(url, { params })
    return data
  } catch (error) {
    throw error
  }
}
