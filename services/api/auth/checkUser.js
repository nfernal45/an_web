import { restApiAuth } from '@/services/api/endpoints'

export default async function({ axiosModule, login }) {
  const url = restApiAuth.checkUser.replace('{login}', login)

  try {
    const data = await axiosModule.$get(url)
    console.log(data)
    return data
  } catch (error) {
    throw error
  }
}
