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
  props: ['items']
}
</script>

<style>
div#item-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
@media screen and (min-width: 768px) {
  div#item-list {
    justify-content: flex-start;
  }
}
</style>
