import logout from '@/services/auth'

/* eslint-disable */
export default function({ $axios, $auth, redirect, base, route }) {

  $axios.onRequest((config) => {

    if (config.url.match(/\/root-links/)) {
      config.headers.common.accept = 'application/hal+json'
      config.url = config.url.replace('/root-links', '/')
    }

    if (config.url.match(/^\/gf-api/)) {
      config.url = config.url.replace('/gf-api', process.env.APP_REST_API_GF)
    }

    if (config.url.match(/^\/gu-api/)) {
      config.url = config.url.replace('/gu-api', process.env.APP_REST_API_GU)
    }

    if (config.url.match(/^\/nsi-api/)) {
      config.url = config.url.replace('/nsi-api', process.env.APP_REST_API_NSI)
    }
    
  })

  $axios.onResponse((response) => {
    // console.info('Getting response from', response.config.url)
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      logout({ authModule: $auth, baseRoute: base, currentPath: route.path, redirectFunction: redirect })
    }
  })

}
