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
        {"old_price":66.9,"name":"Биойогурт слобода мюсли-яблоки-мандарин-орех 7,6%, 210 г слобода  слобода слобода слобода слобода слободаслобода слобода слобода","condition":"-","img_url":"https://dixy.ru/upload/iblock/06c/2000262152.jpg","new_price":49.99,"date":"АКЦИЯ 04/12—10/12","discount":-25,"category":"Молочная гастрономия"},
        {"old_price":66.9,"name":"Биойогурт слобода мюсли-яблоки-мандарин-орех 7,6%, 210 г","condition":"-","img_url":"https://dixy.ru/upload/iblock/06c/2000262152.jpg","new_price":49.99,"date":"АКЦИЯ 04/12—10/12","discount":-25,"category":"Молочная гастрономия"},
        {"old_price":66.9,"name":"Биойогурт слобода мюсли-яблоки-мандарин-орех 7,6%, 210 г","condition":"-","img_url":"https://dixy.ru/upload/iblock/06c/2000262152.jpg","new_price":49.99,"date":"АКЦИЯ 04/12—10/12","discount":-25,"category":"Молочная гастрономия"},
        {"old_price":66.9,"name":"Биойогурт слобода мюсли-яблоки-мандарин-орех 7,6%, 210 г","condition":"-","img_url":"https://dixy.ru/upload/iblock/06c/2000262152.jpg","new_price":49.99,"date":"АКЦИЯ 04/12—10/12","discount":-25,"category":"Молочная гастрономия"},
        {"old_price":66.9,"name":"Биойогурт слобода мюсли-яблоки-мандарин-орех 7,6%, 210 г","condition":"-","img_url":"https://dixy.ru/upload/iblock/06c/2000262152.jpg","new_price":49.99,"date":"АКЦИЯ 04/12—10/12","discount":-25,"category":"Молочная гастрономия"},
        ]
    }
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
