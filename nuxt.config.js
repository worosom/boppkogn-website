import path from 'path'
import moment from 'moment'

process.env.TZ = 'Europe/Berlin'

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
    ],
    script: [
      { async: true, defer: true, 'data-domain': 'bopp-kogn.africa', src: '/plausible.js' }
    ]
  },
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
          event.date = moment(event.date, 'YYYY-MM-DD hh:mma').utc()
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
    ['@nuxtjs/moment', { locales: ['de'] }]
  ],
  markdownit: {
    injected: true
  },
  /*
   ** Build configuration
   */
  build: {
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
          loader: 'yml-loader'
        }
      )
    }
  }
}
