<template>
  <div>
    <app-header></app-header>
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="6" lg="4" class="my-2">
          <b-form-input type="search" v-model="searchString" placeholder="Поиск..."></b-form-input>
        </b-col>
      </b-row> 
      <b-row>
        <b-col cols="12" class="mb-2">
          <b-form-checkbox-group buttons v-model="selectedCategories" >
            <b-form-checkbox class="cat-btn m-1"
                             v-for="category in info.categories"
                             v-bind:value="category">
              {{category}}
            </b-form-checkbox>
          </b-form-checkbox-group>
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
              v-bind:base-url="paginationBaseUrl" 
              v-bind:number-of-pages="info.numPages" 
              v-model="currentPage"
              v-show="!searchString && !selectedCategories.length"/>
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
      selectedCategories: [],
      currentPage: 1,
      searchString: '',
      paginationBaseUrl: ''
    }
  },
  computed: {
    filteredItems: function() {
      if(this.searchString && this.selectedCategories.length) {
        return this.items.filter(value => {
          var cat = this.selectedCategories.indexOf(value.category) !== -1;
          var search = value.name.toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1;
          return search && cat;
        });
      } else if(this.searchString) {
        return this.items.filter(value => {
          return value.name.toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1;
        });
      } else if(this.selectedCategories.length) {
        return this.items.filter(value => {
          return this.selectedCategories.indexOf(value.category) !== -1;
        });
      } else {
        var lowerBound = this.info.itemsPerPage * (this.currentPage - 1);
        var upperBound = this.info.itemsPerPage * this.currentPage;
        return this.items.slice(lowerBound, upperBound);
      }
    }
  },
  methods: {
    loadShop: function(shop) {
      this.paginationBaseUrl = `/discounts/${shop}/`;
      this.$http.get(`api/shops/${shop}/info`)
        .then(res => {
          this.info = res.data;
          console.log(this.info.categories);
          return this.$http.get(`api/shops/${shop}`);
        })
        .then(res => {
          this.items = res.data;
          // Ensure page load
          var page = +this.$route.params['page'];
          if(page <= 0) {
            page = 1
          } else if(page > this.info.numPages) {
            page = this.info.numPages
          }
          this.currentPage = page;
        });
    }
  },
  watch: {
    '$route.params.shop': function(shop) {
      this.loadShop(shop);
    }
  },
  beforeMount: function() {
    var shop = this.$router.currentRoute.params['shop'];
    this.loadShop(shop);
  }
}
</script>

<style scoped>
.cat-btn {
  border-radius: 0.25rem;
}
.btn-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
