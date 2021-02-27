<template>
  <div class="gallery_modal">
    <div
      ref="modal"
      id="gallery_modal">
      <div class="modal">
        <div class="modal-content">
          <header class="modal-header">
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
          </header>
          <footer class="modal-footer">
            <div class="gallery_modal__ui gallery_modal__ui--bottom hidden" @mouseover="mouseOverUI" @mouseleave="mouseLeaveUI">
              <b-btn v-if="media.length > 0" title="Previous" @click="prev()">
                <md-arrow-back-icon w="1.5rem" h="1.5rem"/>
              </b-btn>
              <span class="gallery_progress">
                {{index+1}} /
                {{num}}
              </span>
              <b-btn v-if="media.length > 0" title="Next" @click="next()">
                <md-arrow-forward-icon w="1.5rem" h="1.5rem"/>
              </b-btn>
            </div>
          </footer>
          <div class="modal-body">
            <div
              class="modal__media">
              <div :class="modal__image_class(_i)"
                   v-for="(item, _i) in media"
                   :key="_i"
                   v-if="visible[_i]">
                   <l-image
                     class='modal__image-large'
                     @onload="onLoad(_i)"
                     :smartcrop="false"
                     :lazy="false"
                     :fullscreen="true"
                     height="100%"
                     :src="item.image.src"
                     :alt="item.image.title"/>
              </div>
            </div>
          </div>
          <div
            class="gallery_modal__ui--helper"
            v-hammer:swipe="swipeHandler"/>
        </div>
      </div>
    </div>
    <b-modal
      id="modal_credits"
      ref="modal_credits"
      body-bg-variant="#00F"
      body-text-variant="#FF0"
      lazy centered hide-footer hide-header>
      <b-container>
        <b-row>
          <b-col
            :class="'mx-2 modal_credit'"
            v-for="(credit, key) in credits"
            :key="`credit_${key}`"
            >
            <div v-if="credit.text" class="modal_credit_text">{{credit.text}}</div>
            <a
              :href="`https://instagram.com/${credit.instagram}/`"
              target="_blank"
              :title="`Instagram @${credit.instagram}`"
              v-if="credit.instagram">
              <logo-instagram w="2rem" h="2rem"/>
              <span>@{{credit.instagram}}</span>
            </a>
            <a
              :href="credit.website"
              target="_blank"
              title="Website"
              v-if="credit.website">
              <logo-open w="2rem" h="2rem"/>
              <span>Website</span>
            </a>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>
<script>
import { throttle, imageURI, artistData } from '~/util'
import { asyncData } from '~/pages/artists/_artist'
import MdCloseIcon from 'vue-ionicons/dist/md-close.vue'
import MdInformationIcon from 'vue-ionicons/dist/md-information.vue'
import MdArrowForwardIcon from 'vue-ionicons/dist/md-arrow-forward.vue'
import MdArrowBackIcon from 'vue-ionicons/dist/md-arrow-back.vue'
import LogoInstagram from 'vue-ionicons/dist/logo-instagram.vue'
import LogoOpen from 'vue-ionicons/dist/md-open.vue'
import Thumbnail from '~/components/Gallery/Thumbnail'
import LImage from '~/components/Image'

export default {
  components: { LImage, Thumbnail, MdCloseIcon, MdArrowForwardIcon, MdArrowBackIcon, MdInformationIcon, LogoInstagram, LogoOpen },
  layout: 'gallery',
  async asyncData(context) {
    const {params, payload, $content} = context
    let media;
    if (payload) return payload;
    if (params.artist) {
      media = (await artist.asyncData(context)).media
    } else {
      media = (await $content(`en/events/${params.slug}`).only('media').fetch()).media
    }
    return {
      media
    }
  },
  data() {
    return {
      is_mounted: false,
      currentIsLoaded: false,
      modal_ui: {
        show: false,
        timeout: null,
        mouseOver: false
      },
      num_thumbnails: 6,
      throttledShowUI: throttle(this.showUI, 200, {leading: 'visible'})
    }
  },
  methods: {
    hide() {
      this.modal_ui.show = false;
      clearTimeout(this.modal_ui.timeout)
      this.modal_ui.timeout = null;
      this.$router.push(this.$route.params.artist ? `/artists/${this.$route.params.artist}/#pics` : `/events/${this.$route.params.slug}/#pics`);
    },
    next() {
      const index = (this.index + 1) % this.media.length;
      this.$router.push(imageURI(this.$route, index, this.media[index].image))
      document.activeElement.blur();
    },
    prev() {
      const index = (this.index - (this.index ? 1 : -this.num+1)) % this.media.length;
      this.$router.push(imageURI(this.$route, index, this.media[index].image))
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
      if (this.media.length == 1) {
        return 0
      }
      if (this.index == this.num - 1 && i == 0) {
        return this.num
      } else if ( this.index == 0 && i == this.num -1) {
        return -1
      } else {
        return i - this.index
      }
    },
    showUI() {
      if (!this.modal_ui.show && (!this.$refs.modal_credits || !this.$refs.modal_credits.isShow)) {
        this.modal_ui.show = true;
        this._modal_original_class = document.getElementById('gallery_modal').className
        document.getElementById('gallery_modal').className += ' active'
        this.modal_ui.timeout = window.setTimeout(this.hideUI, 3500)
      }
    },
    hideUI() {
      if (!this.modal_ui.mouseOver && this.modal_ui.show) {
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
    },
    onLoad(i) {
      if (this.delta(i) == 0) {
        this.currentIsLoaded = true
      }
    }
  },
  mounted() {
    this.is_mounted = true
    document.onkeydown = (ev) => {
      (ev.key == 'Escape') && this.hide();
      (ev.key == 'ArrowLeft' || ev.key == 'j') && this.prev();
      (ev.key == 'ArrowRight' || ev.key == 'l') && this.next();
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
    num() { return this.media.length },
    index() {
      const image = this.$route.params.image;
      const index = image.split("_")[0];
      return parseInt(index)
    },
    visible() {
      if (this.media.length == 1) return [true];
      return this.media.map((val, i) => {
        return this.delta(i) == 0 || (this.currentIsLoaded && Math.abs(this.delta(i)) <= 1)
      })
    },
    title() {
      return this.media[this.index].image.title
    },
    credits() {
      return this.media[this.index].image.credits
    },
    artists() {
      return this.media[this.index].image.artists
    }
  }
}
</script>
