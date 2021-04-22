<template>
  <a :href="value.href" target="_blank">&#128279; {{value.title || value.href}}</a>
</template>
<script>

export default {
  props: {
    value: {type: Object, required: true},
  },
  data() {
    return {}
  }
}
</script>
