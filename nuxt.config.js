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
  loading: { color: '#409eff', height: '5px' },
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
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: '/'
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
  router: { base: '/management/' },
  env: {
    // APP_REST_API_GF: process.env.APP_REST_API_GF
    // APP_REST_API_GU: '/rlic-rest/api/v1',
    // APP_REST_API_NSI: '/nsi-rest/api/v1'
  }
}
