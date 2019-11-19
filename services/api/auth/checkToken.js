import { restApiAuth } from '@/services/api/endpoints'

export default async function({ axiosModule, accessToken }) {
  const url = restApiAuth.checkToken

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
