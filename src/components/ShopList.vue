<template>
  <div>
    <app-header></app-header>
    <div id="shoplist">
      <h2 style="margin: 10px; font-weight: lighter">Список покупок</h2>
      <b-container fluid>
        <b-row>
          <b-col cols="12" md="6" >
            <b-row v-for="(item, index) in items"
                   v-bind:key="item.id"
                   class="py-2">
              <b-col >
                <shoplist-item
                     v-bind:item="item" 
                     v-bind:index="index"
                     v-on:removeFromShopList="removeFromShopList($event)" >
                </shoplist-item>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" md="6" >
            <b-row class="py-2">
              <b-col >
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
                     placeholder="Название товара"></b-form-input>
                  </b-form>
                </b-modal>
              </b-col>
            </b-row>
            <b-row class="py-2">
              <b-col >
                <div role="tablist">
                  <shoplist-custom-item
                     v-for="(item, index) in customItems"
                     v-on:removeCustomItem="removeCustomItem($event)"
                     v-bind:key="item.id"
                     v-bind:index="index"
                     v-bind:item="item">
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
import ShopListItem from './ShopListItem.vue'
import ShopListCustomItem from './ShopListCustomItem.vue'

export default {
  components: {
    'shoplist-item': ShopListItem,
    'shoplist-custom-item': ShopListCustomItem,
    'app-header': Header
  },
  data: function() {
    return {
      items: [],
      customItems: [],
      customItem: ''
    }
  },
  methods: {
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
       this.$http.post('api/shoplist/add?custom=' + this.customItem, {}, {
         headers: {
           'Authorization': localStorage.getItem('auth')
         }
       })
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
    this.$http.get('api/shoplist', { 
      headers: {
        'Authorization': localStorage.getItem('auth')
      }
    })
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
