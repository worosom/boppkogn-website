<style>
.img-hidden {
  opacity: 0;
}
</style>

<template>
  <img
    v-observe-visibility="{
      callback: visibilityChanged,
      once: true,
      throttle: 150
    }"
    :class="imgClass"
    :src="computedSrc"
    :alt="alt"
    ref="image"
    />
</template>

<script>
import loaderSvg from './loaderOpt.svg?data'
const fullscreenLoaderSvg = loaderSvg
// import fullscreenLoaderSvg from './fullscreenLoader.svg?data'

const resolutions = []
for (let i = 244; i <= 4148; i += 244) {
  resolutions.push(i)
}


const hashfn = (str) => {
  let hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash
}


const cached = {}


export default {
  props: {
    src: {type: String, default: ''},
    alt: String,
    fullscreen: {type: Boolean, default: false},
    smartcrop: {type: Boolean, default: true},
    lazy: {type: Boolean, default: true}
  },
  data() {
    return {
      computedSrc: loaderSvg,
      loaderSvg,
      fullscreenLoaderSvg,
      visible: false,
      loading: false,
      loaded: false,
      _shadowImg: undefined,
      _src: ''
    }
  },
  computed: {
    width() {
      if (this.$el) {
        const w = this.fullscreen ? window.innerWidth : this.$el.width
        let index = w / 4148 * (resolutions.length - 1)
        index = Math.min(resolutions.length - 1, Math.ceil(index));
        return resolutions[index]
      }
    },
    height() {
      if (this.$el) {
        const h = this.fullscreen ? window.innerHeight : this.$el.height
        let index = h / 4148 * (resolutions.length - 1)
        index = Math.min(resolutions.length - 1, Math.ceil(index));
        return resolutions[index] 
      }
    },
    imgClass() {
      let res = ''
      res += this.visible ? ' img-visible' : ' img-hidden';
      res += this.fullscreen ? ' img-fullscreen' : ''; 
      res += this.loading ? ' img-loading' : '';
      res += this.loaded ? ' img-loaded' : '';
      return res
    }
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      if (!this.visible) {
        this.visible = isVisible
        if (isVisible) {
          requestAnimationFrame(() => {
            if (this.fullscreen) {
              this.computedSrc = fullscreenLoaderSvg
            } else {
              this.computedSrc = loaderSvg
            }
          })
          this.shadow_img.src = this._src
          this.loading = true
        }
      }
    },
    onLoad() {
      cached[this.hash] = true
      this.loaded = true
      this.loading = false
      this.$emit('onload')
      requestAnimationFrame(() => {
        this.computedSrc = this._src
      })
    }
  },
  mounted() {
    this._src = `${this.src}?nf_resize=${this.smartcrop ? 'smartcrop' : 'fit'}&w=${this.width}&h=${this.height}`
    this.hash = hashfn(this._src)
    if (cached[this.hash]) {
      this.computedSrc = this._src
      this.visible = true
      this.loaded = true
      return
    }
    this.shadow_img = new Image()
    this.shadow_img.onload = this.onLoad
    if (!this.lazy) {
      this.visibilityChanged(true)
    }
  },
  destroy() {
    this.shadow_img.onload = undefined
  }
}
</script>
