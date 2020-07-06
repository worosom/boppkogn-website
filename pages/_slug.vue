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
      title: `🎤${this.event.title} ${this.event.venue.name} ${this.$moment(this.event.date).format('YYYY')}`,
      meta: [
	{ hid: 'description', name: 'description', content: this.event.meta_description }
      ] 
    }
  },
  components: {
    Event,
    Partners
  },
  computed: {
    event() { return this.$store.state.events.filter(e => e.slug == this.$route.params.slug)[0] }
  },
  layout: 'default'
}
</script>
