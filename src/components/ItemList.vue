<template>
  <div id="item-list">
    <div id="pagination">
      
    </div>

    <item v-for="item in items" v-bind:item="item" v-bind:key="item.name"></item>
  </div>
</template>

<script>
import Item from './Item.vue'

export default {
  components: {
    'item': Item
  },
  methods: {
    getPage: function(num) {
      var req = this.url + '/sales/page/' + num;
      this.$http.get(req).then(res => {
        this.items = res.data;
      }, res => {
        console.log('Error during GET request. Url: ' + req);
      });      
    }
  },
  data: function() {
    return {
      url: 'http://46.17.44.125:8080/api',
      items: 
      [
      // MOCK items
      {"old_price":66.9,"name":"Биойогурт слобода мюсли-яблоки-мандарин-орех 7,6%, 210 г слобода  слобода слобода слобода слобода слободаслобода слобода слобода","condition":"-","img_url":"https://dixy.ru/upload/iblock/06c/2000262152.jpg","new_price":49.99,"date":"АКЦИЯ 04/12—10/12","discount":-25,"category":"Молочная гастрономия"}
      ]
    }
  },
  beforeMount: function() {
    this.getPage(1);
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
