<template>
  <b-container v-if="event" class="event" id="content">
    <b-row>
      <b-col
        cols="12"
        md="6"
        class="event__info">
        <h1>
          <span class="event__title">{{title}}</span>
          <span class="event__type">{{type}}</span>
          <span class="event__date">{{date.format('DD.MM.YYYY')}}</span>
        </h1>
      </b-col>
      <b-col
        cols="12"
        md="6"
        lg="3"
        class="event__info">
        <h2>{{subtitle}}</h2>
      </b-col>
      <b-col
        cols="5"
        lg="3"
        class="event__info">
        <h2 class="event__venue">
          <span class="event__time">{{time}}</span>
          at <a :href="venue.venueLink" :alt="venue.name" rel="noopener">{{venue.name}}</a>
        </h2>
      </b-col>
      <b-col
        class="event__info"
        v-if="price">
        <h4 class="event__price">{{price}}</h4>
      </b-col>
      <b-col
        cols="8"
        md="2"
        order-lg="2"
        offset-lg="1"
        class="event__address_links_wrap event__info">
        <h2>{{address}}</h2>
        <div class="event__links_wrap" v-if='reservation'>
          <b-btn :href="reservation"
                 target="_blank"
                 variant="primary"
                 rel="noopener">
            Reservation
          </b-btn>
        </div>
        <div class="event__links_wrap" v-if='residentadvisor'>
          <b-btn :href="residentadvisor"
                 target="_blank"
                 variant="primary"
                 rel="noopener">
            Residentadvisor
          </b-btn>
        </div>
        <div class="event__links_wrap">
          <b-btn :href="facebook"
                 target="_blank"
                 variant="primary"
                 rel="noopener">
            Facebook
          </b-btn>
        </div>
        <div class="event__links_wrap">
          <b-btn :href="instagram"
                 target="_blank"
                 variant="primary"
                 rel="noopener">
            Instagram
          </b-btn>
        </div>
        <div class="event__links_wrap" v-if='livestream'>
          <b-btn :href="livestream"
                 target="_blank"
                 variant="primary"
                 rel="noopener">
            Live Stream
          </b-btn>
        </div>
      </b-col>
      <b-col sm="11"
             offset-sm="1"
             md="10"
             lg="7"
             offset-lg="0"
             xl="7"
             order-md="1"
             v-if="description"
             class="event__info event__info--pattern">
        <p class="event__description" v-html="description"/>
      </b-col>
    </b-row>

    <template v-if="media.length">
      <no-ssr>
        <b-row>
          <b-col>
            <h1 class="event__media_header">Pics</h1>
          </b-col>
        </b-row>
        <b-row>
          <gallery v-model="media"/>
        </b-row>
      </no-ssr>
    </template>

    <template v-if="artists.length">
      <b-row>
        <b-col>
          <h1 class="event__lineup_header">Lineup</h1>
        </b-col>
      </b-row>

      <b-row>
        <artist v-for="(artist, key) in artists"
                :key="key"
                :artist="artist.artist"/>
      </b-row>
    </template>
  </b-container>
</template>

<script>
import Artist from '~/components/Artist'
import Gallery from '~/components/Gallery'
import './style.scss'

export default {
  components: { Artist, Gallery },
  props: ['event'],
  data() {
    return {
      price: undefined,
      description: undefined,
      residentadvisor: undefined,
      livestream: undefined,
      ...this.event,
      date: this.$moment(this.event.date)
    }
  },
  computed: {
    time() { 
      return `${this.date.format('HH')}h` }
  }
}
</script>
