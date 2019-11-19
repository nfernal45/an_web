import { restApiGf } from '@/services/api/endpoints'

export default async function({ axiosModule, entityArray }) {
  try {
    const { data } = await axiosModule({
      method: 'PUT',
      url: `${restApiGf.gfQueriedDocs.updateRequiredInterParams}`,
      data: entityArray
    })

    return data
  } catch (error) {
    throw error
  }
}
