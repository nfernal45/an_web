/* eslint-disable */
export default function({ $auth, base }) {
  console.log($auth.$state)
  $auth.onRedirect((to, from) => {
    if(to === '/login') {
      $auth.$storage.setCookie('redirect', `${base.slice(0, -1)}${from}`, false)
    }
  })
}
