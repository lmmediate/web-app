<template>
  <div class="item">
    <div class="item-img">
      <img v-bind:src="item.imageUrl"/>
    </div>
    <div class="item-desc">
      <div class="item-name">{{displayName}}</div>
      <div class="item-price-container">
        <div class="item-new-price">{{item.newPrice}}&#8381;</div>
        <div class="item-old-price">{{item.oldPrice}}&#8381;</div>
      </div>
    </div>
    <b-btn class="remove-from-shoplist-btn" v-on:click="removeFromShopList">-</b-btn>
  </div>
</template>


<script>
export default {
  data: function() {
    return {
      maxNameLength: 80
    }
  },
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
  },
  computed: {
    displayName: function() {
      if(this.item.name.length <= this.maxNameLength){
        return this.item.name;
      } else {
        return this.item.name.slice(0, this.maxNameLength) + '...';
      }
    }
  }
}
</script>

<style scoped>
div.item {
  position: relative;
  width: 100%;
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
div.item-desc {
}
div.item-old-price {
  color: rgb(97, 97, 97);
  text-decoration: line-through;
}
div.item-new-price {
  font-size: 1.5em;
}
.remove-from-shoplist-btn {
  position: absolute;
  bottom: 5px;
  right: 5px;
  padding: 10px;
}
</style>