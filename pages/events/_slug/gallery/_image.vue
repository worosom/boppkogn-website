<style lang="scss">
@import "@/assets/scss/gallery_image.scss";
</style>
<template>
  <div class="gallery_modal">
    <div
      ref="modal"
      id="gallery_modal">
      <div class="modal"  style="z-index: 1040;">
        <div class="modal-content">
          <header class="modal-header">
            <div class="gallery_modal__ui gallery_modal__ui--top" @mouseover="mouseOverUI" @mouseleave="mouseLeaveUI">
              <b-btn title="Close Gallery" @click="hide()">
                <md-close-icon w="1.5rem" h="1.5rem"/>
              </b-btn>
              <span v-if="title" class="title">
                {{title}}
              </span>
              <div class="gallery_modal__ui--top__buttons">
                <share-button @click="$refs.modal_share.show()"/>
                <b-btn title="Info" v-b-modal.modal_credits>
                  <md-information-icon w="1.5rem" h="1.5rem"/>
                </b-btn>
              </div>
            </div>
          </header>
          <footer v-if="num > 1" class="modal-footer">
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
          static lazy centered hide-footer hide-header>
        <b-container>
          <b-row v-if="event">
            <b-col
              :class="'mx-2 modal_credit'"
              >
              <nuxt-link
                  :to="`/events/${event.slug}/?origin=${encodeURIComponent($route.fullPath)}#content`"
                  class="title"
                  >
                  <l-image
                      style="height: 3.5rem; z-index: 1"
                      :src="event.image"
                      :alt="event.title"/>
                  <span>{{event.title}} {{event.type}}<br>{{event.subtitle}}</span>
              </nuxt-link>
            </b-col>
          </b-row>
          <b-row
            v-for="({title, slug}) in artists"
            :key="`artist_link_${title}`"
            >
            <b-col
                :class="'mx-2 modal_credit'"
                >
              <nuxt-link
                  :to="`/artists/${slug}/?origin=${encodeURIComponent($route.fullPath)}#content`"
                  class="title"
                  >
                  <span>
                    {{title}}
                  </span>
              </nuxt-link>
            </b-col>
          </b-row>
          <b-row v-if="credits">
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
      <share-modal
          ref="modal_share"
          :url="url"
          :title="title"
          :description="description"
          />
    </div>
</template>
<script>
import { throttle, imageURI, artistData, ast2str } from '~/util'
import { asyncData } from '~/pages/artists/_artist'
import MdCloseIcon from 'vue-ionicons/dist/md-close.vue'
import MdInformationIcon from 'vue-ionicons/dist/md-information.vue'
import MdArrowForwardIcon from 'vue-ionicons/dist/md-arrow-forward.vue'
import MdArrowBackIcon from 'vue-ionicons/dist/md-arrow-back.vue'
import LogoInstagram from 'vue-ionicons/dist/logo-instagram.vue'
import LogoOpen from 'vue-ionicons/dist/md-open.vue'
import Thumbnail from '~/components/Gallery/Thumbnail'
import LImage from '~/components/Image'
import ShareButton from '~/components/Share/Button'
import ShareModal from '~/components/Share/Modal'

export default {
  components: { ShareButton, ShareModal, LImage, Thumbnail, MdCloseIcon, MdArrowForwardIcon, MdArrowBackIcon, MdInformationIcon, LogoInstagram, LogoOpen },
  layout: 'gallery',
  head() {
    const title = `${this.title} - Bopp Kogn HipHop Festival`
    return {
      title,
      meta: [
        {
          rel: 'canonical',
          href: process.env.BASE_URL + this.$route.path
        },
        {
          hid: 'description',
          name: 'description',
          content: this.description
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.url
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: process.env.BASE_URL + this.media[this.index].image.src + '?nf_resize=smartcrop&w=2400&h=1260'
        },
        {
          hid: 'og:image:type',
          property: 'og:image:type',
          content: 'image/jpeg'
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.artists?.map(({title}) => title).join(', ') || this.title
        },
      ],
    }
  },
  async asyncData(context) {
    const {params, payload, $content} = context
    let media, artist = null, event = null;
    if (payload) return payload;
    if (params.artist) {
      artist = (await asyncData(context))
      media = artist.media
    } else {
      event = (await $content(`en/events/${params.slug}`).fetch())
      media = event.media
    }
    const image = media[parseInt(context.route.params.image.split('_')[0])].image
    if (!event && image.slug) {
      event = await $content(`en/events/${image.slug}`).fetch()
    }
    const artists = image.artists && await Promise.all(
      image.artists.map(async ({relation}) => 
        await asyncData({
          ...context,
          route: { params: { artist: relation }}
        })
      )
    )
    return {
      event,
      artist,
      media,
      artists,
      image
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
      if (this.$route.query.origin) {
        this.$router.push(this.$route.query.origin);
      } else if (this.$route.params.slug) {
        this.$router.replace('/events/' + this.$route.params.slug + '/#pics')
      } else {
        this.$router.replace('/artists/' + this.$route.params.artist + '/#pics')
      }
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
      if (!this.modal_ui.show && (!this.$refs.modal_credits || !this.$refs.modal_credits.isShow) && (!this.$refs.modal_share || !this.$refs.modal_share.isShow)) {
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
    title() { 
      if (this.media[this.index].title) {
        return this.media[this.index].title
      } else if (this.artists) {
        return `${this.artists.map(({title}) => title).join(', ')}`
      } else if (this.event && this.event.title) {
        return `${this.event.title} ${this.event.type}`
      } else if (this.artist && this.artist.title) {
        return this.artist.title
      }
    },
    description() {
      const imageArtists = this.artists
      const imageDescription = this.media[this.index].image.description
      if (imageDescription) {
        return imageDescription
      } else if (this.artist) {
        if (this.artist.body?.children.length) {
          const bio = ast2str(this.artist.body)
          if (bio) {
            return bio
          }
        }
        return this.artist.title
      } else if (imageArtists) {
        return this.artists.map(({title}) => title).join(', ')
      } else if (this.event) {
        if (this.event.body?.children.length) {
          return ast2str(this.event.body)
        } else {
          return `${this.event.title} ${this.event.type}`
        }
      }
    },
    url() { return process.env.BASE_URL + this.$route.path },
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
    credits() {
      return (this.image.credits?.credit || this.image.credits)
    },
  }
}
</script>
