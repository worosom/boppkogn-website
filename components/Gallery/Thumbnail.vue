<template>
  <div class="media__thumbnail_wrapper">
    <l-image class="media__thumbnail"
         :src="value.src"
         :alt="value.title"/>
  </div>
</template>
<script>
import LImage from '~/components/Image'

export default {
  components: { LImage },
  props: ['value']
}
</script>
