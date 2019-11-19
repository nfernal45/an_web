import { restApiNsi } from '@/services/api/endpoints'

export default async function({
  axiosModule,
  admDistrictId,
  district,
  construct,
  corp,
  street,
  house
}) {
  try {
    const params = {
      limit: 1000,
      start: 0
    }

    if (admDistrictId) params.adm_district = admDistrictId
    if (district) params.district = district
    if (construct) params.construct = construct
    if (corp) params.corp = corp
    if (house) params.house = house
    if (street) params.street = street

    const url = restApiNsi.nsiAddresses.paramsSearch

    const data = await axiosModule.$get(url, { params })

    return data
  } catch (error) {
    throw error
  }
}
