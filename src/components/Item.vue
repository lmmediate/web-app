<template>
  <div class="item">
    <div class="item-description" v-on:click="expandName">
      <div class="item-name">{{displayName}}</div>
      <div class="item-category">{{item.category}}</div>
    </div>
    <div class="item-img" v-show="showImage">
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
    <b-btn class="add-to-shoplist-btn" v-on:click="addToShopList">+</b-btn>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      maxNameLength: 80,
      showImage: true
    };
  },
  props: ['item'],
  methods: {
    expandName: function() {
      // TODO: always show image for small text
      this.showImage = !this.showImage;
      if(this.showImage) {
        this.maxNameLength = 80;
      } else {
        this.maxNameLength = this.item.name.length;
      }
    },
    addToShopList() {
      console.log(JSON.stringify(this.item));
    }
  },
  computed: {
    checkCondition: function() {
      return this.item.condition !== '-';
    },
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
  margin-bottom: 10px;
}
div.item-description:hover {
  /* TODO */
  background-color: coral;
  cursor: default;
}
div.item-name {
  margin-bottom: 5px;
}
div.item-category {
  color: rgb(97, 97, 97);
}
div.item-img > img {
  width: 100%;
  height: 100%;
}
div.item-img {
  margin: 0 auto;
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
.add-to-shoplist-btn {
  position: absolute;
  bottom: 5px;
  right: 5px;
  padding: 10px;
}
</style>
