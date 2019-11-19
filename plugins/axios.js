/* eslint-disable no-unused-vars */
import Vue from 'vue'
import refreshToken from '@/services/api/auth/refreshToken'
import logout from '@/services/auth'

/* eslint-disable */
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

    let originalRequest = error.config

    if (code === 400 || code === 401) {
      originalRequest.__isRetryRequest = true
      return new Promise((resolve, reject) => {
        let req = refreshToken({ authModule: $auth, axiosModule: $axios })
          .then(() => {
            if (originalRequest.params && originalRequest.params.token) originalRequest.params.token = $auth.getToken('oauth2').split(' ')[1]
            originalRequest.headers['Authorization'] = $auth.getToken('oauth2')
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
            reject()
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
    }
  })
}


function notify({ message, type }) {
  Vue.prototype.$notify({
    type,
    title: 'Ошибка',
    message
  })
}
