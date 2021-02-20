<template>
  <div nuxt link exact to="/" title="Pull Up" :class="logo__wrap">
    <div class="logo__wrap--inner">
      <h1
        class="logo__main"
        alt="Bopp Kogn">
        Bopp Kogn
      </h1>
      <h1 v-if="!slim" class="logo__sub">
        Hip Hop<br>Festival
      </h1>
      <nuxt-link class="home" exact to="/" title="Pull Up"></nuxt-link>
    </div>
    <div class="logo__social mt-4">
      <a href="https://www.facebook.com/BOPP-KOGN-145822202116745/"
         title="Bopp Kogn Facebook"
         target="_blank"
         rel="noopener">
        <logo-facebook w="2.5rem" h="2.5rem"/>
      </a>
      <a href="https://www.instagram.com/boppkognfestival/"
         title="Bopp Kogn Instagram"
         target="_blank"
         rel="noopener">
        <logo-instagram w="2.5rem" h="2.5rem"/>
      </a>
    </div>
    <div class="logo__cta">
      <a href="#events" title="Events">
        <md-arrow-round-down-icon w="2.5rem" h="2.5rem"/>
      </a>
    </div>
  </div>
</template>

<script>
import MdArrowRoundDownIcon from 'vue-ionicons/dist/md-arrow-round-down.vue'
import LogoInstagram from 'vue-ionicons/dist/logo-instagram.vue'
import LogoFacebook from 'vue-ionicons/dist/logo-facebook.vue'

export default {
  props: ['slim'],
  components: {MdArrowRoundDownIcon, LogoFacebook, LogoInstagram},
  mounted() {
    if (!this.slim)
      this.$el.setAttribute('style', `min-height: ${this.$el.offsetHeight}px;`);
  },
  computed: {
    logo__wrap() {
      return `logo__wrap ${this.slim ? 'logo__wrap--slim' : ''}`
    }
  }
}
</script>
