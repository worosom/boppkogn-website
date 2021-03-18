<template>
  <b-container id="events" class="pt-1" fluid>
    <event v-if="upcoming"
           v-for="(u, id) in upcoming"
           :key="id"
           id="upcoming"
           :event="u"/>
    <previously v-if="previous.length" id="previously" :previous="previous" />
    <about :about="about"/>
    <team :team="team"/>
    <partners/>
  </b-container>
</template>


<script>
import Event from '~/components/Event'
import Previously from '~/components/Previously'
import About from '~/components/About'
import Team from '~/components/Team'
import Partners from '~/components/Partners'
import { imageURI, datum } from '~/util.js'
import { resolveArtists }  from '~/pages/events/_slug/index.vue'

export default {
  head() {
    const title = '🎤Hip Hop Festival Bopp Kogn',
      description = 'Bopp Kogn brings people together. Originating from a unique connection between African and European Hip-Hop scenes, this is the first project designed to connect Hip-Hop cultures on a global scale.'
    return {
      title,
      meta: [
        { charset: 'utf-8' },
        { hid: 'description', name: 'description', content: description },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: process.env.BASE_URL
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: process.env.BASE_URL + '/boppkogn_header.jpg'
        },
        {
          hid: 'og:image:type',
          property: 'og:image:type',
          content: 'image/jpeg'
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: title
        },
      ]
    }
  },
  scrollToTop: false,
  layout: 'index',
  components: {
    Event,
    Previously,
    About,
    Team,
    Partners,
  },
  async asyncData({route, $content, store, payload}) {
    const team = (await $content('en/artists').sortBy('title').fetch()).filter(artist => artist.tags && artist.tags.indexOf('team') >= 0)
    let events = await $content('en/events').fetch()
    events = events.map(event => ({...event, date: datum(event.date)}))
    const about = await $content('en/about/about').fetch()
    let upcoming = events.filter(ev => {
        return new Date() - ev.date <= 0
      }).sort((a, b) => - (a.date - b.date))
    upcoming = await Promise.all(upcoming.map(async event => ({
      ...event, 
      media: event.media.map((m, i) => ({...m, uri: imageURI({...route, params: {slug: event.slug}}, i, m)})),
      artists: await resolveArtists(event, $content)
    })))
    return {
      upcoming,
      previous: events.filter(ev => {
        return new Date() - ev.date > 0
      }).sort((a, b) => - (a.date - b.date)),
      about: {
        abstract: about.abstract.map(ob => ob.part),
        translations: about.translations.map(ob => ob.translation),
        donations: about.donations
      },
      team
    }
  }
}
</script>
