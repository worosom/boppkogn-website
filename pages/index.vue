<template>
  <b-container fluid>
    <event v-if="upcoming"
           v-for="(u, id) in upcoming"
           :key="id"
           id="upcoming"
           :event="u"/>
    <previously v-if="previous.length" id="previously" :previous="previous" />
    <about/>
    <partners/>
  </b-container>
</template>


<script>
import { mapGetters } from 'vuex'
import Event from '~/components/Event'
import Previously from '~/components/Previously'
import About from '~/components/About'
import Partners from '~/components/Partners'

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
  computed: {
    ...mapGetters(['upcoming', 'previous'])
  }
}
</script>
