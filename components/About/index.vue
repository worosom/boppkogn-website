<style lang="scss">
.about {
  &__header {
    color: #00F;
  }
  &__highlight {
    background: #FF0;
    color: #00F;
    padding: 0 .5rem;
  }
  position: relative;
  &__abstract { 
    margin-bottom: 30px;
    &--content {
      background: blue;
      color: yellow;
      font-family: "Sporting Grotesque_Regular";
      line-height: 1.75;
      hyphens: auto;
      padding: 15px;
      @media (min-width: 576px) {
        padding: 30px;
      }
      @media (min-width: 768px) {
        padding: 15px;
        font-size: 1.2rem;
      }
      @media (min-width: 992px) {
        padding: 30px;
      }
    }
  }
  &__translation {
    background: #FF0;
    color: #00F;
    will-change: color;
    padding: 0 .5rem;
    white-space: nowrap;
    position: relative;
    cursor: default;
    text-align: left;
    &--language {
      background-color: #F00;
      padding: 0 .5rem;
      display: inline-block;
      transform: translate(-50%, 0);
      &__wrap {
        visibility: hidden;
        will-change: visibility;
        display: inline-block;
        position: absolute;
        top: 100%;
        left: 50%;
        width: 100%;
        height: 100%;
        z-index: 10;
      }
    }
    &:hover {
      background: #F00;
      animation: translation 120ms infinite;
      .about__translation--language {
        &__wrap {
          visibility: unset;
        }
      }
    }
  }
}
@keyframes translation {
  0% {
    color: #FF0;
  }
  100% {
    color: #0F0;
  }
}
</style>

<template>
  <b-container class="about--container mb-5">
    <b-row class="mt-5">
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
             style="z-index: 100"
             class="about__abstract">
        <div class="about__abstract--content"
             v-html="part"/>
      </b-col>
      <b-col offset="0"
             sm="12"
             md="6"
             lg="6"
             xl="12"
             style="z-index: 100"
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
            &nbsp;
          </template>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  data() {
    const about = this.$store.state.about
    return {
      abstract: about.abstract.map(ob => ob.part),
      translations: about.translations.map(ob => ob.translation)
    }
  }
}
</script>
