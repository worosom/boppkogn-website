<template>
  <nuxt-link
    :to="href"
    @click.stop="$emit('click')"
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
