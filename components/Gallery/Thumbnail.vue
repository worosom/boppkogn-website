<template>
  <nuxt-link
    :to="href"
    :title="title"
    class="media__thumbnail_wrapper">
    <l-image class="media__thumbnail"
         :src="value.src"
         :alt="value.title"/>
  </nuxt-link>
</template>
<script>
import LImage from '~/components/Image'

export default {
  components: { LImage },
  props: ['value', 'href', 'title']
}
</script>
