<template>
  <section class="main_wrap">
    <bk-logo/>
    <nuxt/>
    <bk-contact/>
    <bk-footer/>
  </section>
</template>

<style>
body {
  background: #FF0000;
}
</style>
<script>
import BkLogo from '~/components/Logo'
import BkContact from '~/components/Contact'
import BkFooter from '../components/Footer';

export default {
  components: {
    BkLogo,
    BkContact,
    BkFooter
  }
}
</script>
