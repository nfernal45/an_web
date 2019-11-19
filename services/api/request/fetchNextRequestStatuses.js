import { restApiGfActiviti } from '@/services/api/endpoints'

export default async function({ axiosModule, requestId }) {
  const url = restApiGfActiviti.statusMovement.getNext.replace(
    '{requestId}',
    requestId
  )

  try {
    const data = await axiosModule.$get(url)
    return data
  } catch (error) {
    throw error
  }
}
