<template>
  <section class="main_wrap">
    <logo/>
    <nuxt/>
    <contact/>
    <b-footer/>
  </section>
</template>

<style>
body {
  background: #FF0000;
}
</style>
<script>
import Logo from '~/components/Logo'
import Contact from '~/components/Contact'
import BFooter from '../components/Footer';

export default {
  components: {
    Logo,
    Contact,
    BFooter
  }
}
</script>
