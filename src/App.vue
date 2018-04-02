<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'

export default {
  components: {
    'app-header': Header
  }
}
</script>

<style lang="scss">
  $body-bg: rgb(242, 242, 242);  // find these variables in docs and in Bootstrap _variables.scss
  $primary: #607D8B;
  $dark: #455A64;
  $light: #CFD8DC;
  $info: #448AFF;
  @import "~bootstrap/scss/bootstrap";  // import complete bootstrap.scss source from node_modules using ~ alias
</style>

  <!-- $secondary:     ; -->
  <!-- $success:       $green !default; -->
  <!-- $warning:       $yellow !default; -->
  <!-- $danger:        $red !default; -->

<!-- <style> -->
<!-- body { -->
<!--   background-color: rgb(242, 242, 242); -->
<!-- } -->
<!-- </style> -->
