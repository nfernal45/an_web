import { restApiGf } from '@/services/api/endpoints'

export default async function({ axiosModule, docCheckEntity }) {
  try {
    const { data } = await axiosModule({
      method: docCheckEntity.checkId ? 'PUT' : 'POST',
      url: `${restApiGf.gfDocCheck.save}`,
      data: docCheckEntity
    })

    return data
  } catch (error) {
    throw error
  }
}
