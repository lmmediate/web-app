<template>
  <div id="header">
    <b-navbar toggleable="md" type="dark" variant="primary">

      <b-navbar-brand to="/">ShopDiscounts</b-navbar-brand>

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item-dropdown text="Акции" right>
            <b-dropdown-item v-for="shop in shops"
                             :to="'/shop/' + shop.id">
              {{shop.name}}
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item to="/discounts"></b-nav-item>
          <b-nav-item to="/shoplist">Список покупок</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!isLoggedIn" to="/login">
            Войти
          </b-nav-item>
          <b-nav-item v-if="isLoggedIn" v-on:click="logout">
            Выйти
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isLoggedIn: false,
      shops: []
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
    this.$http.get('api/shops')
      .then(res => {
        this.shops = res.data;
      })
      .then(() => {
        // TODO: Make up another check login way
        if(localStorage.getItem('auth')) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false; 
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>

<style>
</style>
