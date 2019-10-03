export default {
  mode: 'universal',
  server: {
    port: 5001,
    host: '0.0.0.0',
    disableHostCheck: true
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Внесение изменений в реестр',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/scss/element-variables.scss',
    '@/assets/sass/global-styles.sass'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/global-elements',
    '@/plugins/font-awesome',
    '@/plugins/axios'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true // Can be also an object with default options
  },
  proxy: {
    '/gf/': 'http://gf-qa.c-i-p.ru/api/v1/'
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  router: {
    base: '/management/',
    middleware: 'root-links'
  },
  env: {
    APP_REST_API_GF: '/rlic-gf-rest/api/v1',
    APP_REST_API_GU: '/rlic-rest/api/v1',
    APP_REST_API_NSI: '/nsi-rest/api/v1'
  }
}
