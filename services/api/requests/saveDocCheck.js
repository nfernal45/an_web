import { restApiGf } from '@/services/api/endpoints'

export default async function({ axiosModule, requestId, docCheckEntity }) {
  try {
    const { data } = await axiosModule({
      method: requestId ? 'PUT' : 'POST',
      url: `${restApiGf.gfDocCheck.save}`,
      data: docCheckEntity
    })

    return data
  } catch (error) {
    throw error
  }
}
