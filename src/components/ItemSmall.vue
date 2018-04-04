<template>
  <div class="item">
    <div class="item-main-info">
      <div class="item-img">
        <b-img v-bind:src="item.imageUrl" fluid />
      </div>
      <div class="item-description">
        <div class="item-name">{{displayName}}</div>
        <div class="item-category">{{item.category}}</div>
        <div class="item-old-price">{{parseOldPrice}}</div>
        <div class="item-new-price">{{parseNewPrice}}</div>
        <div class="item-discount">{{parseDiscount}}</div>
      </div>
    </div>
    <div class="item-conditions">
      <!-- <div class="item-date">{{item.dateIn}} - {{item.dateOut}}</div> -->
      <!-- <div class="item-cond">{{item.condition}}</div> -->
    </div>
    <b-btn variant="info" class="add-btn" v-on:click="handleBtnClick">{{btnText}}</b-btn>
  </div>
</template>

<script>
export default {
  props: ['item', 'btnText', 'index'],
  data: function() {
    return {
      maxNameLength: 40
    }
  }, 
  computed: {
    displayName: function() {
      if(this.item.name.length <= this.maxNameLength){
        return this.item.name;
      } else {
        return this.item.name.slice(0, this.maxNameLength) + '...';
      }
    },
    parseCondition: function() {
      var cond = this.item.condition;
      return cond === '-' ? '' : cond;
    },
    parseDiscount: function() {
      var disc = +this.item.discount;
      if(Number.isNaN(disc)) {
        return '';
      } else {
        return disc + '%';
      }
    },
    parseOldPrice: function() {
      return this.item.oldPrice + '\u20BD';
    },
    parseNewPrice: function() {
      return this.item.newPrice + '\u20BD';
    }
  },
  methods: {
    handleBtnClick: function() {
      if(this.btnText === '+') {
        this.addItem();
      } else if(this.btnText === '-') {
        this.removeItem();
      }
    },
    addItem: function() {
      this.$emit('addItem', this.item);
    },
    removeItem: function() {
      this.$emit('removeItem', this.item);
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/scss/item-small';
</style>
