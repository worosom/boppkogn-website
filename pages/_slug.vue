<template>
  <b-container fluid>
    <event v-if="event" :event="event"/>
  </b-container>
</template>
<script>
import Event from '~/components/Event'
import Partners from '~/components/Partners'
export default {
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
    Partners
  },
  async asyncData({store, route}) {
    return {
      event: store.state.events.filter(e => e.slug == route.params.slug)[0]
    }
  },
  layout: 'default'
}
</script>
