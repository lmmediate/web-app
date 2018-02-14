<template>
  <div>
  	<h2 style="margin: 10px; font-weight: lighter">Список покупок</h2>
    <shoplist-item v-for="item in items" v-bind:item="item"></shoplist-item>
  </div>
</template>

<script>
import ShopListItem from './ShopListItem.vue'

export default {
  components: {
    'shoplist-item': ShopListItem
  },
  data: function() {
    return {
      items: [] 
    }
  },
  beforeMount: function() {
    this.$http.get('shoplist')
      .then(res => {
        this.items = res.data;
      });
  }
}
</script>
