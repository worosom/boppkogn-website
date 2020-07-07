<template>
  <img
    v-observe-visibility="{
      callback: visibilityChanged,
      once: true,
      throttle: 150,
      throttleOptions: {
        leading: 'visible'
      }
    }"
    :src="computedSrc"
    :alt="alt"
    ref="image"
    />
</template>

<script>
import loaderSvg from './loader.svg?data'

const resolutions = []
for (let i = 244; i <= 4148; i += 244) {
  resolutions.push(i)
}

export default {
  props: {
    src: {type: String, default: ''},
    alt: String,
    fullscreen: {type: Boolean, default: false},
    smartcrop: {type: Boolean, default: true}
  },
  data() {
    return {
      computedSrc: '',
      loaderSvg,
      _shadowImg: undefined
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
    }
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      this.visible = isVisible
      if (isVisible) {
        this.computedSrc = loaderSvg
        this.shadow_img.src = this._src
      }
    },
    onLoad() {
      this.computedSrc = this._src
    }
  },
  mounted() {
    this._src = `${this.src}?nf_resize=${this.smartcrop ? 'smartcrop' : 'fit'}&w=${this.width}&h=${this.height}`
    this.shadow_img = new Image()
    this.shadow_img.onload = this.onLoad
  },
  destroy() {
    this.shadow_img.onload = undefined
  }
}
</script>
