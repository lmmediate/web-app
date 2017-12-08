<template>
  <div class="item">
    <div class="item-name">{{item.name}}</div>
    <div class="item-cat">{{item.category}}</div>
    <div class="item-img"><img v-bind:src="item.img_url"/></div>
    <div class="item-old-price">{{item.old_price}}</div>
    <div class="item-new-price">{{item.new_price}}</div>
    <div class="item-discount">{{item.discount}}</div>
    <div class="item-date">{{item.date}}</div>
    <div class="item-cond">{{item.condition}}</div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {
    }
  }
}
</script>

<style>
div.item {
  border: 2px solid black;
  padding-left: 5px;
  padding-top: 5px;
  height: 460px;
  width: 280px;
}
div.item-cat {
  margin-top: 5px;
  color: rgb(97, 97, 97);
}
div.item-img > img {
  width: 100%;
  height: 100%;
}
div.item-img {
  margin: 0 auto;
  width: 250px;
  height: 250px;
}
</style>
