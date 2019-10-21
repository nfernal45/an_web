import { restApiGfRabbitmq } from '@/services/api/endpoints'

export default async function(axios, id) {
  const url = restApiGfRabbitmq.sendingToEtp.send
  const data = `queriedDocId=${id}`

  try {
    const response = await axios.post(url, data)

    return Promise.resolve(response)
  } catch (e) {
    return Promise.reject(e)
  }
}
