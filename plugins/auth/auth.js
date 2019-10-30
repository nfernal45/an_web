/* eslint-disable no-console */
import checkToken from '@/services/api/auth/checkToken'
import checkUser from '@/services/api/auth/checkUser'
import resetPassword from '@/services/api/auth/resetPassword'
export default function({ $axios, $auth, base, redirect, $router }) {
  if (process.client) {
    // console.group('Auth plugin')
    if ($auth.loggedIn) {
      // console.log('Token', $auth.getToken('oauth2'))

      // eslint-disable-next-line prettier/prettier
      (async function() {
        // eslint-disable-next-line camelcase
        const { user_name } = await checkToken({
          axiosModule: $axios,
          accessToken: $auth.getToken('oauth2').split(' ')[1]
        })

        const { isResetPassword } = await checkUser({
          axiosModule: $axios,
          login: user_name
        })

        if (isResetPassword === 'Y') {
          resetPassword({ redirect, base })
        }
      })()
    }
    // console.log('is loggen in', $auth.loggedIn)
    // console.groupEnd()
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
