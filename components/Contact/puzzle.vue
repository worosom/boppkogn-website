<template>
  <b-modal ref="modal"
           size="sm"
           hide-footer
           hide-header
           centered>
    <div class="d-block">
      <template v-if="!solved">
        <h5>Pick a color</h5>
        <div class="color-picker">
          <div
            v-for="(_color, i) in palette"
            class="color"
            :style="`background-color: ${_color}`"
            @click="color = _color"/>
        </div>
      </template>
      <template v-else>
        <h5>Write us an email</h5>
        <b-btn :href="`mailto:${address_string}`" 
               v-html='address_string'
               variant='outline-danger'>
        </b-btn>
      </template>
    </div>
  </b-modal>
</template>
<script>
export default {
  data() {
    return {
      address: {
        name: 'boppkognfestival',
        host: 'gmail',
        tld: 'com'
      },
      color: '#000000'
    }
  },
  methods: {
    show() {
      this.$refs['modal'].show()
    }
  },
  computed: {
    rgb() {
      const hex = this.color
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);

      return {
        r, g, b
      }
    },
    hsl() {
      let r = this.rgb.r / 255, g = this.rgb.g / 255, b = this.rgb.b / 255;

      let max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;

      if (max == min) {
        h = s = 0; // achromatic
      } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }

        h /= 6
      }

      return { h, s, l }
    },
    solved() {
      return this.hsl.h && this.hsl.l
    },
    palette() {
      return Array.from(Array(117).keys()).map(() => "#000000".replace(/0/g, () => {return (~~(Math.max(0, Math.random()*2-1)*16)).toString(16)}))
    },
    address_string() {
      return `${this.address.name}@${this.address.host}.${this.address.tld}`
    }
  }
}
</script>
