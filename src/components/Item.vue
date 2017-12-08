<template>
  <div class="item">
    <div class="item-description">
      <div class="item-name">{{displayName}}</div>
      <div class="item-category">{{item.category}}</div>
    </div>
    <div class="item-img">
      <img v-bind:src="item.img_url"/>
    </div>
    <hr/>
    <div class="item-price-container">
      <div class="item-old-price">{{item.old_price}}&#8381;</div>
      <div class="item-new-price">{{item.new_price}}&#8381;</div>
      <div class="item-discount">{{item.discount}}%</div>
    </div>
    <div class="item-conditions">
      <div class="item-date">{{item.date}}</div>
      <div class="item-cond" v-if="checkCondition">{{item.condition}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    checkCondition: function() {
      return this.item.condition !== '-';
    },
    displayName: function() {
      var maxLength = 80;
      if(this.item.name.length < maxLength) {
        return this.item.name;
      } else {
        return this.item.name.slice(0, maxLength) + '...';
      }
    }
  }
}
</script>

<style>
hr {
  width: 90%;
  margin: 0 auto;
  border-top: 1px solid rgb(140, 140, 140);
}
div.item {
  position: relative;
  width: 280px;
  height: 460px;
  padding: 5px;
  background-color: white;
  box-shadow: 3px 3px 15px -5px rgba(0,0,0,0.5);
}
div.item:hover {
  outline: 1px solid black;
}
div.item-description {
  /*text-align: center;*/
}
div.item-category {
  margin-top: 5px;
  color: rgb(97, 97, 97);
}
div.item-img > img {
  width: 100%;
  height: 100%;
}
div.item-img {
  margin: 0 auto;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 250px;
  height: 250px;
}
div.item-price-container {
  margin: 0 auto;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 180px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}
div.item-old-price {
  color: rgb(97, 97, 97);
  text-decoration: line-through;
}
div.item-new-price {
  font-size: 1.5em;
}
div.item-conditions {
  position: absolute;
  bottom: 5px;
  left: 5px;
}
</style>
