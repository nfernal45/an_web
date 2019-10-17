export default function({ $auth, base }) {
  $auth.onRedirect((to, from) => {
    if (to === '/login') {
      $auth.$storage.setCookie('redirect', `${base.slice(0, -1)}${from}`, false)
    }
  })
}
