<template>
  <div id="app">
    <item-list></item-list>
  </div>
</template>

<script>
import ItemList from './components/ItemList.vue'

export default {
  components: {
    'item-list': ItemList
  },
  data: function() {
    return {
    }
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
  }
</style>
