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
        <i class="icon ion-logo-facebook"/>
      </a>
      <a href="https://www.instagram.com/boppkognfestival/"
         title="Bopp Kogn Instagram"
         target="_blank"
         rel="noopener">
        <i class="icon ion-logo-instagram"/>
      </a>
    </div>
    <div v-if="!slim && $store.getters.upcoming.length" class="logo__cta">
      <a href="#upcoming" title="Upcoming">
        <h2>Upcoming</h2>
        <i class="icon ion-md-arrow-round-down"/>
      </a>
    </div>
    <div v-else-if="!slim && $store.getters.previous.length" class="logo__cta">
      <a href="#previously" title="Previously">
        <h2>Previously</h2>
        <i class="icon ion-md-arrow-round-down"/>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['slim'],
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
