<template>
  <b-card no-body class="mb-1" border-variant="light">
    <b-card-header class="p-1" header-tag="header" role="tab">
      <b-btn block href="#" v-bind:variant="variant" v-b-toggle="'collapse' + item.id">
        {{item.item}} ({{item.matchingItems.length}})
      </b-btn>
    </b-card-header>
    <b-collapse v-bind:id="'collapse' + item.id" accordion="my-accordion" role="tabpanel">
      <b-card-body>
        <p class="card-text text-center">
          <b-btn v-on:click="remove">Удалить</b-btn>
        </p>
        <p class="card-text" v-if="item.matchingItems.length === 0">
          К сожалению, таких товаров не нашлось...
        </p>
        <p class="card-text">
        <item-small
           class="mx-auto mb-2"
           v-for="matchingItem in item.matchingItems"
           v-on:addToShopList="addToShopList($event)"
           v-on:removeCustomItem="remove"
           btnText="+"
           v-bind:item="matchingItem">
        </item-small>
        </p>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>


<script>
import ItemSmall from './ItemSmall.vue'

export default {
  components: {
    'item-small': ItemSmall
  },
  props: ['index', 'item'],
  computed: {
    variant: function() {
      if(this.item.matchingItems.length) {
        return 'success'
      } else {
        return 'danger'
      }
    }
  },
  methods: {
    addToShopList: function(item) {
      this.$emit('addToShopList', item);
    },
    remove: function() {
      this.$http.delete('api/shoplist/delete?customid=' + this.item.id, { 
        headers: {
          'Authorization': localStorage.getItem('auth')
        }
      })
        .then(res => {
          this.$emit('removeCustomItem', this.index);
        });
    }
  }
}
</script>
