export default function({
  authModule,
  baseRoute,
  currentRoute,
  redirectFunction
}) {
  const redirectRoute = currentRoute
    ? `${baseRoute.slice(0, -1)}${currentRoute}`
    : baseRoute

  authModule.logout().then(() => {
    authModule.$storage.setCookie('redirect', redirectRoute, false)
    redirectFunction('/login')
  })
}
