<template>
  <div>
  	<h2 style="margin: 10px; font-weight: lighter">Список покупок</h2>
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="6" class="border">
          <b-row v-for="(item, index) in items" class="py-2">
            <b-col class="border">
              <shoplist-item
                v-bind:item="item" 
                v-bind:index="index"
                v-on:removeFromShopList="removeFromShopList($event)" >
              </shoplist-item>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
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
