<template>
  <b-container class="mb-4" fluid>
    <event v-if="event" :event="event"/>
  </b-container>
</template>
<script>
import Event from '~/components/Event'
import About from '~/components/About'
import Partners from '~/components/Partners'
import { imageURI, datum, ast2str } from '~/util'

export const resolveArtists = async (event, $content) => {
  return await Promise.all(event.artists.map(async ({artist}) => artist.relation ? $content(`en/artists/${artist.relation}`).fetch() : artist))
}

export default {
  layout: 'default',
  head() {
    const title = `🎤${this.event.title} ${this.event.type} ${this.event.subtitle} ${this.event.venue.name} ${this.event.date.getFullYear()}`,
      description = this.event.meta_description || ast2str(this.event.body)
    return {
      title,
      meta: [
        {
          rel: 'canonical',
          href: process.env.BASE_URL + this.$route.path
        },
        { hid: 'description', name: 'description', content: description },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: process.env.BASE_URL + this.$route.path
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: process.env.BASE_URL + this.event.image + '?nf_resize=smartcrop&w=2400&h=1260'
        },
        {
          hid: 'og:image:type',
          property: 'og:image:type',
          content: 'image/jpeg'
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: `${this.event.title} ${this.event.type}`
        },
      ],
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
      media: event.media && event.media.map((m, i) => ({...m, uri: imageURI(route, i, m)})),
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
