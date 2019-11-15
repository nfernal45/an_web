/* eslint-disable no-console */
import checkToken from '@/services/api/auth/checkToken'
import checkUser from '@/services/api/auth/checkUser'
import resetPassword from '@/services/api/auth/resetPassword'
import logout from '@/services/auth'
import { clearUserSession } from '@/services/helpers/auth/userSession'

export default function({ $axios, $auth, base, redirect, route }) {
  if (process.client) {
    $auth.$storage.watchState('loggedIn', (newValue) => {
      if (!newValue) clearUserSession()
    })

    if ($auth.loggedIn) {
      // eslint-disable-next-line prettier/prettier
      (async function() {
        // eslint-disable-next-line camelcase
        const { user_name } = await checkToken({
          axiosModule: $axios,
          accessToken: localStorage.getItem('auth._token.oauth2').split(' ')[1]
          // accessToken: $auth.getToken('oauth2').split(' ')[1]
        })

        const { isResetPassword } = await checkUser({
          axiosModule: $axios,
          login: user_name
        })

        if (isResetPassword === 'Y') {
          logout({
            authModule: $auth,
            axiosModule: $axios,
            baseRoute: base,
            currentRoute: route.path,
            redirectFunction: redirect
          })

          resetPassword({ redirect, base })
        }
      })()
    }
  }

  $auth.$storage.watchState('loggedIn', (newValue) => {
    // console.log('state watcher is logged in', newValue)
  })

  $auth.onRedirect((to, from) => {
    // console.log('Auth redirect from', from, 'to', to)
    if (to === '/login') {
      $auth.$storage.setCookie('redirect', `${base.slice(0, -1)}${from}`, false)
    }
  })

  $auth.onError((name, endpoint) => {
    redirect('/login')
  })
}
