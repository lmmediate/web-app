<template>
  <div id="app">
    <app-header></app-header>
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  components: {
    'app-header': Header
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');
* {
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Roboto', sans-serif;
  background-color: rgb(242, 242, 242);
}
div#content {
  width: 90%;
  margin: 0 auto;
}
</style>
