import Vue from 'vue'
import { restApiNsi } from '@/services/api/endpoints'

export default async function({ axiosModule, admDisctrict }) {
  try {
    const params = {
      limit: 1000,
      page: 1
    }

    if (admDisctrict) params.adm_district = admDisctrict

    const url = restApiNsi.nsiRefStreets.list

    const data = await axiosModule.$get(url, { params })
    return data
  } catch (error) {
    throw error
  }
}
