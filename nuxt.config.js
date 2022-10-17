require('dotenv').config()
// eslint-disable-next-line nuxt/no-cjs-in-config
const authStrategies = require('./plugins/auth/strategies.js')
// import authStrategies from './plugins/auth/strategies.js'

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
    '@/assets/sass/global-styles.sass',
    '@/assets/sass/global-transitions.sass'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/global-elements',
    '@/plugins/font-awesome',
    '@/plugins/v-mask',
    { src: '@/plugins/vue-ls', mode: 'client' }
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
    '@nuxtjs/dotenv',
    '@nuxtjs/auth'
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
  router: {
    base: process.env.APP_BASE_ROUTE,
    middleware: 'auth',
    extendRoutes(routes, resolve) {
      routes[routes.findIndex((route) => route.name === 'index')].redirect =
        '/registry'
      routes.push({
        name: 'custom',
        path: '*',
        redirect: '/registry'
      })
    }
  },
  auth: {
    plugins: ['@/plugins/axios.js', '@/plugins/auth/auth.js'],
    strategies: authStrategies(),
    redirect: {
      logout: '/login'
    }
  }
}
