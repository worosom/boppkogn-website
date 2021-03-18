<template>
  <b-container v-if="event" class="event" id="content">
    <b-row :id="event.slug">
      <client-only>
        <b-col
          v-if="livestreamActive"
          cols="12"
          class="pl-0 mb-4"
          style="position: relative; padding-bottom: 56.25%">
          <twitch-player
            width="100%"
            height="100%"
            style="position: absolute; width: 100%; height: 100%"
            :channel="event.livestream.twitch.channel"
            :volume="1"
            />
        </b-col>
        <b-col
          v-else-if="timeToStream && timeToStream < 0"
          ref="timeToStream"
          cols="12"
          class="pl-0 mb-4"
          style="background-color: yellow; position: relative; padding-bottom: 28%">
          <div class="livestream_counter ">
            <div>
              {{timeToStreamString}} 
            </div>
          </div>
        </b-col>
      </client-only>
      <b-col
        cols="12"
        md="7"
        lg="6"
        class="event__info">
        <h1>
          <span class="event__title">{{title}}</span>
          <span class="event__type">{{type}}</span>
          <span class="event__date">{{date}}</span>
        </h1>
      </b-col>
      <b-col
        cols="12"
        md="6"
        lg="3"
        class="event__info">
        <h2 v-if="subtitle">{{subtitle}}</h2>
        <div class="pb-2">
          <share-button verbose @click="$nuxt.$emit('share', {url, title, description: strippedDescription})" class="event__share-button"/>
        </div>
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
        md="2"
        lg="12"
        v-if="price">
        <h4 class="event__price">{{price}}</h4>
      </b-col>
      <b-col
        cols="8"
        md="2"
        offset-md="3"
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
        <div class="event__links_wrap" v-if='facebook'>
          <b-btn :href="facebook"
                 target="_blank"
                 variant="primary"
                 rel="noopener">
            Facebook
          </b-btn>
        </div>
        <div class="event__links_wrap" v-if='instagram'>
          <b-btn :href="instagram"
                 target="_blank"
                 variant="primary"
                 rel="noopener">
            Instagram
          </b-btn>
        </div>
        <div class="event__links_wrap" v-if='livestream'>
          <b-btn :href="typeof(livestream) == 'object' ? livestream.link : livestream"
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
             class="event__info event__info--pattern">
        <p class="event__description" v-html="description"/>
      </b-col>
    </b-row>

    <template v-if="media && media.length">
      <client-only>
        <b-row>
          <b-col>
            <h1 class="event__media_header" id="pics">Pics</h1>
          </b-col>
        </b-row>
        <b-row class="mb-5">
          <gallery v-model="media"/>
        </b-row>
      </client-only>
    </template>

    <template v-if="artists && artists.length">
      <b-row id="lineup">
        <b-col>
          <h1 class="event__lineup_header">Lineup</h1>
        </b-col>
      </b-row>

      <b-row>
        <artist v-for="(artist, key) in artists"
                :key="key"
                :artist="artist"/>
      </b-row>
    </template>
  </b-container>
</template>

<script>
import TwitchPlayer from '~/components/TwitchPlayer'
import { mod, datum } from '~/util'
import Artist from '~/components/Artist'
import Gallery from '~/components/Gallery'
import './style.scss'
import ShareButton from '~/components/Share/Button'

const dateFormat = (date) => {
  let day = String(date.getDate())
  day = day.length == 1 ? '0' + day : day
  let month = String(date.getMonth()+1)
  month = month.length == 1 ? '0' + month : month
  return `${day}.${month} ${date.getFullYear()}`
}

export default {
  components: { ShareButton, TwitchPlayer, Artist, Gallery },
  props: ['event'],
  data() {
    return {
      price: undefined,
      description: undefined,
      subtitle: undefined,
      facebook: undefined,
      instagram: undefined,
      residentadvisor: undefined,
      livestream: undefined,
      reservation: undefined,
      ...this.event,
      date: dateFormat(this.event.date),
      media: this.event.media,
      time: `${this.event.date.getHours()}h`,
      timeToStream: false,
      realTime: Date.now(),
      interval: undefined,
      livestreamActive: false
    }
  },
  computed: {
    url() { return process.env.BASE_URL + this.path.slice(3) + '/' },
    realStartTime() { return typeof this.livestream == 'object' && this.livestream.twitch && datum(this.livestream.startTime) },
    realEndTime() { return typeof this.livestream == 'object' && this.livestream.twitch && datum(this.livestream.endTime) },
    timeToStreamString() {
      const ms = Math.abs(this.timeToStream)
      let d, h, m, s;
      s = Math.floor(ms / 1000)
      m = Math.floor(s / 60)
      s = mod(s, 60)
      h = Math.floor(m / 60)
      m = mod(m, 60)
      d = Math.floor(h / 24)
      h = mod(h, 24)
      const str = (x) => {
        return String(x).length == 1 ? '0' + x : x
      }
      let ret = ''
      if (d > 0) {
        ret += `${str(d)} Day${d > 1 ? 's' : ''} `
      }
      ret += `${str(h)}:`
      ret += `${str(m)}`
      ret += `:${str(s)}`
      return ret
    },
    strippedDescription() {
      return this.description.replace(/<[^>]+>/g,'')
    }
  },
  methods: {
    updateTime() {
      this.realTime = Date.now()
      if (this.realTime - this.realEndTime <= 0) {
        this.timeToStream = this.realTime - this.realStartTime
        this.livestreamActive = this.timeToStream > 0 && this.timeToStream < (this.realEndTime - this.realStartTime)
      } else {
        this.interval = clearInterval(this.interval)
        this.livestreamActive = false
        this.timeToStream = false
      }
    }
  },
  mounted() {
    this.realTime = Date.now()
    this.updateTime()
    this.interval = setInterval(
      _ => this.updateTime(),
      1000
    )
  }
}
</script>
