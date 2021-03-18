<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

h1 {
  color: $cyan;
}

.container {
  position: relative;
}

.event_preview {
  &__link {
    text-decoration: none;
    display: block;
    position: relative;
    z-index: 0;
    font-family: "Sporting Grotesque_Regular";
    &:hover {
      .event_preview__image {
        transform: scale(1.2);
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
             :id="p.slug"
             v-for="(p, index) in previous"
             v-bind:key="index">
        <nuxt-link
          :to="'/events/'+p.slug+`/?origin=${encodeURIComponent($route.path+'#'+p.slug)}`+'#content'"
          class="event_preview__link mb-4"
          >
          <div class="event_preview__image_wrap">
            <l-image
              class="event_preview__image"
              :src="p.image"
              :alt="p.title"/>
          </div>
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
    dates() { return this.previous.map(({date}) => date) },
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
