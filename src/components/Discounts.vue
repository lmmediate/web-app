<template>
  <div>
    <b-container fluid>
      <b-row class="mt-2">
        <b-col cols="12" class="mb-2">
          <b-nav pills>
            <b-nav-item :to="{path: 'sales', query: {shop: shopId, page: 1}}" exact>
              Все товары
            </b-nav-item>
            <b-nav-item v-for="category in categories" exact
              :to="{path: '/sales', query: {shop: shopId, category: category, page: 1}}">
              {{category}}
            </b-nav-item>
          </b-nav>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="6" lg="4" xl="3"
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
               :link-gen="linkGen"
               :number-of-pages="numPages" 
               v-model="currentPage" />
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
  props: [ 'shopId', 'currentCategory', 'currentPage' ],
  data: function() {
    return {
      categories: [],
      items: [],
      shoplists: [],
      numPages: 0
    }
  },
  methods: {
    linkGen: function(pageNum) {
      if(this.currentCategory) {
        return {
          path: '/sales',
          query: {
            shop: this.shopId,
            category: this.currentCategory,
            page: pageNum
          }
        }
      } else {
        return {
          path: '/sales',
          query: {
            shop: this.shopId,
            page: pageNum
          }
        }
      }
    },
    downloadItems: function() {
      console.log('downloadItems');
      var shopId = this.shopId || 1;
      var page = this.currentPage || 1;
      var category = this.currentCategory || '';
      this.$http.get(`api/shops/${shopId}?category=${category}&page=${page}`)
        .then(res => {
          this.items = res.data.rows;
          this.numPages = res.data.numPages;
        });
    },
    downloadShop: function() {
      console.log('downloadShop');
      var req = 'api/shops/' + this.shopId + '/categories';
      this.$http.get(req)
        .then(res => {
          this.categories = res.data;
        });
      this.downloadItems();
    },
    getShopLists: function() {
      this.$http.get('api/shoplist')
        .then(res => {
          this.shoplists = res.data
        });
    }
  },
  watch: {
    '$route': function(newRoute, oldRoute) {
      console.log('change route');
      console.log('category ' + this.currentCategory);
      if(oldRoute.query.shop !== newRoute.query.shop) {
        this.downloadShop();
      } else {
        this.downloadItems();
      }
      console.log(this.currentPage);
    }
  },
  created: function() {
    this.downloadShop();
    console.log(this.currentPage);
    // TODO: Make up another check login way
    if(localStorage.getItem('auth')) {
      this.getShopLists();
    }
  }
}
</script>

