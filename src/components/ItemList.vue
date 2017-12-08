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
  data () {
    return {
      items: [
        {"old_price":66.9,"name":"Биойогурт слобода мюсли-яблоки-мандарин-орех 7,6%, 210 гБиойогурт слобода мюсли-яблоки-мандарин-орех 7,6%, 210 гБиойогурт слобода мюсли-яблоки-мандарин-орех 7,6%, 210 гы","condition":"-","img_url":"https://dixy.ru/upload/iblock/06c/2000262152.jpg","new_price":49.99,"date":"АКЦИЯ 04/12—10/12","discount":-25,"category":"Молочная гастрономия"},
        ]
    }
  }
}
</script>

<style>
div#item-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
