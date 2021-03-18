<style lang="scss">
.contact_pattern {
  position: absolute; 
  width: 400%;
  --contact-pattern-height: 35rem;
  height: var(--contact-pattern-height);
  left: -150%;
  top: 0;
  transform: translateY(calc( -1 * var(--contact-pattern-height) ));
  transform-style: preserve-3d;
  z-index: -1;
  perspective: 200px;
  @media (min-width: 576px) {
    perspective: 300px;
  }
  @media (min-width: 768px) {
    perspective: 400px;
  }
  @media (min-width: 992px) {
    perspective: 400px;
  }
  @media (min-width: 1200px) {
    perspective: 600px;
  }
  svg {
    transform-origin: 50% 100%;
    transform: rotateX(45deg);
  }
}
</style>
<template>
  <b-container class="contact_container pt-5" fluid>
    <div class="contact_pattern">
      <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(2)'><path d='M 10,0 V 20 Z M 0,10 H 20 Z'  stroke-width='1' stroke='#FF0' fill='none'/>
          </pattern>
          <linearGradient id="Gradient1" dy="0" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#F00" stop-opacity="1"/>
            <stop offset="50%" stop-color="#F00" stop-opacity=".75"/>
            <stop offset="100%" stop-color="#F00" stop-opacity="0"/>
          </linearGradient>
          <zebra/>
          <filter id='noiseDisplacement1' x='0%' y='0' width='100%' height='100%'>
            <feTurbulence baseFrequency="0.02 0.005" result="NOISE" type="fractalNoise" numOctaves="2"/>
            <feDisplacementMap in="SourceGraphic" in2="NOISE" scale="60" xChannelSelector="R" yChannelSelector="R"></feDisplacementMap>
          </filter>
        </defs>
        <g>
          <rect class="contact_grid" dy="0" width='100%' height='110%' fill='url(#zebra-pattern)' filter='url(#noiseDisplacement1)'/>
          <rect id="contact_gradient" width='100%' height='100%' fill='url(#Gradient1)'/>
        </g>
      </svg>
    </div>
    <b-container>
      <b-row>
        <b-col>
          <p class="contact_text">
          Bopp Kogn is non-commercial, non-profit and is made possible from grants, donations, and the <span style="color: red">❤</span> of the people who work on it.
          </p>
          <p class="contact_text">
          Do you want to contribute to the project? If you have ideas, comments or are interested in more, feel free to contact us:
          </p>
        </b-col>
      </b-row>
      <b-row class="justify-content-center">
        <b-col cols="auto">
          <div class="contact_button_container">
            <b-btn @click="showPuzzle"
              size="lg"
              variant="primary">
              Contact
            </b-btn>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <client-only><Puzzle ref="puzzle" v-model="showPuzzle"/></client-only>
  </b-container>
</template>

<script>
import Puzzle from './puzzle'
import Zebra from  './Zebra'

export default {
  components: { Puzzle, Zebra },
  methods: {
    showPuzzle() {
      this.$refs['puzzle'].show()
    }
  }
}
</script>
