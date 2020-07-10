<template>
  <b-col class="artist artist__wrap"
         nuxt link :to="artist.link"
         xs="12"
         sm="6"
         md="6"
         lg="4"
         xl="3">
    <a :href="artist.link"
       :title="artist.title"
       target="_blank"
       rel="noopener">
      <div class="artist__wrap--inner">
        <div class="artist__image_wrap">
          <l-image class="artist__image"
               :src="image"
               :alt="artist.title"/>
        </div>
        <h3 class="artist__info artist__title">{{artist.title}}</h3>
        <h4 class="artist__info artist__role">{{artist.role}}</h4>
        <span class="artist__info artist__from">({{artist.from}})</span>
      </div>
    </a>
  </b-col>
</template>
<script>
import LImage from '~/components/Image'

export default {
  components: { LImage },
  props: ['artist'],
  computed: {
    image() { return this.artist.avatar }
  }
}
</script>
