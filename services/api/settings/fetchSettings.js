import { restApiNsi } from '@/services/api/endpoints'

export default async function({ axiosModule, query }) {
  const url = restApiNsi.rsysSettings.list
  const params = { search: `settingId=in=(${query.join(',')})` }

  try {
    const { data } = await axiosModule.$get(url, { params })
    return data
  } catch (error) {
    throw error
  }
}
