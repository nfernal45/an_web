import { restApiNsi } from '@/services/api/endpoints'

export default async function({ axiosModule, admDisctrict, district, query }) {
  try {
    const params = {
      page: 1,
      limit: 100
    }

    if (admDisctrict) params.adm_district = admDisctrict
    if (district) params.district = district
    if (query) params.text = query

    const url = restApiNsi.nsiStreets.list

    const data = await axiosModule.$get(url, { params })
    return data
  } catch (error) {
    throw error
  }
}
