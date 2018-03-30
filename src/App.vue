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

<style>
body {
  background-color: rgb(242, 242, 242);
}
</style>
