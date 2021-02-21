<style lang="scss">
.footer_container {
  background-color: #ff0;
  z-index: -1;
  position: relative;
  min-height: 2rem;
}

.footer_text {
  text-transform: uppercase;
  font-size: .8rem;
  font-family: "Sporting Grotesque_Regular";
  color: #f00;
}

</style>

<template>
  <b-container class="footer_container pt-4" fluid>
    <b-container>
      <b-row class="justify-content-center">
        <b-col cols="auto">
          <p class="footer_text">
          sane-studio 2021
          </p>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>
