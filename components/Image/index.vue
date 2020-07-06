<template>
  <img
    :src="computedSrc"
    :alt="alt"
    />
</template>

<script>
const resolutions = []
for (let i = 244; i <= 4148; i += 244) {
  resolutions.push(i)
}
console.log(resolutions)

export default {
  props: {
    src: {type: String, default: ''},
    sizes: String,
    srcset: String,
    alt: String,
    fullscreen: {type: Boolean, default: false},
    smartcrop: {type: Boolean, default: true}
  },
  data() {
    return {
      mounted: false,
      computedSrc: ''
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
  mounted() {
    this.mounted = true
    if (this.src)
      this.computedSrc = `${this.src}?nf_resize=${this.smartcrop ? 'smartcrop' : 'fit'}&w=${this.width}&h=${this.height}`
  },
  beforeDestroy() {
    this.mounted = false
  }
}
</script>
