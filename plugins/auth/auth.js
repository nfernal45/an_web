import checkToken from '@/services/api/auth/checkToken'
import checkUser from '@/services/api/auth/checkUser'
import resetPassword from '@/services/api/auth/resetPassword'
import logout from '@/services/auth'

export default function({ $axios, $auth, base, redirect, route }) {
  if (process.client) {
    if ($auth.loggedIn) {
      // eslint-disable-next-line prettier/prettier
      (async function() {
        try {
          // eslint-disable-next-line camelcase
          const { user_name } = await checkToken({
            axiosModule: $axios,
            accessToken: localStorage
              .getItem('auth._token.oauth2')
              .split(' ')[1]
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
        } catch (error) {}
      })()
    }
  }

  $auth.onRedirect((to, from) => {
    if (to === '/login') {
      $auth.$storage.setCookie('redirect', `${base.slice(0, -1)}${from}`, false)
    }
  })

  $auth.onError((name, endpoint) => {
    redirect('/login')
  })
}
