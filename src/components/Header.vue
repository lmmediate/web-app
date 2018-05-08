<template>
  <div id="header">
    <b-navbar toggleable="md" type="dark" variant="primary">

      <b-navbar-brand to="/">gcSales</b-navbar-brand>

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item-dropdown text="Магазины" right>
            <b-dropdown-item v-for="shop in shops" exact
                             :to="{path: '/sales', query: {shop: shop.id, page: 1}}">
              {{shop.name}}
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item to="/shoplist">Список покупок</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!user.loggedIn" to="/login">
           <font-awesome-icon :icon="loginIcon" /> Вход/Регистрация
          </b-nav-item>
          <b-nav-item v-if="user.loggedIn" v-on:click="logout">
           <font-awesome-icon :icon="logoutIcon" />
            Выйти
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import auth from '../auth'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faSignInAlt, faSignOutAlt } from '@fortawesome/fontawesome-free-solid'

export default {
  components: {
    FontAwesomeIcon
  },
  computed: {
    loginIcon () {
      return faSignInAlt;
    },
    logoutIcon () {
      return faSignOutAlt;
    }
  },
  data: function() {
    return {
      shops: [],
      user: auth.user
    }
  }, 
  methods: {
    logout: function() {
      auth.logout();
    }
  },
  beforeMount: function() {
    this.$http.get('api/shops')
      .then(res => {
        this.shops = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>

<style>
</style>
