<template>
  <div class="item">
    <div class="item-description" v-on:click="expandName">
      <div class="item-name">{{displayName}}</div>
      <div class="item-category">{{item.category}}</div>
    </div>
    <div class="item-img" v-show="showImage">
      <b-img v-bind:src="item.imageUrl" fluid />
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
    <b-btn variant="info" class="add-btn" v-on:click="addItem">+</b-btn>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data: function() {
    return {
      maxNameLength: 80,
      showImage: true
    };
  },
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
    addItem: function() {
      // TODO: add shoplist choice
      this.$http.post(`api/shoplist/1/add?id=${this.item.id}`)
        .catch(error => {
          this.$router.push('/login');
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
  }
}
</script>

<style scoped>
hr {
  width: 90%;
  margin: 0 auto;
  border-top: 1px solid rgb(140, 140, 140);
}
.item {
  position: relative;
  width: 280px;
  height: 440px;
  padding: 5px;
  background-color: white;
  box-shadow: 3px 3px 15px -5px rgba(0,0,0,0.5);
}
.item:hover {
  outline: 1px solid black;
}
.item-description {
  margin-bottom: 10px;
}
.item-description:hover {
  /* TODO */
  background-color: coral;
  cursor: default;
}
.item-name {
  margin-bottom: 5px;
}
.item-category {
  color: #757575;
}
.item-img {
  margin: 0 auto;
  margin-bottom: 5px;
  width: 250px;
  height: 250px;
}
.item-price-container {
  margin: 0 auto;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.item-old-price {
  color: rgb(97, 97, 97);
  text-decoration: line-through;
}
.item-new-price {
  font-size: 1.5em;
}
.item-conditions {
  position: absolute;
  bottom: 5px;
  left: 5px;
}
.add-btn {
  position: absolute;
  bottom: 5px;
  right: 5px;
  padding: 10px;
}
.item-discount {
  padding: 2px;
  border-radius: 5px;
  background-color: rgb(244, 209, 66);
  display: inline-block;
}
</style>
