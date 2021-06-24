<template>
  <nuxt-link
    class="artist artist__wrap col-sm-6 col-md-6 col-lg-4 col-xl-3"
    :id="slug"
    :to="artistLink"
    :title="artist.title">
    <div class="artist__wrap--inner pb-3">
      <div class="artist__image_wrap">
        <l-image class="artist__image"
             :src="image"
             :alt="artist.title"/>
      </div>
      <h3 class="artist__info artist__title">{{artist.title}}</h3>
      <h4 class="artist__info artist__role">{{artist.role}}</h4>
      <span class="artist__info artist__from">({{artist.from}})</span>
    </div>
  </nuxt-link>
</template>
<script>
import LImage from '~/components/Image'

export default {
  components: { LImage },
  props: ['artist'],
  computed: {
    image() { return this.artist.avatar },
    slug() { return this.artist.slug || this.artist.title.toLowerCase().split(' ').join('-') },
    artistLink() {
      return `/artists/${this.slug}/?origin=`
        + encodeURIComponent(`${this.$route.fullPath.split('#')[0]}#${this.slug}`)
        + '#content' 
    }
  }
}
</script>
