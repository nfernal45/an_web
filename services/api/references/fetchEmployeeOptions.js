import { restApiNsi } from '@/services/api/endpoints'

export default async function({ axiosModule, query }) {
  const search = []

  Object.keys(query).forEach((key) => {
    if (key.includes('!')) {
      search.push(`${key}="${query[key]}"`)
    } else {
      search.push(`${key}=="${query[key]}"`)
    }
  })

  const params = {
    limit: 20,
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
