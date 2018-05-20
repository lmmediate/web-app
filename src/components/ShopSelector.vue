<template>
  <b-container fluid>
    <b-row class="mt-2">
      <b-col cols="12" md="6" lg="4" xl="3"
             v-for="shop in shops" :key="shop.id">
        <b-card>
          <p class="card-text">
            <router-link :to="'/sales/' + shop.alias">{{shop.name}}</router-link>
          </p>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    data: function () {
      return {
        shops: JSON.parse(localStorage.getItem('shops'))
      }
    },
  }
</script>
