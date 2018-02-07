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
      </b-collapse>

    </b-navbar>
  </div>
</template>

<script>
export default {
}
</script>

<style>
</style>
