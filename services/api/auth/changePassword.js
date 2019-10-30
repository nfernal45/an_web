import { restApiAuth } from '@/services/api/endpoints'

export default function({ redirectModule, userLogin }) {
  console.log('fetch user login', userLogin)
  const url = restApiAuth.passwordReset.replace('{login}', userLogin)

  redirectModule(url)
  // try {
  //   const response = await axiosModule.$get(url)
  //   return response
  // } catch (error) {
  //   throw error
  // }
}
