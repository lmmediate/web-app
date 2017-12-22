<template>
  <div>
    <pagination v-bind:info="info"></pagination>
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
      info: { numPages: 5 }, // FIXME: mock
      // info: { },
      items: [ ],
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
    this.getPage(page);
  }
}
</script>

<style>

</style>
