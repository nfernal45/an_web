import logoutOnServer from '@/services/api/auth/logoutOnServer'

export default function({
  authModule,
  axiosModule,
  baseRoute,
  currentRoute,
  redirectFunction
}) {
  const token = authModule.getToken('oauth2')

  if (!token) return

  const redirectRoute = currentRoute
    ? `${baseRoute.slice(0, -1)}${currentRoute}`
    : baseRoute

  logoutOnServer({ axiosModule })
  authModule.logout().then(() => {
    authModule.$storage.setCookie('redirect', redirectRoute, false)
    redirectFunction('/login')
  })
}
