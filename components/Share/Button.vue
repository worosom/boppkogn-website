<template>
  <a href="javascript:void(0)" @click="$emit('click')">
    {{verbose ? 'Share ' : ''}}<md-share-icon :w="w" :h="h"/>
  </a>
</template>
<script>
import MdShareIcon from 'vue-ionicons/dist/md-share.vue'

export default {
  props: {
    w: { type: String, default: "1.25rem" },
    h: { type: String, default: "1.25rem" },
    verbose: {type: Boolean, default: false}
  },
  components: { MdShareIcon }
}
</script>
