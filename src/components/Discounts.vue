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
          v-for="item in filteredItems"
          v-bind:key="item.name">
            <item class="mx-auto" v-bind:item="item" v-bind:key="item.id"></item>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div id="pagination">
            <b-pagination-nav
              use-router
              base-url="/discounts/" 
              v-bind:number-of-pages="info.numPages" 
              v-model="currentPage" />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Item from './Item.vue'

export default {
  components: {
    'item': Item
  },
  data: function() {
    return {
      info: {},
      items: [],
      filteredItems: [],
      currentPage: 1
    }
  },
  methods: {
    getPage: function(num) {
      this.filteredItems = 
        this.items.slice(this.info.itemsPerPage * (+num - 1), 
          this.info.itemsPerPage * +num);
	console.log(this.items);
        console.log(this.filteredItems);
    }
  },
  beforeMount: function() {
    this.$http.get('sales/info')
      .then(res => {
        this.info = res.data;
        return this.$http.get('sales');
      })
      .then(res => {
        this.items = res.data;
        this.getPage(1);
      });
  },
  watch: {   
      '$route': function(to, from) {
      this.getPage(to.params.page);
    }
  },
}
</script>

<style>
</style>
