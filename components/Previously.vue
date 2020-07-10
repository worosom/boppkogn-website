<style scoped lang="scss">
h1 {
  color: #ff0;
}

.container {
  position: relative;
  &::after {
    content: " ";
    position: absolute;
    top: 0;
    left: -5px;
    width: 3px;
    height: 100%;
    background-color: #ff0;
  }
}

.event_previews {
  position: relative;
}

.event_preview {
  &__link {
    text-decoration: none;
    display: block;
    position: relative;
    z-index: 0;
    padding-bottom: 5px;
    font-family: "Sporting Grotesque_Regular";
    &::before {
      content: " ";
      position: absolute;
      width: 3px;
      height: 100%;
      background: #ff0;
      z-index: -1;
      transition: width 150ms ease-in-out;
    }
    &:hover {
      &__type *,
      &__location *{
        color: #00f !important;
      }
      .event_preview__image {
        transform: scale(1.2);
      }
      &:before {
        width: calc(100%);
      }
    }
  }

  &__image {
    position: absolute;
    object-fit: cover;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: transparent;
    transition: transform 200ms ease-in-out;
    will-change: transform;
    &_wrap {
      position: relative;
      width: 100%;
      overflow: hidden;
      &::before {
        content: " ";
        display: block;
        width: 100%;
        height: 100%;
        padding-bottom: 100%;
        background-color: yellow;
      }
    }
  }
  &__info {
    color: #00f;
    padding: 0 0 0 15px;
    transition: color 200ms ease-in-out;
  }
  &__title, &__year {
    :hover > & {
      color: #F00;
    }
  }
  &__type {
    color: #ff0;
    margin-bottom: 2rem;
    :hover > & {
      color: #00F;
    }
  }
  &__location {
    color: #0ff;
    font-weight: bold;
    text-decoration: underline;
    :hover > & {
      color: #F00;
    }
  }
  &__year {
  }
}

</style>
<template>
  <b-container>
    <b-row class="mt-5">
      <b-col>
        <h1>Previous Events</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="event_preview"
             xs="12"
             sm="6"
             md="6"
             lg="4"
             xl="3"
             v-for="(p, index) in previous"
             v-bind:key="index">
        <nuxt-link
          :to="'/'+p.slug+'#content'"
          class="event_preview__link mb-4"
          >
          <div class="event_preview__image_wrap">
            <l-image
              class="event_preview__image"
              :src="p.image"
              :alt="p.title"/>
          </div>
          <h3 class="event_preview__info event_preview__title mt-3">{{p.title}}</h3>
          <h4 class="event_preview__info event_preview__type">{{p.type}}</h4>
          <span class="event_preview__info event_preview__location">{{p.venue.name}}</span>
          <span class="event_preview__info event_preview__year">({{dates[index].year()}})</span>
        </nuxt-link>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import LImage from './Image'

export default {
  components: {LImage},
  props: ['previous'],
  computed: {
    dates() { return this.previous.map(({date}) => this.$moment(date)) },
    images() {
      return this.previous.map(({image}) => {
        try {
          return {
            imageSrc: image
          }
        } catch {
          return {
            placeholderSrc: 'bopp-kogn-break-wide.svg',
            imageSrc: 'bopp-kogn-break-wide.svg',
            imageSrcSet: 'bopp-kogn-break-wide.svg 1x'
          }
        }
      })
    },
    placeholderSrc() { return this.images.map(i => i.placeholder) },
    imageSrc() { return this.images.map(i => i.src) },
    imageSrcSet() { return this.images.map(i => i.srcSet) }
  }
}
</script>
