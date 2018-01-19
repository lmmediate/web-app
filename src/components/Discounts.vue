<template>
  <div id="discounts">
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="6" lg="4" class="py-2">
          <b-form-input type="search" v-model="searchString" placeholder="Поиск..."></b-form-input>
        </b-col>
      </b-row> 
      <b-row>
        <b-col 
          cols="12" md="6" lg="4" xl="3"
          class="py-2 border"
          v-for="item in filteredItems" 
          v-bind:key="item.id">
            <item class="mx-auto" v-bind:item="item"></item>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="py-2">
          <div id="pagination">
            <b-pagination-nav
              use-router
              base-url="/discounts/" 
              v-bind:number-of-pages="info.numPages" 
              v-model="currentPage"
	      v-show="!searchString"/>
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
      currentPage: 1,
      searchString: ''
    }
  },
  computed: {
      filteredItems: function() {
        if(!this.searchString) {
          var lowerBound = this.info.itemsPerPage * (this.currentPage - 1);
          var upperBound = this.info.itemsPerPage * this.currentPage;
          return this.items.slice(lowerBound, upperBound);
        }

        return this.items.filter(value => {
          return value.name.toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1;
        });
      }
  },
  methods: {
    getPage: function(num) {
      this.filteredItems = 
      this.searchString = '';
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
        // Ensure page load
        this.currentPage = +this.$route.params.page;
      });
  }
}
</script>

<style>
</style>
