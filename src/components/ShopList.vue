<template>
  <div>
    <div id="shoplist">
      <b-container fluid>
        <b-row class="mt-2">
          <b-col cols="12" md="6">
            <div v-for="(value, key) in shoplist.items">
              <h4 class="text-center" v-if="value.length">{{key}}</h4>
              <b-row v-for="(item, index) in value"
                     v-bind:key="item.id"
                     class="mb-2">
                <b-col>
                  <item-small
                     class="mx-auto"
                     v-bind:shoplistId="shoplist.id"
                     v-bind:item="item" 
                     v-bind:index="index"
                     btnText="-"
                     v-on:removeItem="removeItem($event)" >
                  </item-small>
                </b-col>
              </b-row>
            </div>
          </b-col>
          <b-col cols="12" md="6" >
            <b-row class="mb-2">
              <b-col >
                <div role="tablist">
                  <shoplist-custom-item
                     v-for="(item, index) in shoplist.customItems"
                     v-on:removeCustomItem="removeCustomItem($event)"
                     v-on:addItem="addItem($event)"
                     v-bind:key="item.id"
                     v-bind:index="index"
                     v-bind:item="item" >
                  </shoplist-custom-item>
                </div>
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col>
                <b-form inline @submit.stop.prevent="addCustomItem">
                  <b-form-input 
                         class="mr-2 mb-2 mb-sm-0"
                         type="text"
                         v-model="customItem"
                         placeholder="Название товара">
                  </b-form-input>
                  <b-btn variant="info" type="submit">Добавить</b-btn>
                </b-form>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <hr/>
        <b-row class="mb-2">
          <b-col class="text-center">
            <h4>Итого: {{totalSum}}</h4>
            <b-modal id="removeModal" @ok="deleteShopList" title="Удалить">
              <p class="my-2">Удалить список покупок?</p>
            </b-modal>
            <b-btn variant="info" v-b-modal.removeModal>
              Удалить список покупок
            </b-btn>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import ShopListCustomItem from './ShopListCustomItem.vue'
import ItemSmall from './ItemSmall.vue'
import groupArray from 'group-array'

export default {
  components: {
    'shoplist-custom-item': ShopListCustomItem,
    'app-header': Header,
    'item-small': ItemSmall
  },
  data: function() {
    return {
      shoplist: {},
      customItem: ''
    }
  },
  computed: {
    totalSum: function() {
      var total = 0;
      var items = this.shoplist.items;
      for (var shop in items) {
        if (items.hasOwnProperty(shop)) {
          items[shop].forEach(a => {
            total += a.newPrice;
          })
        }
      }
      return total.toFixed(2) + ' \u20BD';
    }
  },
  methods: {
    addItem: function(item) {
      this.$http.post(`api/shoplist/${this.shoplist.id}/additem?id=${item.id}`)
        .then(() => {
          if(!this.shoplist.items[item.shop.name]) {
            this.shoplist.items[item.shop.name] = [];
          } 
          this.shoplist.items[item.shop.name].push(item);
          // Bug with an update of reactive property
          // 'this.shoplist.items[item.shop.name]'
          this.$forceUpdate();
        });
    },
    removeItem: function(item) {
      this.$http.delete(`api/shoplist/${this.shoplist.id}/deleteitem?id=${item.id}`)
        .then(() => {
          this.shoplist.items[item.shop.name] =
            this.shoplist.items[item.shop.name].filter(i => i.id !== item.id);
          this.$forceUpdate();
        });
    },
    addCustomItem: function() {
      // TODO: handle string of whitespaces
      if(this.customItem) {
        this.$http.post(`api/shoplist/${this.shoplist.id}/additem?custom=${this.customItem}`)
         .then(res => {
           var customItem = res.data;
           customItem.matchingItems = groupArray(customItem.matchingItems,
             'shop.name');
           this.shoplist.customItems.push(customItem);
           this.$forceUpdate();
         })
         .catch(error => console.log(error));
      }
      this.customItem = '';
    },
    removeCustomItem: function(item) {
      this.$http.delete(`api/shoplist/${this.shoplist.id}/deleteitem?customid=${item.id}`)
        .then(() => {
          this.shoplist.customItems =
            this.shoplist.customItems.filter(i => i.id !== item.id);
          this.$forceUpdate();
        });
    },
    deleteShopList: function() {
      this.$http.delete(`api/shoplist/${this.shoplist.id}`)
        .then(() => {
          this.$router.push('/shoplist');
        });
    }
  },
  created: function() {
    this.$http.get(`api/shoplist/${this.$route.params['id']}`)
      .then(res => {
        this.shoplist = res.data;
        this.shoplist.items = groupArray(this.shoplist.items, 'shop.name');
        this.shoplist.customItems = this.shoplist.customItems.map(item => {
          item.matchingItems = groupArray(item.matchingItems, 'shop.name');
          return item;
        });
      })
      .catch(error => {
        console.log(error);
        this.$router.push('/login');
      });
  }
}
</script>
