import { restApiAuth } from '@/services/api/endpoints'

export default function({ redirect }) {
  const url = restApiAuth.passwordReset
  redirect(`${process.env.APP_HOST}${url}`)
}
