<template>
  <div>
    <div v-if="!user.loggedIn" class="m-2">
      Вы не авторизваны в системе.
      <router-link to="/login">Войти</router-link>
    </div>
    <b-container fluid v-if="user.loggedIn">
      <b-row class="mt-2">
        <b-col cols="12" md="6" lg="4" xl="3"
          class="mb-2" 
          v-for="shoplist in shoplists">
          <shoplist-card :shoplist="shoplist"></shoplist-card>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col>
          <b-btn variant="info" v-b-modal.new-shoplist>Добавить</b-btn>
          <b-modal
                 ref="modal"
                 id="new-shoplist"
                 title="Создать список покупок"
                 v-on:shown="focusInput"
                 v-on:ok="handleOk"
                 v-on:cancel="handleCancel">
            <b-form v-on:submit.stop.prevent="newShopList">
              <b-form-input 
                 ref="input"
                 type="text"
                 v-model="shoplist"
                 placeholder="Название списка покупок">
              </b-form-input>
            </b-form>
          </b-modal>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ShopListCard from './ShopListCard.vue'
import auth from '../auth'

export default {
  components: {
    'shoplist-card': ShopListCard
  },
  data: function() {
    return {
      shoplists: [],
      shoplist: '',
      user: auth.user
    }
  },
  methods: {
    newShopList: function() {
      this.$http.post('api/shoplist', { name: this.shoplist })
        .then(res => {
          this.shoplists.push(res.data);
        })
        .catch(error => console.log(error));
      this.shoplist = '';
      this.$refs.modal.hide();
    },
    handleOk: function(evt) {
      evt.preventDefault();
      this.newShopList();
    },
    handleCancel: function(evt) {
      this.shoplist = '';
    },
    focusInput: function(evt) {
      this.$refs.input.focus();
    }
  },
  created: function() {
    if(this.user.loggedIn) {
      console.log('get shoplists');
      this.$http.get('api/shoplist?mode=preview')
        .then(res => {
          this.shoplists = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
</script>

<style>
</style>
