import path from 'path'
import { datum } from './util.js'

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
    '@nuxt/content',
    'bootstrap-vue/nuxt',
    ['@nuxtjs/svg', { svgo: true }],
    'vue-plausible'
  ],
  content: {
    liveEdit: false
  },
  bootstrapVue: {
    componentPlugins: [
      'LayoutPlugin',
      'ModalPlugin',
      'ButtonPlugin'
    ]
  },
  plausible: {
    domain: 'bopp-kogn.africa',
    hashMode: true,
    apiHost: 'https://stats.ai-interaction.design'
  },
  generate: {
    async routes () {
      const { $content } = require('@nuxt/content')
      const files = await $content('en/events', { deep: true }).fetch()
      const about = await $content('en/about/about').fetch()
      return files.map(file => ({
        route: file.path.slice(3) + '/',
        payload: {
          event: {
            ...file,
            date: datum(file.date)
          },
          about: {
            abstract: about.abstract.map(ob => ob.part),
            translations: about.translations.map(ob => ob.translation),
            donations: about.donations
          }
        }
      }))
    }
  },
  /*
   ** Build configuration
   */
  build: {
    // analyze: true,
    // extractCSS: true,
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.devtool = 'source-map'
      }
    }
  }
}
