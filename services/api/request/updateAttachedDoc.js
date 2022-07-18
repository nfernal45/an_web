import { restApiGf } from '@/services/api/endpoints'

export default async function({ axiosModule, documentEntity }) {
  try {
    const { data } = await axiosModule({
      method: 'PUT',
      url: restApiGf.gfAttachedDocs.put,
      data: documentEntity
    })

    return data
  } catch (error) {
    throw error
  }
}
