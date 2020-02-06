import refreshToken from '@/services/api/auth/refreshToken'
import logout from '@/services/auth'

export default function({ $axios, $auth, base, redirect, route }) {
  $axios.onRequest((config) => {
    if (config.url.match(/\/root-links/)) {
      config.headers.common.accept = 'application/hal+json'
      config.url = config.url.replace('/root-links', '/')
    }
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    const errorMsg = error.response ? error.response.data.error : ''

    if (code === 404) {
      throw error
    }

    const originalRequest = error.config

    if (code === 400 || code === 401) {
      if (originalRequest.url.includes('exit')) throw error

      if (errorMsg === 'invalid_token') {
        return new Promise((resolve, reject) => {
          refreshToken({ authModule: $auth, axiosModule: $axios })
            .then(() => {
              if (originalRequest.params && originalRequest.params.token)
                originalRequest.params.token = $auth
                  .getToken('oauth2')
                  .split(' ')[1]
              originalRequest.headers.Authorization = $auth.getToken('oauth2')
              resolve()
            })
            .catch((error) => {
              logout({
                authModule: $auth,
                axiosModule: $axios,
                baseRoute: base,
                currentRoute: route.path,
                redirectFunction: redirect
              })
              reject(error)
            })
        })
          .then(() => {
            return $axios.request(originalRequest)
          })
          .catch(() => {
            logout({
              authModule: $auth,
              axiosModule: $axios,
              baseRoute: base,
              currentRoute: route.path,
              redirectFunction: redirect
            })

          })
      } else {
        // TODO: реализовать правильную обработку ошибки
        throw error
      }
    }
  })
}
