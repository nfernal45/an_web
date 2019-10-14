/* eslint-disable */
export default function({ $auth }) {

  $auth.onRedirect((to, from) => {
    if(to === '/login') {
      $auth.$storage.setCookie('redirect', `/management${from}`, false)
    }

  })

}
