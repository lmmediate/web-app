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
      info: {},
      items: [] 
    }
  },
  methods: {
    getInfo: function() {
      this.$http.get('sales/info').then(res => {
        this.info = res.data;
      }, res => {
        console.log('Error during GET request. Url: ' + req);
      });
    },
    getItems: function() {
      this.$http.get('sales').then(res => {
        this.items = res.data;
      }, res => {
        console.log('Error during GET request. Url: ' + req);
      });
    },
  },
  beforeMount: function() {
    this.getInfo();
    this.getItems();
  }
}
</script>

<style>
</style>
