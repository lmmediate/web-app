<template>
  <div id="discounts">
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
      // FIXME: mock
      info: { numPages: 5 },
      items: require('../../../server/crawler/out/sales.json').slice(0, 20),
    }
  },
  methods: {
    getInfo: function() {
      this.$http.get('sales/info').then(res => {
        this.info = res.data;
        console.log(this.info); // TODO: remove
      }, res => {
        console.log('Error during GET request. Url: ' + req);
      });
    },
    getPage: function(num) {
      console.log('Loading page ' + num);
      this.info.currentPage = +num; // cast to number

      this.$http.get('sales/page/' + num).then(res => {
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
    this.getPage(page);
  }
}
</script>

<style>
</style>
