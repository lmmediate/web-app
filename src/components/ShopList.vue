<template>
  <div>
  	<h2 style="margin: 10px; font-weight: lighter">Список покупок</h2>
    <shoplist-item 
      v-for="(item, index) in items" 
      v-bind:item="item" 
      v-bind:index="index"
      v-on:removeFromShopList="removeFromShopList($event)" >
    </shoplist-item>
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
  methods: {
    removeFromShopList: function(index) {
      this.items.splice(index, 1);
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
