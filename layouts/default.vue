<template>
  <section class="main_wrap">
    <logo :slim="true"/>
    <nuxt/>
    <about/>
    <partners/>
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
import About from '~/components/About'
import Partners from '~/components/Partners'
import Contact from '~/components/Contact'
import BFooter from '../components/Footer';

export default {
  components: {
    Logo,
    About,
    Partners,
    Contact,
    BFooter
  }
}
</script>
