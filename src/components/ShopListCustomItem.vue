<template>
  <b-card no-body class="mb-1" border-variant="light">
    <b-card-header class="p-1" header-tag="header" role="tab">
      <b-btn block href="#" v-bind:variant="variant" v-b-toggle="'collapse' + item.id">
        {{item.name}}
      </b-btn>
    </b-card-header>
    <b-collapse v-bind:id="'collapse' + item.id" accordion="my-accordion" role="tabpanel">
      <b-card-body>
        <p class="card-text text-center">
          <b-btn v-on:click="removeCustomItem">Удалить</b-btn>
        </p>
        <p class="card-text" v-if="variant === 'danger'">
          К сожалению, таких товаров не нашлось...
        </p>
        <p class="card-text">
        <div v-for="(value, key) in item.matchingItems">
          <h4>{{key}}</h4>
          <item-small
             class="mx-auto mb-2"
             v-for="matchingItem in value"
             v-on:addItem="addItem($event)"
             v-on:removeCustomItem="removeCustomItem"
             btnText="+"
             v-bind:item="matchingItem">
          </item-small>
        </div>
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
      if(Object.keys(this.item.matchingItems).length) {
        return 'success'
      } else {
        return 'danger'
      }
    }
  },
  methods: {
    addItem: function(item) {
      this.$emit('addItem', item);
    },
    removeCustomItem: function() {
      this.$emit('removeCustomItem', this.item);
    }
  }
}
</script>
