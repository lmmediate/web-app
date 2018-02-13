<template>
  <div class="shoplist-item">
    <div class="shoplist-item-img">
      <img v-bind:src="item.imageUrl"/>
    </div>
    <div class="shoplist-item-name">{{displayName}}</div>
    <div class="shoplist-item-price-container">
      <div class="shoplist-item-old-price">{{item.oldPrice}}&#8381;</div>
      <div class="shoplist-item-new-price">{{item.newPrice}}&#8381;</div>
    </div>
    <b-btn class="remove-from-shoplist-btn" v-on:click="removeFromShopList">e</b-btn>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    removeFromShopList: function() {

    }
  }
}
</script>
