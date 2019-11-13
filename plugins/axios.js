import Vue from 'vue'
import refreshToken from '@/services/api/auth/refreshToken'
// import logout from '@/services/auth'

/* eslint-disable */
export default function({ $axios, $auth, redirect, base, route }) {

  $axios.onRequest((config) => {

    if (config.url.match(/\/root-links/)) {
      config.headers.common.accept = 'application/hal+json'
      config.url = config.url.replace('/root-links', '/')
    }

    // if (config.url.match(/^\/gf-api/)) {
    //   config.url = config.url.replace('/gf-api', process.env.APP_REST_API_GF)
    // }

    // if (config.url.match(/^\/gu-api/)) {
    //   config.url = config.url.replace('/gu-api', process.env.APP_REST_API_GU)
    // }

    // if (config.url.match(/^\/nsi-api/)) {
    //   config.url = config.url.replace('/nsi-api', process.env.APP_REST_API_NSI)
    // }
    // console.info('Making request to', config.url)
  })

  $axios.onResponse((response) => {
    // console.info('Getting response from', response.config.url)
  })

  $axios.onResponseError((error) => {
    const code = parseInt(error.response && error.response.status)
    const errorMsg = error.response ? error.response.data.error : ''

    if (code === 404) {
      throw error
    }

    if (code === 400 || code === 401) {
      console.log('400 or 401')
      // throw error
      if (errorMsg === 'invalid_token') {
        refreshToken({ authModule: $auth, axiosModule: $axios })
          .then(() => {
            console.log('token has refreshed')
            // $axios.request(error.config)
          })
          .catch(() => {
            console.log('logout if session expired')
            // logout({
            //   authModule: $auth,
            //   axiosModule: $axios,
            //   baseRoute: base,
            //   currentRoute: route.path,
            //   redirectFunction: redirect
          })
      // })

      }
    }
    // if (code === 401) {
      // notify({ message: error.message, type: 'error' })
      // return
    // }
  })

}


function notify({ message, type }) {
  Vue.prototype.$notify({
    type,
    title: 'Ошибка',
    message
  })
}
