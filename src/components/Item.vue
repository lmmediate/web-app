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
    <b-btn variant="info" class="add-btn" 
                          v-b-modal="'modal' + item.id">
      +
    </b-btn>
    <b-modal ref="modal" 
             hide-footer
             :id="'modal' + item.id" 
             title="Добавить в список покупок">
      <b-list-group>
        <b-list-group-item button 
             v-for="shoplist in shoplists"
             @click="addItem(shoplist.id)">
          {{shoplist.name}}
        </b-list-group-item>
      </b-list-group>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ['item', 'shoplists'],
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
    addItem: function(shoplistId) {
      this.$http.post(`api/shoplist/${shoplistId}/additem?id=${this.item.id}`)
        .catch(error => {
          console.log(error);
          this.$router.push('/login');
        });
      this.$refs.modal.hide();
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

<style scoped lang="scss">
  @import '../assets/scss/item';
</style>
