<template>
  <div>
    <b-container fluid>
      <!-- <b-row class="mt-2"> -->
      <!--   <b-col cols="12" md="6" lg="4"> -->
      <!--     <b-form-input type="search" v-model="searchString" placeholder="Поиск..."></b-form-input> -->
      <!--   </b-col> -->
      <!-- </b-row> --> 
      <b-row class="mt-2">
        <b-col cols="12" class="mb-2">
          Category: {{activeCategory}}
          <b-form-radio-group buttons 
                         button-variant="outline-primary"
                         v-model="activeCategory">
            <b-form-radio value="">Все товары</b-form-radio>
            <b-form-radio v-for="category in categories"
                          :value="category">
              {{category}}
            </b-form-radio>
          </b-form-radio-group>
        </b-col>
      </b-row>
      <b-row> <b-col 
          cols="12" md="6" lg="4" xl="3"
          class="mb-2"
          v-for="item in items" 
          :key="item.id">
          <item :shoplists="shoplists" :item="item" class="mx-auto"></item>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mb-2">
          <div id="pagination">
            <b-pagination-nav
              use-router
              :base-url="paginationBaseUrl" 
              :number-of-pages="numPages" 
              v-model="currentPage">
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
      categories: [],
      items: [],
      activeCategory: '',
      currentPage: 1,
      searchString: '',
      paginationBaseUrl: '',
      shoplists: []
    }
  },
  methods: {
    downloadItems: function(shopId, page, category) {
      page = page || 1;
      category = category || '';
      this.$http.get(`api/shops/${shopId}?category=${category}&page=${page}`)
        .then(res => {
          this.items = res.data.rows;
          if(category) {
            this.paginationBaseUrl = `/shop/${shopId}/`;
          }
          else {
            this.paginationBaseUrl = `/shop/${shopId}/`;
          }
          this.numPages = res.data.numPages;
          this.currentPage = page;
        });
    },
    downloadShop: function(shopId) {
      this.$http.get(`api/shops/${shopId}/categories`)
        .then(res => {
          this.categories = res.data;
        });
      this.downloadItems(shopId);
    },
    getShopLists: function() {
      this.$http.get('api/shoplist')
        .then(res => {
          this.shoplists = res.data
        });
    }
  },
  watch: {
    '$route.params.shopId': function(shopId) {
      this.downloadShop(shopId);
    },
    'currentPage': function(currentPage) {
      this.downloadItems(this.$route.params.shopId, currentPage);
    },
    'activeCategory' : function(activeCategory) {
      this.downloadItems(this.$route.params.shopId, 1, activeCategory);
    }
  },
  beforeMount: function() {
    var shopId = this.$router.currentRoute.params['shopId'];
    this.downloadShop(shopId);
    // TODO: Make up another check login way
    if(localStorage.getItem('auth')) {
      this.getShopLists();
    }
  }
}
</script>

