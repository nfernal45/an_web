import { restApiAuth } from '@/services/api/endpoints'

export default function({ redirect, base }) {
  const url = restApiAuth.passwordReset
  redirect(
    `${process.env.APP_HOST}${url}?redirect_uri=${process.env.APP_HOST}/${base}`
  )
}
