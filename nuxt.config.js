import path from 'path'
import { datum, imageURI } from './util.js'

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
      const about = await $content('en/about/about').fetch()
      const files = await $content('en/events', { deep: true }).fetch()
      const gallery = []
      const events = await Promise.all(files.map(async event => {
        const route = event.path.split('/')[3]
        event.media && event.media.forEach((m, i) => {
          const _route = imageURI(route, i, m.image)
          gallery.push({
            route: _route,
            payload: {
              media: event.media
            }
          })
        }) 
        return {
          route: `/events/${route}/`,
          payload: {
            event: {
              ...event,
              date: datum(event.date),
              artists: await Promise.all(event.artists.map(async artist => artist.relation ? (await $content(`artists/${artist.relation}`).fetch()) : artist))
            },
            about: {
              abstract: about.abstract.map(ob => ob.part),
              translations: about.translations.map(ob => ob.translation),
              donations: about.donations
            }
          }
        }
      }))
      return [...events, ...gallery]
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
