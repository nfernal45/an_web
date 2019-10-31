import { restApiAuth } from '@/services/api/endpoints'

export default async function({ axiosModule }) {
  const url = restApiAuth.exit
  try {
    const data = await axiosModule.$post(url)
    return data
  } catch (error) {
    throw error
  }
}
