<template>
  <div>
    <div id="shoplist">
      <b-container fluid>
        <b-row class="mt-2">
          <b-col cols="12" md="6">
            <div v-for="(value, key) in shoplist.items">
              <h4 v-if="value.length">{{key}}</h4>
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
              <b-col>
                <b-btn v-b-modal.add-custom>Добавить</b-btn>
                <b-modal
                     ref="modal"
                     id="add-custom"
                     title="Добавить в список покупок"
                     v-on:shown="focusInput"
                     v-on:ok="handleOk"
                     v-on:cancel="handleCancel">
                  <b-form v-on:submit.stop.prevent="addCustomItem">
                    <b-form-input 
                       ref="input"
                       type="text"
                       v-model="customItem"
                       placeholder="Название товара">
                    </b-form-input>
                  </b-form>
                </b-modal>
              </b-col>
            </b-row>
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
  methods: {
    addItem: function(item) {
      this.$http.post(`api/shoplist/${this.shoplist.id}/add?id=${item.id}`)
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
      this.$http.delete(`api/shoplist/${this.shoplist.id}/delete?id=${item.id}`)
        .then(() => {
          this.shoplist.items[item.shop.name] =
            this.shoplist.items[item.shop.name].filter(i => i.id !== item.id);
          this.$forceUpdate();
        });
    },
    handleOk: function(evt) {
      evt.preventDefault();
      this.addCustomItem();
    },
    handleCancel: function(evt) {
      this.customItem = '';
    },
    focusInput: function(evt) {
      this.$refs.input.focus();
    },
    addCustomItem: function() {
      // TODO: handle string of whitespaces
      if(this.customItem) {
        this.$http.post(`api/shoplist/${this.shoplist.id}/add?custom=${this.customItem}`)
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
      this.$refs.modal.hide();
    },
    removeCustomItem: function(item) {
      this.$http.delete(`api/shoplist/${this.shoplist.id}/delete?customid=${item.id}`)
        .then(() => {
          this.shoplist.customItems =
            this.shoplist.customItems.filter(i => i.id !== item.id);
          this.$forceUpdate();
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
