<template>
  <div>
    <app-header></app-header>
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="6" lg="4" class="my-2">
          <b-form-input type="search" v-model="searchString"
            placeholder="Поиск..."></b-form-input>
        </b-col>
      </b-row> 
      <b-row>
        <b-col 
          cols="12" md="6" lg="4" xl="3"
          class="mb-2"
          v-for="item in filteredItems" 
          v-bind:key="item.id">
            <item class="mx-auto" v-bind:item="item"></item>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mb-2">
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
import Header from './Header.vue'
import Item from './Item.vue'

export default {
  components: {
    'item': Item,
    'app-header': Header
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
  beforeMount: function() {
    this.$http.get('api/sales/info')
      .then(res => {
        this.info = res.data;
        return this.$http.get('api/sales');
      })
      .then(res => {
        this.items = res.data;
        // Ensure page load
        var page = +this.$route.params.page;
        if(page <= 0) {
          page = 1
        } else if(page > this.info.numPages) {
          page = this.info.numPages
        }
        this.currentPage = page;
      });
  }
}
</script>

<style>
</style>
