<template>
  <div>
    <app-header></app-header>
    <div id="shoplist">
      <b-container fluid>
        <b-row class="mt-2">
          <b-col cols="12" md="6">
            <b-row v-for="(item, index) in items"
                   v-bind:key="item.id"
                   class="mb-2">
              <b-col>
                <item-small
                     class="mx-auto"
                     v-bind:item="item" 
                     v-bind:index="index"
                     btnText="-"
                     v-on:removeFromShopList="removeFromShopList($event)" >
                </item-small>
              </b-col>
            </b-row>
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
                     v-for="(item, index) in customItems"
                     v-on:removeCustomItem="removeCustomItem($event)"
                     v-on:addToShopList="addToShopList($event)"
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

export default {
  components: {
    'shoplist-custom-item': ShopListCustomItem,
    'app-header': Header,
    'item-small': ItemSmall
  },
  data: function() {
    return {
      items: [],
      customItems: [],
      customItem: ''
    }
  },
  methods: {
    addToShopList: function(item) {
      this.items.push(item);
    },
    removeFromShopList: function(index) {
      this.items.splice(index, 1);
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
       this.$http.post('api/shoplist/add?custom=' + this.customItem)
         .then(res => {
           this.customItems.push(res.data);
         })
         .catch(error => alert(error));
      }
      this.customItem = '';
      this.$refs.modal.hide();
    },
    removeCustomItem: function(index) {
      this.customItems.splice(index, 1);
    }
  },
  beforeMount: function() {
    this.$http.get('api/shoplist')
      .then(res => {
        this.items = res.data.items;
        this.customItems = res.data.customItems;
      })
      .catch(error => {
        this.$router.push('/login');
      });
  }
}
</script>
