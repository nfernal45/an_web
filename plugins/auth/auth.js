/* eslint-disable no-console */
import checkToken from '@/services/api/auth/checkToken'
import checkUser from '@/services/api/auth/checkUser'
export default function({ $axios, $auth, base, redirect }) {
  if (process.client) {
    console.group('Auth plugin')
    if ($auth.loggedIn) {
      // console.log('Token', $auth.getToken('oauth2'))

      // eslint-disable-next-line prettier/prettier
      (async function() {
        // eslint-disable-next-line camelcase
        const { user_name } = await checkToken({
          axiosModule: $axios,
          accessToken: $auth.getToken('oauth2').split(' ')[1]
        })

        await checkUser({
          axiosModule: $axios,
          login: user_name
        })

        console.log(user_name)
      })()
    }
    console.log('is loggen in', $auth.loggedIn)
    console.groupEnd()
  }

  $auth.$storage.watchState('loggedIn', (newValue) => {
    console.log('state watcher is logged in', newValue)
  })

  $auth.onRedirect((to, from) => {
    console.log('Auth redirect from', from, 'to', to)
    if (to === '/login') {
      $auth.$storage.setCookie('redirect', `${base.slice(0, -1)}${from}`, false)
    }
  })

  $auth.onError((name, endpoint) => {
    redirect('/login')
  })
}
