import { restApiAuth } from '@/services/api/endpoints'

export default function({ redirect, base }) {
  const url = restApiAuth.passwordReset
  redirect(
    `${process.env.APP_HOST}${url}?redirect-uri=${process.env.APP_HOST.replace(
      'http://',
      ''
    )}/${base}`
  )
}
