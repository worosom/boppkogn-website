<template>
  <section class="main_wrap">
    <bk-logo :slim="true"/>
    <nuxt/>
    <bk-about/>
    <bk-partners/>
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
import BkAbout from '~/components/About'
import BkPartners from '~/components/Partners'
import BkContact from '~/components/Contact'
import BkFooter from '../components/Footer';

export default {
  components: {
    BkLogo,
    BkAbout,
    BkPartners,
    BkContact,
    BkFooter
  }
}
</script>
