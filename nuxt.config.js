import path from 'path'

process.env.TZ = 'Europe/Berlin'
const datum = (date) => new Date(Date.parse(date.slice(0, -2) + ' ' + date.slice(-2)))

export default {
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preload', type: 'text/css', as: 'style', href: '/webfonts/sporting_grotesque/font.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/webfonts/sporting_grotesque/font.css' }
    ]
  },
  router: { trailingSlash: true },
  generate: {
    routes: () => {
      const fs = require('fs')
      const {join} = require('path')
      const events_path = './assets/content/events'

      const routes = [
        {
          route: '/'
        },
        ...fs.readdirSync(events_path)
        .filter(filename => filename.endsWith('md'))
        .map(filename => {
          const event = require(`./${join(events_path, filename)}`)
          event.date = datum(event.date)
          return {
            route: `/${event.slug}`
          }
        })
      ]
      return routes
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#00f' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/scss/main.scss',
    'vue-ionicons/ionicons.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/vue-hammer.js', ssr: false },
    { src: '~/plugins/visibility.js', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/markdownit',
    'bootstrap-vue/nuxt',
    ['@nuxtjs/svg', { svgo: true }],
    'vue-plausible'
  ],
  plausible: {
    domain: 'bopp-kogn.africa',
    hashMode: true,
    apiHost: 'https://stats.ai-interaction.design'
  },
  markdownit: {
    injected: true
  },
  /*
   ** Build configuration
   */
  build: {
    // analyze: true,
    /*
     ** You can extend webpack config here
     */
    extend (config, _ctx) {
      config.node = {
        fs: "empty"
      };
      config.module.rules.push(
        {
          test: /\.yml$/,
          include: [path.resolve(__dirname, './assets/content')],
          loader: 'yml-loader'
        }
      )
    }
  }
}
