<style lang="scss">
@import '@/assets/scss/variables.scss';

.team {
  &_header {
    color: $blue;
  }
  line-height: 3rem;
  a {
    position: relative;
    display: inline-grid;
    grid-template-columns: 3rem auto;
    grid-column-gap: .5rem;
    align-items: center;
    border: .25rem solid yellow;
    padding-right: .5rem;
    will-change: color;
    transition: border-color 150ms ease-out;
    outline: none;
    &::before {
      content: '';
      background: $yellow;
      position: absolute;
      top: 0;
      left: 3rem;
      height: 100%;
      width: 0;
      will-change: width;
      transition: background-color 150ms ease-out, width 150ms ease-out;
    }
    &:hover,
    &:focus {
      text-decoration: none;
      border-color: #0FF;
      h4 {
        color: $red;
      }
      &::before {
        width: calc(100% - 3rem);
        background: $blue;
        transition: width 75ms ease-out;
      }
    }
    h4 {
      margin: 0;
      color: $blue;
      white-space: nowrap;
      position: relative;
      top: .25rem;
      will-change: color;
      transition: color 150ms ease-out;
    }
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
  &__avatar {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: #FF0;
    &_wrap {
      position: relative;
      padding-top: 100%;
      width: 100%;
      overflow: hidden;
    }
  }
}
</style>
<template>
  <b-container id="team" class="team">
    <b-row>
      <b-col cols="12">
        <h1 class="team_header">
          Team
        </h1>
      </b-col>
      <b-col class="team">
        <template
          v-for="artist in team">
          <nuxt-link
            :to="`/artists/${artist.slug}/?origin=%2F%23team#content`"
            :key="`team_${artist.title}`"
            >
            <div class="team__avatar_wrap">
              <l-image smartcrop class="team__avatar" :src="artist.avatar"/>
            </div>
            <h4>{{artist.title}}</h4>
          </nuxt-link>
        </template>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import LImage from '~/components/Image'

export default {
  components: { LImage },
  props: ['team']
}
</script>
