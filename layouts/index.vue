<template>
  <section class="main_wrap">
    <bk-logo @share="$refs.modal_share.show()"/>
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
import ShareModal from '~/components/Share/Modal'

export default {
  components: {
    BkLogo,
    BkContact,
    BkFooter,
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
      description: undefined,
      url: undefined
    }
  },
}
</script>
