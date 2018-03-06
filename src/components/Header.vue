<template>
  <div id="header">
    <b-navbar toggleable="md" type="dark" variant="dark">

      <b-navbar-brand to="/">ShopDiscounts</b-navbar-brand>

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/discounts">Акции</b-nav-item>
          <b-nav-item to="/shoplist">Список покупок</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!isLoggedIn" to="/login">Войти</b-nav-item>
          <b-nav-item v-if="isLoggedIn" v-on:click="logout">Выйти</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isLoggedIn: false
    }
  }, 
  methods: {
    logout: function() {
      localStorage.removeItem('auth');
      console.log('logout!');
      this.isLoggedIn = false;
      this.$router.push('/');
    }
  },
  beforeMount: function() {
    this.$http.get('api/shoplist', { 
      headers: {
        'Authorization': localStorage.getItem('auth')
      }
    })
      .then(() => {
        this.isLoggedIn = true;
      })
      .catch(() => {
        this.isLoggedIn = false; 
      });
  }
}
</script>

<style>
</style>
