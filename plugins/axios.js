export default function({ $axios, redirect }) {
  $axios.onRequest((config) => {
    // if (config.url.match(/^\/gf/)) {
    //   console.log('URL', config.url)
    //   config.url = '/rlic-gf-rest/api/v1'
    // }

    // if (config.url.match(/^\/gf-root-links/)) {
    //   config.headers.common['Content-Type'] = 'application/hal+json'
    // }

    // if (config.url.match(/^\/gf/)) {
    //   config.url = '/rlic-gf-rest/api/v1'
    // }

    // if (config.url.match(/^\/gu/)) {
    //   config.url = '/rlic-rest/api/v1'
    // }

    // if (config.url.match(/^\/nsi/)) {
    //   config.url = '/rlic-nsi-rest/api/v1'
    // }

    console.log('Making request to ' + config.url)
    // return config
  })

  // $axios.onResponse((config) => {
  //   console.log('Getting response from' + config.url)
  // })

  // $axios.onError((error) => {
  //   const code = parseInt(error.response && error.response.status)
  //   if (code === 400) {
  //     redirect('/400')
  //   }
  // })
}
