export default function({
  authModule,
  baseRoute,
  currentRoute,
  redirectFunction
}) {
  authModule.logout().then(() => {
    authModule.$storage.setCookie(
      'redirect',
      `${baseRoute.slice(0, -1)}${currentRoute}`,
      false
    )
    redirectFunction('/login')
  })
}
