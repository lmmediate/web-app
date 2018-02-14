<template>
  <div class="item">
    <div class="item-img">
      <img v-bind:src="item.imageUrl"/>
    </div>
    <div class="item-name">{{item.name}}</div>
    <div class="item-price-container">
      <div class="item-old-price">{{item.oldPrice}}&#8381;</div>
      <div class="item-new-price">{{item.newPrice}}&#8381;</div>
    </div>
    <b-btn class="remove-from-shoplist-btn" v-on:click="removeFromShopList">-</b-btn>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
    index: {
      type: Number 
    }
  },
  methods: {
    removeFromShopList: function() {
      this.$http.delete('shoplist/' + this.item.id)
        .then(res => {
          this.$emit('removeFromShopList', this.index);
        });
    }
  }
}
</script>

<style scoped>
div.item {
  width: 450px;
  height: 150px;
  padding: 5px;
  background-color: white;
  box-shadow: 3px 3px 15px -5px rgba(0,0,0,0.5);
}
div.item-img {
  float: left;
  margin: 0 auto;
  margin-right: 10px;
  width: 130px;
  height: 130px;
}
div.item-img > img {
  width: 100%;
  height: 100%;
}
</style>
