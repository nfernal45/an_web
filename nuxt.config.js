module.exports = {
  plugins: [{ src: "~/plugins/datepicker", ssr: false }],
  modules: ["@nuxtjs/svg-sprite", "@nuxtjs/router"],
  css: [
    "@/assets/scss/icons.scss",
    "@/assets/scss/reset.scss",
    "@/assets/scss/common.scss"
  ],
  /*
   ** Headers of the page
   */
  head: {
    title: 'Подсистема "Реестр сведений о лицензиатах" ЕИС МЖИ',
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Gos Funciya" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
