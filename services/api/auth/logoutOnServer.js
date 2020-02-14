import { restApiAuth } from '@/services/api/endpoints'

export default async function({ axiosModule }) {
  const exitUrl = restApiAuth.exit
  const logoutUrl = restApiAuth.logout
  try {
    const data = await axiosModule.$post(exitUrl)
    return data
  } catch (error) {
    try {
      const data = await axiosModule.$post(logoutUrl)
      return data
    } catch (error) {
      throw error
    }
  }
}
