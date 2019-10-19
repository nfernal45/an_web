import { restApiGfActiviti } from '@/services/api/endpoints'

export default async function(axios, requestId, nextStatusId, requestStatusId) {
  const url = restApiGfActiviti.statusMovement.postChange.replace(
    '{requestId}',
    requestId
  )

  const data = `newStatusId=${nextStatusId}&oldStatusId=${requestStatusId}`

  try {
    const response = await axios.post(url, data)
    return Promise.resolve(response)
  } catch (e) {
    return Promise.reject(e)
  }
}
