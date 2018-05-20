<template>
  <b-navbar toggleable="md" type="dark" variant="primary" sticky>

    <b-navbar-brand to="/">gcSales</b-navbar-brand>

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item to="/sales">{{names.sales}}</b-nav-item>
        <b-nav-item to="/shoplist">{{names.shoplist}}</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="!user.loggedIn" to="/login">
          <font-awesome-icon :icon="loginIcon"/>
          {{names.login}}
        </b-nav-item>
        <b-nav-item v-if="user.loggedIn" v-on:click="logout">
          <font-awesome-icon :icon="logoutIcon"/>
          {{names.logout}}
        </b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
  import auth from '../auth'
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import {faSignInAlt, faSignOutAlt, faShoppingCartAlt} from
      '@fortawesome/fontawesome-free-solid'

  export default {
    components: {
      FontAwesomeIcon
    },
    computed: {
      loginIcon: function () {
        return faSignInAlt;
      },
      logoutIcon: function () {
        return faSignOutAlt;
      },
      shoplistIcon: function () {
        return faShoppingCartAlt
      }
    },
    data: function () {
      return {
        shops: [],
        currentShop: '',
        categories: [],
        currentCategory: '',
        names: {
          sales: 'Акции',
          shoplist: 'Список покупок',
          login: 'Вход/Регистрация',
          logout: 'Выйти'
        },
        user: auth.user
      }
    },
    methods: {
      setCurrentShop: function (shop) {
        this.currentShop = shop.name;
      },
      setCurrentCategory: function (category) {
        this.currentCategory = category;
      },
      logout: function () {
        auth.logout();
      }
    },
    beforeMount: function () {
      // Get shops
      this.$http.get('api/shops')
        .then(res => {
          this.shops = res.data;
          this.currentShop = this.shops[0];
          // Get categories for current shop
          return this.$http.get(`api/shops/${this.currentShop.id}/categories`);
        })
        .then(res => {
          this.categories = res.data;
          this.currentCategory = this.names.allCategories;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
</script>

<style>
</style>
