<template>
  <section class="main_wrap">
    <bk-logo :slim="true"/>
    <b-btn title="Back" :to="'/'" class="main-back-btn">
      <md-arrow-back-icon w="1.5rem" h="1.5rem"/>
    </b-btn>
    <nuxt/>
    <bk-about/>
    <bk-partners/>
    <bk-contact/>
    <bk-footer/>
  </section>
</template>

<style lang="scss">
body {
  background: #FF0000;
}
.btn.main-back-btn {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  background-color: #FFFF00;
  color: #F00;
  border: solid 5px red;
  border-radius: 0;
  box-sizing: border-box;
  display: grid;
  align-items: center;
  justify-content: center;
  padding-bottom: 6px;
  &:hover, &:active:not(:disabled) {
    animation: strobe 250ms infinite;
    background-color: #00F;
  }
}
</style>
<script>
import BkLogo from '~/components/Logo'
import BkAbout from '~/components/About'
import BkPartners from '~/components/Partners'
import BkContact from '~/components/Contact'
import BkFooter from '../components/Footer';
import MdArrowBackIcon from 'vue-ionicons/dist/md-arrow-back.vue'

export default {
  components: {
    BkLogo,
    BkAbout,
    BkPartners,
    BkContact,
    BkFooter,
    MdArrowBackIcon
  }
}
</script>
