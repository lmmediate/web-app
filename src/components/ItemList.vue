<template>
  <div id="item-list">
    <item v-for="item in items" v-bind:item="item" v-bind:key="item.name"></item>
  </div>
</template>

<script>
import Item from './Item.vue'

export default {
  components: {
    'item': Item
  },
  props: ['items'],
  data () {
    return { }
  }
}
</script>

<style>
div#item-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
}
@media screen and (min-width: 768px) {
  div#item-list {
    justify-content: flex-start;
  }
}
</style>
