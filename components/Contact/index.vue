<template>
  <b-container class="contact_container pt-5" fluid>
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

export default {
  components: { Puzzle },
  methods: {
    showPuzzle() {
      this.$refs['puzzle'].show()
    }
  }
}
</script>
