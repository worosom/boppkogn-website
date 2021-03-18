<template>
  <b-container class="pb-5 partners--container">
    <b-row class="mt-5">
      <b-col>
        <h1>Partners</h1>
      </b-col>
    </b-row>
    <b-row class="partners">
      <b-col v-for="(partner, key) in partners"
             :key="key"
             class="partner"
             cols="12"
             md="3"
             >
        <a :href="partner.link"
           :title="partner.name"
           target="_blank"
           rel="noopener">
          <div class="partner_image_wrap">
            <l-image class="partner_image"
                 :src="`/partners/${partner.logo}`"
                 :alt="partner.name"/>
          </div>
        </a>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import LImage from '~/components/Image'
import './style.scss'

export default {
  components: { LImage },
  data() {
    return {
      partners: [
        {
          name: 'Africulturban',
          link: 'https://facebook.com/africulturban',
          logo: 'africulturban.png'
        },
        {
          name: 'Panke',
          link: 'https://bit.ly/2NDGRAK',
          logo: 'panke.png'
        },
        {
          name: 'Don\'t let the label label you!',
          link: 'https://dltlly.com/',
          logo: 'dltlly.png'
        },
        {
          name: 'Deck 2 Deck',
          link: 'https://www.facebook.com/Deck2Deck.Berlin/',
          logo: 'deck2deck.png'
        },
        {
          name: 'Krekpek',
          link: 'https://krekpek.blogspot.com/',
          logo: 'krekpek.jpg'
        },
        {
          name: 'Beat Kollektiv',
          link: 'https://www.facebook.com/beatkollektiv',
          logo: 'beatkollektiv.png'
        },
        {
          name: 'sane studio',
          link: 'https://soundcloud.com/sane-studio',
          logo: 'sane.svg'
        },
      ]
    }
  }
}
</script>
