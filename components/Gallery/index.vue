<style scoped lang="scss">
@import '~/assets/scss/gallery.scss';
</style>
<template>
  <div class="media">
    <b-container class="mb-3">
      <b-row>
        <b-col v-for="(item, i) in value"
               v-if="i < num_thumbnails"
               cols="6"
               sm="6"
               md="4"
               class="mb-3 mt-3"
               :key="i">
          <thumbnail :href="item.uri"
                     :title="`Gallery image ${item.image.title ? item.image.title : ''}`"
                     :value="item.image"/>
        </b-col>
      </b-row>
      <b-row v-if="num_thumbnails < num && is_mounted">
        <b-col class="media__links_wrap mt-3 mb-3" cols="12">
          <b-btn @click="showMore()" class="container-fluid">
            <i class="icon ion-md-arrow-round-down"></i>
            Show More
          </b-btn>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Thumbnail from './Thumbnail'
import LImage from '~/components/Image'

export default {
  props: ['value'],
  components: { LImage, Thumbnail },
  data() {
    return {
      is_mounted: false,
      num_thumbnails: 6
    }
  },
  methods: {
    showMore() {
      this.num_thumbnails += Math.min(30, this.num - this.num_thumbnails)
    },
  },
  mounted() {
    this.is_mounted = true
  },
  computed: {
    num() { return this.value.length },
  }
}
</script>
