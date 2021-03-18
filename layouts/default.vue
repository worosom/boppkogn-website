<template>
  <section class="main_wrap">
    <bk-logo @share="$refs.modal_share.show()" :slim="true"/>
    <b-btn title="Back" :to="origin" @click.stop.prevent="$router.push(origin)" class="main-back-btn">
      <md-arrow-back-icon w="1.5rem" h="1.5rem"/>
    </b-btn>
    <nuxt/>
    <bk-contact/>
    <bk-footer/>
    <share-modal :url="url" :title="title" :description="description" ref="modal_share"/>
  </section>
</template>
<script>
import BkLogo from '~/components/Logo'
import BkContact from '~/components/Contact'
import BkFooter from '../components/Footer';
import MdArrowBackIcon from 'vue-ionicons/dist/md-arrow-back.vue'
import ShareModal from '~/components/Share/Modal'

export default {
  components: {
    BkLogo,
    BkContact,
    BkFooter,
    MdArrowBackIcon,
    ShareModal
  },
  created() {
    this.$nuxt.$on('share', data => {
      this.title = data.title
      this.description = data.description
      this.$refs.modal_share.show()
    })
  },
  data() {
    return {
      title: undefined,
      description: undefined
    }
  },
  computed: {
    origin() {
      const {origin} = this.$route.query
      if (origin) {
        return origin
      } else if (this.$route.params.slug){
        return `/#${this.$route.params.slug}`
      }
      return `/`
    },
    url() { return process.env.BASE_URL + this.$route.path }
  }
}
</script>
