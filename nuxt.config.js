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
  router: { base: '/management/' },
  auth: {
    plugins: ['@/plugins/auth.js'],
    strategies: {
      code: {
        authorization_endpoint: 'http://rlic-dev.c-i-p.ru/as/oauth/authorize',
        // userinfo_endpoint: 'http://rlic-dev.c-i-p.ru/as/user',
        // scope: ['read', 'write'],
        access_type: 'offline',
        access_token_endpoint: 'http://rlic-dev.c-i-p.ru/as/login',
        response_type: 'code',
        token_type: 'Bearer',
        redirect_uri: 'http://rlic-dev.c-i-p.ru/management/login',
        client_id: 'client1',
        token_key: 'access_token'
        // state: 'UNIQUE_AND_NON_GUESSABLE'
      }
    },
    watchLoggedIn: false,
    redirect: false
    // login: 'http://rlic-dev.c-i-p.ru/as/login',
    // logout: 'http://rlic-dev.c-i-p.ru/as/logout',
    // callback: 'http://rlic-dev.c-i-p.ru/login',
    // home: 'http://rlic-dev.c-i-p.ru/management/registry'
    // }
  }
}
