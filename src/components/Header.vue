<template>
  <b-navbar toggleable="md" type="dark" variant="primary" sticky>

    <b-navbar-brand to="/">gcSales</b-navbar-brand>

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item to="/sales">
          <i class="fa fa-shopping-bag fa-fw" aria-hidden="true"></i>
          {{names.sales}}
        </b-nav-item>
        <b-nav-item to="/shoplist">
          <i class="fa fa-sticky-note fa-fw" aria-hidden="true"></i>
          {{names.shoplist}}
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="!user.loggedIn" to="/login">
          <i class="fa fa-sign-in fa-fw" aria-hidden="true"></i>
          {{names.login}}
        </b-nav-item>
        <b-nav-item v-if="user.loggedIn" v-on:click="logout">
          <i class="fa fa-sign-out fa-fw" aria-hidden="true"></i>
          {{names.logout}}
        </b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
  import auth from '../auth'

  export default {
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
