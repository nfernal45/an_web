import { restApiNsi } from '@/services/api/endpoints'

export default async function({ axiosModule, query }) {
  let url = restApiNsi.nsiAddresses.paramsSearch
  let params = query

  if (query.addressId) {
    const search = []
    url = restApiNsi.nsiAddresses.list
    Object.keys(query).forEach((key) => {
      search.push(`${key}=="${query[key]}"`)
    })
    params = { search: search.join(';') }
  } else {
    query.limit = 10
    query.start = 1
  }

  try {
    const response = await axiosModule.$get(url, { params })
    return query.addressId ? response.data : response
  } catch (error) {
    throw error
  }
}
