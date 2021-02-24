<style lang="scss">
.family {
  h1 {
    color: blue;
  }
}
</style>
<template>
  <b-container class="content family mt-5">
    <b-row>
      <b-col>
        <h1>
          Boppkogn Family
        </h1>
      </b-col>
    </b-row>
    <b-row>
      <artist v-for="artist in artists" :key="artist.slug" :artist="artist"/>
    </b-row>
  </b-container>
</template>
<script>
import Artist from '~/components/Artist'

export default {
  components: {Artist},
  async asyncData({route, $content}) {
    const artists = (await $content(`en/artists`).fetch()).sort((a, b) => a.slug.localeCompare(b.slug))
    return {
      artists
    }
  }
}
</script>
