<style scoped lang="scss">
.artist {
  &_meta {
    h1 {
      background: yellow;
      color: blue;
    }
    h2 {
      color: yellow;
    }
    h3 {
      color: #0FF;
    }
    h1, h2, h3 {
      padding: .7rem .7rem 0 .7rem;
      display: inline-block;
    }
  }
  &_bio {
    color: yellow;
    background: blue;
    padding: 1rem;
    font-family: "Sporting Grotesque_Regular";
    hyphens: auto;
  } 
  a {
    display: inline-block;
    font-family: "Sporting Grotesque_Bold";
    background: yellow;
    color: red;
    text-decoration: underline;
    margin-top: .5rem;
    padding: 1rem;
    transition: transform 150ms ease-out, background 150ms ease-out;
    transform: rotate(-2deg);
    &:hover,
    &:active,
    &:focus {
      background: blue;
      color: #FF0;
      transform: rotate(0deg) !important;
      .artist_event_type {
        color: #0FF;
      }
    }
  }
  .badge {
    font-family: "Sporting Grotesque_Bold";
    background: #0FF;
    color: #F00;
    padding: 1rem;
    margin-top: 1rem;
    text-transform: uppercase;
    border-radius: 0;
    transition: transform 150ms ease-out;
    transform: rotate(3deg);
    &--1 {
      transform: rotate(-1deg);
    }
    &:hover {
      transform: rotate(0deg);
    }
  }
  &_events {
    h1 {
      color: yellow;
    }
    a {
      display: flex;
      align-items: center;
      img {
        aspect-ratio: 1;
        object-fit: cover;
        margin-right: 1rem;
      }
    }
  }
  &_event_type {
    color: #00F;
  }
}
</style>
<template>
  <b-container fluid>
    <b-container class="event artist" id="content">
      <b-row class="mb-5">
        <b-col class="artist_meta">
          <h1>
            {{title}}
          </h1>
          <h2>
            {{role}}
          </h2>
          <h3>
            ({{from}})
          </h3>
          <section class="artist_bio" v-if="bio" v-html="bio"/>
          <section>
            <a :href="link" target="_blank">{{link}}</a>
          </section>
          <section class="badge" v-if="tags && tags.indexOf('team') >= 0">
            Boppkogn Team
          </section>
          <section class="badge badge--1" v-if="tags && tags.indexOf('resident') >= 0">
            Resident
          </section>
        </b-col>
        <b-col md="5" lg="6">
          <l-image :src="avatar" :smartcrop="false" width="100%"/>
        </b-col>
      </b-row>
      <b-row class="artist_events mb-5">
        <b-col
          cols="6"
          sm="6"
          md="4"
          v-if="events.length"
          v-for="event in events"  :key="event.slug">
          <nuxt-link
            :id="event.slug"
            :style="`transform: rotate(${Math.random()*6-3}deg)`"
            :key="event.slug"
            :to="`/events/${event.slug}/?origin=${encodeURIComponent($route.path+'#'+event.slug)}#${slug}`">
            <l-image :src="event.image" smartcrop style="height: 3rem"/>
            <div>
              <span class="artist_event_title">
                {{event.title}}
              </span>
              <span class="artist_event_type">
                {{event.type}}
              </span>
            </div>
          </nuxt-link>
        </b-col>
      </b-row>
      <template v-if="media && media.length">
        <client-only>
          <b-row class="artist_media">
            <b-col>
              <h1 class="event__media_header" id="pics">Pics</h1>
            </b-col>
          </b-row>
          <b-row>
            <gallery :value="media"/>
          </b-row>
        </client-only>
      </template>
    </b-container>
  </b-container>
</template>
<script>
import Gallery from '~/components/Gallery'
import LImage from '~/components/Image'
import { imageURI, artistData } from '~/util'

export const asyncData = artistData

export default {
  layout: 'default',
  components: {Gallery, LImage},
  head() {
    const title = `${this.title} - Bopp Kogn HipHop Festival`,
      description = this.bio ? this.bio.replace(/<[^>]+>/g,'') : `${this.title} at Bopp Kogn`
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: title,
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
      bio: undefined
    }
  },
  asyncData: artistData
}
</script>
