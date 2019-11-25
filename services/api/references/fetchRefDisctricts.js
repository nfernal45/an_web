import { restApiNsi } from '@/services/api/endpoints'

export default async function({ axiosModule, admDisctrict, query }) {
  try {
    const params = {
      page: 1
    }

    if (admDisctrict) params.adm_district = admDisctrict
    if (query) params.text = query

    const url = restApiNsi.nsiDistricts.list

    const data = await axiosModule.$get(url, { params })
    return data
  } catch (error) {
    throw error
  }
}
