export default function({ $axios, redirect }) {
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

    // eslint-disable-next-line
    console.log('Making request to', config.url)
  })

  $axios.onResponse((config) => {
    // console.log('Getting response from', config.url)
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    // eslint-disable-next-line
    console.error('On axios error', error)
    if (code === 400) {
      // redirect('/400')
    }

    // redirect(`/error/${code}`)
  })
}
