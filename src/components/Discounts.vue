<template>
  <div id="discounts">
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="6" lg="4">
          <b-form-input type="search" placeholder="Поиск..."></b-form-input>
        </b-col>
      </b-row> 
      <b-row>
        <b-col 
          cols="12" md="6" lg="4" xl="3"
          class="py-2 border"
          v-for="item in items"
          v-bind:key="item.name">
            <item class="mx-auto" v-bind:item="item" v-bind:key="item.id"></item>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <pagination v-bind:info="info"></pagination>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Pagination from './Pagination.vue'
import Item from './Item.vue'

export default {
  components: {
    'pagination': Pagination,
    'item': Item'
  },
  data: function() {
    return {
      info: {},
      items: [] 
    }
  },
  methods: {
    getInfo: function() {
      var req = 'sales/info';
      this.$http.get(req).then(res => {
        this.info = res.data;
      }, res => {
        console.log('Error during GET request. Url: ' + req);
      });
    },
    getItems: function() {
      var req = 'sales';
      this.$http.get(req).then(res => {
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
