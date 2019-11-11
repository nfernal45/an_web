import { restApiNsi } from '@/services/api/endpoints'

export default async function({ axiosModule, admDisctrict, queryString }) {
  try {
    const params = {
      limit: 1000,
      page: 1
    }

    if (admDisctrict) params.adm_district = admDisctrict
    if (queryString) params.text = queryString

    const url = restApiNsi.nsiRefDistricts.byName

    const data = await axiosModule.$get(url, { params })
    return data
  } catch (error) {
    throw error
  }
}
