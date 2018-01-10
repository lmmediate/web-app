<template>
  <div id="item-list">
    <b-container fluid>
      <b-row>
        <b-col 
          cols="12" md="6" lg="4" xl="3"
          class="py-2 border"
          v-for="item in items"
          v-bind:key="item.name">
            <item class="mx-auto" v-bind:item="item" v-bind:key="item.name"></item>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Item from './Item.vue'

export default {
  components: {
    'item': Item
  },
  props: ['items']
}
</script>

<style>

</style>
