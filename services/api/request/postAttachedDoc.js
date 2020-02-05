import { restApiGf } from '@/services/api/endpoints'

export default async function({ axiosModule, documentEntity }) {
  try {
    const { data } = await axiosModule({
      method: 'POST',
      url: restApiGf.gfAttachedDocs.post,
      data: documentEntity
    })

    return data
  } catch (error) {
    throw error
  }
}
