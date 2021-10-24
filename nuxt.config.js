import path from 'path'
import { datum, imageURI, artistData } from './util.js'

export default {
  target: 'static',
  /*
   ** Headers of the page
   */
  env:  {
    BASE_URL: process.env.BASE_URL
  },
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
      { rel: 'stylesheet', type: 'text/css', href: '/webfonts/sporting_grotesque/font.css' }
    ],
    htmlAttrs: {
      lang: 'en'
    }
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
    { src: '~/plugins/visibility.js', ssr: false },
    { src: '~/plugins/load-script.js', ssr: false }
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
    'vue-plausible',
    'vue-social-sharing/nuxt'
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
    hashMode: false,
    apiHost: 'https://stats.ai-interaction.design'
  },
  generate: {
    async routes () {
      const { $content } = require('@nuxt/content')
      const about = await $content('en/about/about').fetch()
      const files = await $content('en/events', { deep: true }).fetch()
      const gallery = []
      const events = await Promise.all(files.map(async event => {
        let route = event.path.split('/')[3]
        route = {
          params: {
            slug: route
          }
        }
        event.media && await Promise.all(event.media.map(async (m, i) => {
          const artists = m.image.artists && await Promise.all(
            m.image.artists.map(async artist => {
              return {...await $content(`en/artists/${artist.relation}`).fetch(), relation: artist.relation}
            })
          )
          const _route = imageURI(route, i, {image: {...m.image, artists}}, false, 'config')
          gallery.push({
            route: _route,
            payload: {
              media: event.media,
              event,
              artists,
              image: m
            }
          })
        }))
        const artists = await Promise.all(event.artists.map(async ({artist}) => artist.relation ? $content(`en/artists/${artist.relation}`).fetch() : artist))
        return {
          route: `/events/${route.params.slug}/`,
          payload: {
            event: {
              ...event,
              media: event.media && event.media.map((m, i) => ({...m, uri: imageURI(route, i, m)})),
              date: datum(event.date),
              artists
            },
            about: {
              abstract: about.abstract.map(ob => ob.part),
              translations: about.translations.map(ob => ob.translation),
              donations: about.donations
            }
          }
        }
      }))
      const artists = await Promise.all((await $content('en/artists').fetch()).map(async artist => {
        const route = {
          params: {
            artist: artist.slug
          }
        }
        const data = await artistData({route, $content})
        if (data.media) {
          data.media.forEach((m, i) => {
            const _route = imageURI(route, i, {...m.image, artists: m.image.artists})
            gallery.push({
              route: _route,
              payload: {
                ...m,
                media: data.media,
                artist: data,
                artists: m.image.artists,
                image: m.image
              }
            })
          })
        }
        return {...data, slug: artist.slug}
      }))
      return [...events, ...gallery, ...artists]
    }
  },
  /*
   ** Build configuration
   */
  build: {
    // analyze: true,
    // extractCSS: true,
    followSymlinks: true,
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.devtool = 'source-map'
      }
      config.node = {
        fs: 'empty',
        dns: 'empty',
        net: 'empty'
      };
    }
  }
}
