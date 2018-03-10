<template>
  <div class="item">
    <div class="item-main-info">
      <div class="item-img">
        <img v-bind:src="item.imageUrl"/>
      </div>
      <div class="item-description">
        <div class="item-name">{{displayName}}</div>
        <div class="item-category">{{item.category}}</div>
        <div class="item-old-price">{{item.oldPrice}}&#8381;</div>
        <div class="item-new-price">{{item.newPrice}}&#8381;</div>
        <div class="item-discount">{{parseDiscount}}</div>
      </div>
    </div>
    <div class="item-conditions">
      <!-- <div class="item-date">{{item.dateIn}} - {{item.dateOut}}</div> -->
      <!-- <div class="item-cond">{{item.condition}}</div> -->
    </div>
    <b-btn class="add-to-shoplist-btn" v-on:click="handleBtnClick">{{btnText}}</b-btn>
  </div>
</template>

<script>
export default {
  props: ['item', 'btnText', 'index'],
  data: function() {
    return {
//      item: {
//        "name": "Лук репчатый красный, 1 кг Лук репчатый красный, 1 кг Лук репчатый красный, 1 кг Лук репчатый красный, 1 кг Лук репчатый, 1 кг",
//        "category": "Овощи и фрукты", 
//        "imageUrl": "https://dixy.ru/upload/iblock/289/2000003216.jpg", 
//        "oldPrice": 47.1,
//        "newPrice": 39.99,
//        "discount": "-15", 
//        "dateIn": "2018-03-05",
//        "dateOut": "2018-03-11", 
//        "crawlDate": "2018-03-05", 
//        "condition": "-"
//      },
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
    parseDiscount: function() {
      var disc = +this.item.discount;
      if(Number.isNaN(disc)) {
        return '';
      } else {
        return disc + '%';
      }
    }
  },
  methods: {
    handleBtnClick: function() {
      if(this.btnText === '+') {
        this.addToShopList();
      } else if(this.btnText === '-') {
        this.removeFromShopList();
      }
    },
    addToShopList: function() {
      this.$http.post('api/shoplist/add?id=' + this.item.id, {}, {
        headers: {
          'Authorization': localStorage.getItem('auth')
        }
      })
        .then(res => {
          this.$emit('addToShopList', this.item);
          this.$emit('removeCustomItem');
        });
    },
    removeFromShopList: function() {
      this.$http.delete('api/shoplist/delete?id=' + this.item.id, { 
        headers: {
          'Authorization': localStorage.getItem('auth')
        }
      })
        .then(res => {
          this.$emit('removeFromShopList', this.index);
        });
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
  color: rgb(155, 155, 155);
  font-size: 0.8em;
  font-weight: 600;
}
.item-img > img {
  width: 100%;
  height: 100%;
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
