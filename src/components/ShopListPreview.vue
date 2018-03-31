<template>
  <div>
    <b-container fluid>
      <b-row class="mt-2">
        <b-col cols="12" md="6" lg="4" xl="3"
          class="mb-2" 
          v-for="shoplist in shoplists">
          <shoplist-card :shoplist="shoplist"></shoplist-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ShopListCard from './ShopListCard.vue'

export default {
  components: {
    'shoplist-card': ShopListCard
  },
  data: function() {
    return {
      shoplists: []
    }
  },
  methods: {

  },
  created: function() {
    this.$http.get('api/shoplist?mode=preview')
      .then(res => {
        this.shoplists = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>

<style>
</style>
