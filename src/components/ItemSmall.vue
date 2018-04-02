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

<style scoped>
.item {
  padding: 5px;
  background-color: white;
  box-shadow: 3px 3px 15px -5px rgba(0,0,0,0.5);
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.item-main-info {
  display: flex;
  flex-direction: row;
}
.item-category {
  color: #757575;
  font-size: 0.8em;
  font-weight: 600;
}
.item-img {
  height: 130px;
  width: 130px;
  margin-right: 5px;
}
.item-conditions {
  align-self: flex-end;
}
.item-old-price {
  color: rgb(97, 97, 97);
  text-decoration: line-through;
  font-size: 0.8em;
}
.item-new-price {
  font-weight: 600;
}
.item-discount {
  padding: 2px;
  border-radius: 5px;
  background-color: rgb(244, 209, 66);
  display: inline-block;
}
</style>
