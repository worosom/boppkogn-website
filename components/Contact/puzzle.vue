<style>
.vc-compact {
    width: 100% !important;
    box-shadow: none !important;
}
</style>
<template>
  <b-modal ref="modal"
           size="sm"
           hide-footer
           hide-header
           centered>
    <div class="d-block">
      <template v-if="!solved">
        <h5>Pick a color</h5>
        <color-picker v-model="color" :palette="palette"/>
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
import { Compact } from 'vue-color'

export default {
  components: {'color-picker': Compact},
  data() {
    return {
      address: {
        name: 'boppkognfestival',
        host: 'gmail',
        tld: 'com'
      },
      color: { hsl: {h: 0, s: 0, l: 0} }
    }
  },
  methods: {
    show() {
      this.$refs['modal'].show()
    }
  },
  computed: {
    solved() {
      return this.color.hsl.h && this.color.hsl.l
    },
    palette() {
      return Array.from(Array(117).keys()).map(() => "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16)}))
    },
    address_string() {
      return `${this.address.name}@${this.address.host}.${this.address.tld}`
    }
  }
}
</script>
