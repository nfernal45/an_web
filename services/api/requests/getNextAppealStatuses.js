import { restApiGfActiviti } from '@/services/api/endpoints'

export default async function(axios, requestId) {
  const url = restApiGfActiviti.statusMovement.getNext.replace(
    '{requestId}',
    requestId
  )

  try {
    const response = await axios.get(url)
    return Promise.resolve(response)
  } catch (e) {
    return Promise.reject(e)
  }
}
