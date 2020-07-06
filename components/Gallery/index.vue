<style lang="scss">
@import './style.scss';
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
               @click.stop="show(i)"
               :key="i">
          <thumbnail :value="item.image"/>
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
    <div style="position: absolute;"
         class="gallery_modal">
      <b-modal ref="modal" v-model="modal"
                           id="gallery_modal"
        fullscreen lazy centered hide-footer>
        <template slot="modal-header">
          <b-btn title="Close Gallery" @click="hide()" :class="modal_header.show ? '' : 'hidden'">
              <i class="icon ion-md-arrow-round-up"></i>
              Back to Bopp-Kogn
          </b-btn>
        </template>
        <div class="modal__media" v-if="modal">
          <div :class="modal__image_class(_i)"
               v-for="(item, _i) in value"
               :key="_i"
               v-if="visible(_i)">
               <l-image
                 class='modal__image-large'
                 :smartcrop="false"
                 :fullscreen="true"
                 height="100%"
                 :src="item.image.src"
                 :alt="item.image.title"/>
          </div>
        </div>
        <div class="modal__controls"
             v-hammer:swipe="swipeHandler"
             v-hammer:press="showHeader"
             v-hammer:tap="(ev) => { ev.tapCount >= 2 ? showHeader() : '' }">
          <b-btn title="Previous" class="modal__controls--prev" @click="prev">
            <i class="icon ion-md-arrow-round-back"></i>
          </b-btn> <b-btn title="Next" class="modal__controls--next" @click="next">
            <i class="icon ion-md-arrow-round-forward"></i>
          </b-btn>
        </div>
      </b-modal>
    </div>
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
      modal_header: {
        show: false,
        timeout: null
      },
      num_thumbnails: 6
    }
  },
  methods: {
    show(_i) {
      this.$router.push(`#${_i}_${this.value[_i].image.title || ''}_gallery`)
      document.onkeydown = (ev) => {
        (ev.key == 'Escape') && this.hide();
        (ev.key == 'ArrowLeft') && this.prev();
        (ev.key == 'ArrowRight') && this.next();
      }
    },
    showMore() {
      this.num_thumbnails += Math.min(30, this.num - this.num_thumbnails)
    },
    hide() {
      this.modal_header.show = false;
      window.clearTimeout(this.modal_header.timeout)
      this.modal_header.timeout = null;
      this.$router.push(this.$route.path);
      document.onkeydown = null;
    },
    next() {
      const index = (this.index + 1) % this.value.length;
      this.$router.push(`#${index}_${this.value[index].image.title || ''}_gallery`)
      document.activeElement.blur();
    },
    prev() {
      const index = (this.index - (this.index ? 1 : -this.num+1)) % this.value.length;
      this.$router.push(`#${index}_${this.value[index].image.title || ''}_gallery`)
      document.activeElement.blur();
    },
    modal__image_class(i) {
      const index = this.index == null ? 0 : this.index
      let res = `modal__image modal__image--large`
      const dir = this.delta(i)
      if (dir < 0)
        return `${res} modal__image--prev`
      else if (dir > 0)
        return `${res} modal__image--next`
      else return `${res} modal__image--current`
    },
    delta(i) {
      if (this.index == this.num - 1 && i == 0) {
        return this.num
      } else if ( this.index == 0 && i == this.num -1) {
        return -1
      } else {
        return i - this.index
      }
    },
    visible(i) {
      return this.delta(i) == 0
    },
    showHeader() {
      this.modal_header.show = true;
      if (!this.modal_header.timeout) {
        this.modal_header.timeout = window.setTimeout(() => {
          this.modal_header.show = false;
          this.modal_header.timeout = null;
        }, 3000)
      }
    },
    swipeHandler({offsetDirection}) {
      switch (offsetDirection) {
          case 8:
          this.hide();
          break;
          case 16:
          this.showHeader();
          break;
          case 2:
          this.next();
          break;
          case 4:
          this.prev();
      }
    }
  },
  mounted() {
    this.is_mounted = true
  },
  computed: {
    num() { return this.value.length },
    modal: {
      get() { return !(this.index == null) },
      set(val) { !val && this.hide() }
    },
    index() {
      const hash = this.$route.hash;
      if (!hash || !hash.endsWith("_gallery")) return;
      const index = hash.slice(1).split("_");
      return parseInt(index[0])
    }
  }
}
</script>
