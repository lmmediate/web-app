<template>
  <div id="app">
    <app-header></app-header>
    <item-list v-bind:items="items"></item-list>
  </div>
</template>

<script>
import ItemList from './components/ItemList.vue'
import Header from './components/Header.vue'

export default {
  components: {
    'item-list': ItemList,
    'app-header': Header
  },
  data: function() {
    return {
      url: 'http://46.17.44.125:8080/api',
      items: 
      [
      // MOCK items
      {"old_price":66.9,"name":"Биойогурт слобода мюсли-яблоки-мандарин-орех 7,6%, 210 г слобода  слобода слобода слобода слобода слободаслобода слобода слобода","condition":"-","img_url":"https://dixy.ru/upload/iblock/06c/2000262152.jpg","new_price":49.99,"date":"АКЦИЯ 04/12—10/12","discount":-25,"category":"Молочная гастрономия"},
      {"old_price":66.9,"name":"Биойогурт слобода мюсли-яблоки-мандарин-орех 7,6%, 210 г","condition":"-","img_url":"https://dixy.ru/upload/iblock/06c/2000262152.jpg","new_price":49.99,"date":"АКЦИЯ 04/12—10/12","discount":-25,"category":"Молочная гастрономия"},
      {"old_price":66.9,"name":"Биойогурт слобода мюсли-яблоки-мандарин-орех 7,6%, 210 г","condition":"-","img_url":"https://dixy.ru/upload/iblock/06c/2000262152.jpg","new_price":49.99,"date":"АКЦИЯ 04/12—10/12","discount":-25,"category":"Молочная гастрономия"},
      {"old_price":66.9,"name":"Биойогурт слобода мюсли-яблоки-мандарин-орех 7,6%, 210 г","condition":"-","img_url":"https://dixy.ru/upload/iblock/06c/2000262152.jpg","new_price":49.99,"date":"АКЦИЯ 04/12—10/12","discount":-25,"category":"Молочная гастрономия"},
      {"old_price":66.9,"name":"Биойогурт слобода мюсли-яблоки-мандарин-орех 7,6%, 210 г","condition":"-","img_url":"https://dixy.ru/upload/iblock/06c/2000262152.jpg","new_price":49.99,"date":"АКЦИЯ 04/12—10/12","discount":-25,"category":"Молочная гастрономия"},
      ]
    }
  },
  beforeMount: function() {
    var req = this.url + '/sales/page/2';
    this.$http.get(req).then(res => {
      this.items = res.data;
      console.log(items)
    }, res => {
      console.log('Error during GET request. Url: ' + req);
    });
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
