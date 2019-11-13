import { restApiAuth } from '@/services/api/endpoints'

export default async function({ axiosModule, accessToken }) {
  const url = restApiAuth.checkToken
  // eslint-disable-next-line no-console
  console.log('checkToken', accessToken)

  const params = {
    token: accessToken
  }

  try {
    const response = await axiosModule.$get(url, { params })
    return response
  } catch (error) {
    throw error
  }
}
