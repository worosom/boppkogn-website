<template>
  <b-container class="about--container">
    <b-row class="mt-3">
      <b-col>
        <h1 class="about__header">Bopp Kogn</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-for="part, i in abstract"
             :key="`abstract_${part}`"
             offset="0"
             sm="12"
             md="6"
             lg="6"
             xl="4"
             class="about__abstract">
        <div class="about__abstract--content"
             v-html="part"/>
      </b-col>
      <b-col offset="0"
             sm="12"
             lg="6"
             xl="6"
             class="about__abstract">
        <div class="about__abstract--content"
             v-html="donations"/>
      </b-col>
      <b-col offset="0"
             sm="12"
             xl="6"
             class="about__abstract">
        <div class="text-center about__abstract--content">
          <template v-for="translation in translations">
            <span class="about__translation" :data-language="translation.language">
              {{translation.value}}
              <span class="about__translation--language__wrap">
                <span class="about__translation--language">
                  {{translation.language}}
                </span>
              </span>
            </span>
          </template>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  props: ['about'],
  data() {
    return {
      ...this.about
    }
  }
}
</script>
