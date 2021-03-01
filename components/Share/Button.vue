<template>
  <b-btn @click="$emit('click')">
    {{verbose ? 'Share ' : ''}}<md-share-icon w="1.25rem" h="1.25rem"/>
  </b-btn>
</template>
<script>
import MdShareIcon from 'vue-ionicons/dist/md-share.vue'

export default {
  components: { MdShareIcon },
  props: {verbose: {type: Boolean, default: false}}
}
</script>
