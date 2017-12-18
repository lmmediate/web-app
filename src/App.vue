<template>
  <div id="app">
    <app-header></app-header>
    <item-list></item-list>
  </div>
</template>

<script>
import ItemList from './components/ItemList.vue'
import Header from './components/Header.vue'

export default {
  components: {
    'item-list': ItemList,
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
</style>
