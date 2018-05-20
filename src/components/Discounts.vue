<template>
  <div id="discounts">

    <!--Shoplist chooser modal-->
    <b-modal ref="modal"
             hide-footer
             title="Добавить в список покупок"
             @hidden="hiddenModalHandler">
      <!--If user is not logged in, show login prompt-->
      <div v-if="!user.loggedIn">
        <p>Авторизуйтесь, чтобы добавить в список покупок.</p>
        <router-link to="/login">Войти</router-link>
      </div>
      <!--If user is logged in, show a list of shoplists to add item to-->
      <b-list-group v-if="user.loggedIn">
        <b-list-group-item button
                           @click="addToShopList(shoplist)"
                           v-for="shoplist in shoplists"
                           :key="shoplist.id">
          {{shoplist.name}}
        </b-list-group-item>
      </b-list-group>
    </b-modal>

    <!--Container with main content-->
    <b-container fluid>

      <!--TODO: temp categories view-->
      <b-row class="mt-2">
        <b-col>
          <b-nav pills>
            <b-nav-item :to="'/sales/' + shop" exact>Все категории</b-nav-item>
            <b-nav-item v-for="cat in categories"
                        :to="{path:'/sales/' + shop, query: {category: cat}}"
                        exact>
              {{cat}}
            </b-nav-item>
          </b-nav>
        </b-col>
      </b-row>

      <!--Row of item cards-->
      <b-row class="mt-2">
        <b-col class="mb-2"
               cols="12" md="6" lg="4" xl="3"
               v-for="item in items"
               :key="item.id">
          <item class="mx-auto"
                @addItem="addItemHandler($event)"
                btnText="+"
                :item="item"/>
        </b-col>
      </b-row>
      <!--Row containing "load more" button-->
      <b-row class="mb-2">
        <b-col class="text-center"
               v-if="items.length && items.length < itemsTotal">
          <b-btn id="load-more-btn"
                 variant="info"
                 @click="downloadItems">
            Загрузить еще
          </b-btn>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
  import Item from './Item.vue'
  import ItemSmall from './ItemSmall.vue'
  import auth from '../auth'

  export default {
    components: {
      Item,
      ItemSmall
    },
    props: ['shop', 'category'],
    data: function () {
      return {
        categories: [],
        page: 1,
        items: [],
        itemsTotal: 0,
        shoplists: [],
        itemToAdd: null,
        user: auth.user
      }
    },
    computed: {
      shopId: function () {
        // TODO: maybe not localstorage?
        // Extract shopId from shop object using its alias
        return JSON.parse(localStorage.getItem('shops')).find(e => e.alias === this.shop).id;
      }
    },
    methods: {
      downloadItems: function () {
        var req;
        if (this.category) {
          req = `api/shops/${this.shopId}?category=${this.category}&page=${this.page}`;
        } else {
          req = `api/shops/${this.shopId}?page=${this.page}`;
        }

        this.$http.get(req)
          .then(res => {
            this.itemsTotal = res.data.count;
            this.items = this.items.concat(res.data.rows);
            // Increase page after download completed
            this.page++;
          });
      },
      downloadShop: function () {
        this.$http.get(`api/shops/${this.shopId}/categories`)
          .then(res => {
            this.categories = res.data;
          });
        this.downloadItems();
      },
      downloadShopLists: function () {
        this.$http.get('api/shoplist')
          .then(res => {
            this.shoplists = res.data
          });
      },
      // Add item to shoplist handlers chain
      // =========================================================================================================== //
      // This method is called first, when item "+" button is clicked
      addItemHandler: function (item) {
        console.log("addItemHandler")
        this.$refs.modal.show();
        this.itemToAdd = item;
      },
      // This method is called second when a shoplist to add is chosen
      addToShopList: function (shoplist) {
        this.$http.post(`api/shoplist/${shoplist.id}/additem?id=${this.itemToAdd.id}`)
          .catch(error => {
            console.log(error);
          });
        this.$refs.modal.hide();
      },
      // This method is called third
      // It resets variables after event is handled
      hiddenModalHandler: function () {
        console.log("hiddenModalHandler")
        this.itemToAdd = null;
      }
      // =========================================================================================================== //
    },
    watch: {
      // Watches route query params and
      // downloads new shop or category
      // =========================================================================================================== //
      '$route.query': function (oldQuery, newQuery) {
        // Reset variables before download
        this.page = 0;
        this.items = [];
        this.downloadItems();
      }
    },
    created: function () {
      // this.downloadItems();
      this.downloadShop();
      if (this.user.loggedIn) {
        this.downloadShopLists();
      }
    }
  }
</script>

