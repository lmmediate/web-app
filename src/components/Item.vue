<template>
  <div class="item">
    <div class="item-description" v-on:click="expandName">
      <div class="item-name">{{displayName}}</div>
      <div class="item-category">{{item.category}}</div>
    </div>
    <div class="item-img" v-show="showImage">
      <b-img v-bind:src="item.imageUrl" fluid/>
    </div>
    <hr/>
    <div class="item-price-container">
      <div class="item-old-price">{{parseOldPrice}}</div>
      <div class="item-new-price">{{parseNewPrice}}</div>
      <div class="item-discount">{{parseDiscount}}</div>
    </div>
    <div class="item-conditions">
      <div class="item-date">{{item.dateIn}} - {{item.dateOut}}</div>
      <div class="item-cond">{{parseCondition}}</div>
    </div>
    <b-btn variant="info" class="add-btn" @click="addItem">
      +
    </b-btn>
  </div>
</template>

<script>
  export default {
    props: ['item'],
    data: function () {
      return {
        maxNameLength: 80,
        showImage: true
      };
    },
    methods: {
      expandName: function () {
        // TODO: always show image for small text
        this.showImage = !this.showImage;
        if (this.showImage) {
          this.maxNameLength = 80;
        } else {
          this.maxNameLength = this.item.name.length;
        }
      },
      addItem: function (shoplistId) {
        this.$emit('addItem', this.item);
      }
    },
    computed: {
      displayName: function () {
        if (this.item.name.length <= this.maxNameLength) {
          return this.item.name;
        } else {
          return this.item.name.slice(0, this.maxNameLength) + '...';
        }
      },
      parseCondition: function () {
        var cond = this.item.condition;
        return cond === '-' ? '' : cond;
      },
      parseDiscount: function () {
        var disc = +this.item.discount;
        if (Number.isNaN(disc)) {
          return '';
        } else {
          return disc + '%';
        }
      },
      parseOldPrice: function () {
        return this.item.oldPrice + '\u20BD';
      },
      parseNewPrice: function () {
        return this.item.newPrice + '\u20BD';
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../assets/scss/item';
</style>
