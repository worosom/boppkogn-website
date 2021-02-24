<template>
  <b-container id="events" class="pt-1" fluid>
    <event v-if="upcoming"
           v-for="(u, id) in upcoming"
           :key="id"
           id="upcoming"
           :event="u"/>
    <previously v-if="previous.length" id="previously" :previous="previous" />
    <about :about="about"/>
    <partners/>
  </b-container>
</template>


<script>
import Event from '~/components/Event'
import Previously from '~/components/Previously'
import About from '~/components/About'
import Partners from '~/components/Partners'
import { datum } from '~/util.js'
import { resolveArtists }  from '~/pages/events/_slug/index.vue'

export default {
  head() {
    return {
      title: '🎤Hip Hop Festival Bopp Kogn',
      meta: [
        { hid: 'description', name: 'description', content: 'Bopp Kogn brings people together. Originating from a unique connection between African and European Hip-Hop scenes, this is the first project designed to connect Hip-Hop cultures on a global scale.' }
      ]
    }
  },
  scrollToTop: false,
  layout: 'index',
  components: {
    Event,
    Previously,
    About,
    Partners,
  },
  async asyncData({$content, store, payload}) {
    let events = await $content('en/events').fetch()
    events = events.map(event => ({...event, date: datum(event.date)}))
    const about = await $content('en/about/about').fetch()
    let upcoming = events.filter(ev => {
        return new Date() - ev.date <= 0
      }).sort((a, b) => - (a.date - b.date))
    upcoming = await Promise.all(upcoming.map(async event => ({...event, artists: await resolveArtists(event, $content)})))
    return {
      upcoming,
      previous: events.filter(ev => {
        return new Date() - ev.date > 0
      }).sort((a, b) => - (a.date - b.date)),
      about: {
        abstract: about.abstract.map(ob => ob.part),
        translations: about.translations.map(ob => ob.translation),
        donations: about.donations
      }
    }
  }
}
</script>
