<style lang="scss">
@import '@/assets/scss/artist.scss'
</style>
<template>
  <b-container fluid class="px-0">
    <b-container class="event artist-page" id="content">
      <b-row class="mb-5" :id="title">
        <b-col cols="12" class="artist-page_head">
          <h1>
            {{title}}
          </h1>
          <h2>
            {{role}}
          </h2>
          <h3>
            ({{from}})
          </h3>
        </b-col>
        <b-col order-md="2" class="artist-page_avatar" md="6">
          <l-image :src="avatar" :smartcrop="false" width="100%"/>
        </b-col>
        <b-col order-md="1" class="artist-page_body" md="6">
          <share-button verbose @click="$nuxt.$emit('share', {url, title: ogtitle, description})" style="float: right;" class="event__share-button"/>
          <section class="artist-page_bio" v-if="bio" v-html="bio"/>
        </b-col>
        <b-col order-md="3" class="artist-page_footer">
          <section v-if="link">
            <a :href="link" target="_blank">{{link}}</a>
          </section>
          <section v-if="links">
            <meta-link v-for="link in links" :key="link.href" :value="link"/>
          </section>
          <section class="mt-4 badge" v-if="tags && tags.indexOf('team') >= 0">
            Boppkogn Team
          </section>
          <section class="badge badge--1" v-if="tags && tags.indexOf('resident') >= 0">
            Resident
          </section>
        </b-col>
      </b-row>
      <b-row v-if="events.length" class="artist-page_events mb-5">
        <b-col
          cols="6"
          sm="6"
          md="4"
          v-for="event in events"  :key="event.slug">
          <nuxt-link
            :id="event.slug"
            :style="`transform: rotate(${Math.random()*6-3}deg)`"
            :key="event.slug"
            :to="`/events/${event.slug}/?origin=${encodeURIComponent($route.fullPath+'#'+event.slug)}#${slug}`">
            <l-image :src="event.image" smartcrop style="height: 3rem"/>
            <div>
              <span class="artist-page_event_title">
                {{event.title}}
              </span>
              <span class="artist-page_event_type">
                {{event.type}}
              </span>
            </div>
          </nuxt-link>
        </b-col>
      </b-row>
      <div id="pics">
        <template v-if="media && media.length">
          <client-only>
            <b-row class="artist-page_media">
              <b-col>
                <h1 class="event__media_header">Pics</h1>
              </b-col>
            </b-row>
            <b-row class="mb-5">
              <gallery :value="media"/>
            </b-row>
          </client-only>
        </template>
      </div>
    </b-container>
  </b-container>
</template>
<script>
import Gallery from '~/components/Gallery'
import MetaLink from '~/components/Link'
import LImage from '~/components/Image'
import ShareButton from '~/components/Share/Button'
import { artistData } from '~/util'

export const asyncData = artistData

export default {
  layout: 'default',
  components: {ShareButton, Gallery, MetaLink, LImage},
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.ogtitle,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.url
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: process.env.BASE_URL + this.avatar + '?nf_resize=smartcrop&w=2400&h=1260'
        },
        {
          hid: 'og:image:type',
          property: 'og:image:type',
          content: 'image/jpeg'
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.title
        },
      ],
    }
  },
  data() {
    return {
      tags: undefined,
      bio: undefined,
      link: undefined,
      links: undefined
    }
  },
  asyncData: artistData,
  computed: {
    description() {
      return this.bio ? this.bio.replace(/<[^>]+>/g,'') : `${this.title} at Bopp Kogn`
    },
    ogtitle() { return `${this.title} - Bopp Kogn HipHop Festival` },
    url() { return process.env.BASE_URL + this.$route.path }
  }
}
</script>
