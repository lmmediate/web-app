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
      items: [{
        "discount": "\u0421\u043a\u0438\u0434\u043a\u0430 \u0437\u0434\u0435\u0441\u044c!",
        "category": "\u041c\u044f\u0441\u043d\u0430\u044f \u0433\u0430\u0441\u0442\u0440\u043e\u043d\u043e\u043c\u0438\u044f",
        "condition": "-",
        "date": "\u0421\u0440\u0435\u0434\u0430 08/11",
        "old_price": 99.0, "new_price": 49.5,
        "img_url": "https://dixy.ru/upload/iblock/72b/2000172107.jpg",
        "name": "\u041a\u043e\u043b\u0431\u0430\u0441\u0430 \u0413\u043e\u0432\u044f\u0436\u044c\u044f \u043e\u0441\u043e\u0431\u0430\u044f \u043f\u043e\u043b\u0443\u043a\u043e\u043f\u0447\u0435\u043d\u0430\u044f \u0426\u0430\u0440\u0438\u0446\u044b\u043d\u043e, 500 \u0433"
      }]
    }
  }
}
</script>

<style>
div#item-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
