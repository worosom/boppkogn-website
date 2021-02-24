<template>
  <b-container fluid>
    <event v-if="event" :event="event"/>
    <about :about="about"/>
    <partners/>
  </b-container>
</template>
<script>
import Event from '~/components/Event'
import About from '~/components/About'
import Partners from '~/components/Partners'
import { imageURI, datum } from '~/util.js'

export const resolveArtists = async (event, $content) => {
  return await Promise.all(event.artists.map(async ({artist}) => artist.relation ? $content(`en/artists/${artist.relation}`).fetch() : artist))
}

export default {
  layout: 'default',
  head() {
    return {
      title: `🎤${this.event.title} ${this.event.venue.name} ${this.event.date.getFullYear()}`,
      meta: [
	{ hid: 'description', name: 'description', content: this.event.meta_description }
      ] 
    }
  },
  components: {
    Event,
    About,
    Partners
  },
  async asyncData({$content, route, payload}) {
    if (payload) return payload;
    let event = await $content(`en/events/${route.params.slug}`).fetch()
    const artists = await resolveArtists(event, $content)
    event = {
      ...event,
      date: datum(event.date),
      media: event.media.map((m, i) => ({...m, uri: imageURI(route, i, m)})),
      artists,
    }
    const about = await $content('en/about/about').fetch()
    return {
      event,
      about: {
        abstract: about.abstract.map(ob => ob.part),
        translations: about.translations.map(ob => ob.translation),
        donations: about.donations
      }
    }
  }
}
</script>
