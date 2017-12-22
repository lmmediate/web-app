<template>
  <div>
    <item-list v-bind:items="items"></item-list>
    <pagination v-bind:info="info"></pagination>
  </div>
</template>

<script>
import ItemList from './ItemList.vue'
import Pagination from './Pagination.vue'

export default {
  components: {
    'item-list': ItemList,
    'pagination': Pagination
  },
  data: function() {
    return {
      // url: 'http://46.17.44.125:8080/api',
      url: 'http://localhost:8080/api',
      // info: { numPages: 5 }, // FIXME: mock
      info: { },
      items: 
      [
      // MOCK items
      {"old_price":66.9,"name":"Биойогурт слобода мюсли-яблоки-мандарин-орех 7,6%, 210 г слобода  слобода слобода слобода слобода слободаслобода слобода слобода","condition":"-","img_url":"https://dixy.ru/upload/iblock/06c/2000262152.jpg","new_price":49.99,"date":"АКЦИЯ 04/12—10/12","discount":-25,"category":"Молочная гастрономия"}
      ],
    }
  },
  methods: {
    getInfo: function() {
      var req = this.url + '/sales/info';
      this.$http.get(req).then(res => {
        this.info = res.data;
        console.log(this.info); // TODO: remove
      }, res => {
        console.log('Error during GET request. Url: ' + req);
      });
    },
    getPage: function(num) {
      console.log('Loading page ' + num);
      var req = this.url + '/sales/page/' + num;
      this.$http.get(req).then(res => {
        this.items = res.data;
      }, res => {
        console.log('Error during GET request. Url: ' + req);
      });
    },
  },
  watch: {
    '$route': function(to, from) {
      this.getPage(to.params.page);
    }
  },
  beforeMount: function() {
    this.getInfo();
    var page = this.$route.params.page || 1;
    console.log(page);
    this.getPage(page);
  }
}
</script>

<style>

</style>
