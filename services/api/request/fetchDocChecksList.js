import { restApiGf } from '@/services/api/endpoints'

export default async function({ axiosModule, searchString }) {
  try {
    const { data } = await axiosModule({
      method: 'GET',
      url: `${restApiGf.gfDocCheck.list}`,
      params: {
        search: searchString
      }
    })

    return data
  } catch (error) {
    throw error
  }
}
