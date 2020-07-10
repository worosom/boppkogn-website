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
               :key="i">
          <thumbnail :href="getHash(i)"
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
    <div style="position: absolute;"
         class="gallery_modal">
      <b-modal
        ref="modal"
        v-model="modal"
        id="gallery_modal"
        fullscreen lazy centered>
        <template slot="modal-header">
          <div class="gallery_modal__ui gallery_modal__ui--top" @mouseover="mouseOverUI" @mouseleave="mouseLeaveUI">
            <b-btn title="Close Gallery" @click="hide()">
              <md-close-icon w="1.5rem" h="1.5rem"/>
            </b-btn>
            <span v-if="title" class="title">
              {{title}}
            </span>
            <b-btn title="Credits" :disabled="!credits" v-b-modal.modal_credits>
                <md-information-icon w="1.5rem" h="1.5rem"/>
            </b-btn>
          </div>
        </template>
        <template slot="modal-footer">
          <div class="gallery_modal__ui gallery_modal__ui--bottom hidden" @mouseover="mouseOverUI" @mouseleave="mouseLeaveUI">
            <b-btn title="Previous" @click="prev()">
              <md-arrow-back-icon w="1.5rem" h="1.5rem"/>
            </b-btn>
            <span class="gallery_progress">
              {{index+1}} /
              {{num}}
            </span>
            <b-btn title="Next" @click="next()">
              <md-arrow-forward-icon w="1.5rem" h="1.5rem"/>
            </b-btn>
          </div>
        </template>
        <div
          class="modal__media"
          v-if="modal">
          <div :class="modal__image_class(_i)"
               v-for="(item, _i) in value"
               :key="_i"
               v-if="visible[_i]">
               <l-image
                 class='modal__image-large'
                 @onload="currentIsLoaded = true"
                 :smartcrop="false"
                 :lazy="false"
                 :fullscreen="true"
                 height="100%"
                 :src="item.image.src"
                 :alt="item.image.title"/>
          </div>
        </div>
        <div
          class="gallery_modal__ui--helper"
          v-hammer:swipe="swipeHandler"/>
      </b-modal>
      <b-modal
        id="modal_credits"
        body-bg-variant="#00F"
        body-text-variant="#FF0"
        lazy centered hide-footer hide-header>
        {{credits}}
      </b-modal>
    </div>
  </div>
</template>
<script>
import throttle from './throttle.js'
import MdCloseIcon from 'vue-ionicons/dist/md-close.vue'
import MdInformationIcon from 'vue-ionicons/dist/md-information.vue'
import MdArrowForwardIcon from 'vue-ionicons/dist/md-arrow-forward.vue'
import MdArrowBackIcon from 'vue-ionicons/dist/md-arrow-back.vue'
import Thumbnail from './Thumbnail'
import LImage from '~/components/Image'

export default {
  props: ['value'],
  components: { LImage, Thumbnail, MdCloseIcon, MdArrowForwardIcon, MdArrowBackIcon, MdInformationIcon },
  data() {
    return {
      is_mounted: false,
      currentIsLoaded: false,
      modal_ui: {
        show: false,
        timeout: null,
        mouseOver: false
      },
      num_thumbnails: 6
    }
  },
  methods: {
    getHash(_i) {
      return `#${_i}_${this.value[_i].image.title || ''}_gallery`
    },
    show(_i) {
      this.$router.push(this.getHash(_i))
    },
    showMore() {
      this.num_thumbnails += Math.min(30, this.num - this.num_thumbnails)
    },
    hide() {
      this.modal_ui.show = false;
      clearTimeout(this.modal_ui.timeout)
      this.modal_ui.timeout = null;
      this.$router.push(this.$route.path + '#pics');
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
    showUI() {
      if (this.modal && !this.modal_ui.show) {
        this.modal_ui.show = true;
        this._modal_original_class = document.getElementById('gallery_modal').className
        document.getElementById('gallery_modal').className += ' active'
        this.modal_ui.timeout = window.setTimeout(this.hideUI, 3500)
      }
    },
    hideUI() {
      if (this.modal && !this.modal_ui.mouseOver && this.modal_ui.show) {
        clearTimeout(this.modal_ui.timeout)
        this.modal_ui.show = false;
        this.modal_ui.timeout = null;
        document.getElementById('gallery_modal').className = this._modal_original_class
      }
    },
    mouseOverUI() {
      clearTimeout(this.modal_ui.timeout)
      this.modal_ui.mouseOver = true
    },
    mouseLeaveUI() {
      this.modal_ui.mouseOver = false
      this.hideUI()
    },
    swipeHandler({offsetDirection}) {
      switch (offsetDirection) {
          case 8:
          this.hide();
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
    this.throttledShowUI = throttle(this.showUI, 200, {leading: 'visible'})
    document.onkeydown = (ev) => {
      if (this.modal) {
        (ev.key == 'Escape') && this.hide();
        (ev.key == 'ArrowLeft' || ev.key == 'j') && this.prev();
        (ev.key == 'ArrowRight' || ev.key == 'l') && this.next();
      }
    }
    window.addEventListener('mousemove', this.throttledShowUI)
    window.addEventListener('touchstart', this.throttledShowUI)
  },
  beforeDestroy() {
    clearTimeout(this.modal_ui.timeout)
    window.removeEventListener('mousemove', this.throttledShowUI)
    window.removeEventListener('touchstart', this.throttledShowUI)
    document.onkeydown = undefined
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
    },
    visible() {
      return this.value.map((val, i) => {
        return this.delta(i) == 0 || (this.currentIsLoaded && Math.abs(this.delta(i)) <= 1)
      })
    },
    title() {
      return this.modal && this.value[this.index].image.title
    },
    credits() {
      return this.modal && this.value[this.index].image.credits
    }
  }
}
</script>
