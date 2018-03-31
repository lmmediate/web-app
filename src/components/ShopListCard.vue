<template>
  <b-card 
    @mouseover="onMouseOver"
    @mouseout="onMouseOut"
    @click="onClick" 
    :header-bg-variant="headerVariant.bg"
    :header-text-variant="headerVariant.fg"
    :header="shoplist.name">
    <p class="card-text">
    <b-list-group class="mb-2">
      <b-list-group-item v-for="item in itemsPreview" variant="warning">
        {{item}}
      </b-list-group-item>
      <b-list-group-item
        v-show="maxItemsCount < shoplist.items.length" variant="warning">
        ...
      </b-list-group-item>
    </b-list-group>
    <b-list-group>
      <b-list-group-item v-for="item in customItemsPreview" variant="info">
        {{item}}
      </b-list-group-item>
      <b-list-group-item
        v-show="maxItemsCount < shoplist.customItems.length" variant="info">
        ...
      </b-list-group-item>
    </b-list-group>
    </p>
  </b-card>
</template>

<script>
export default {
  props: ['shoplist'],
  data: function() {
    return {
      headerVariant: {
        bg: 'secondary',
        fg: 'white'
      },
      maxNameLength: 40,
      maxItemsCount: 3
    }
  },
  computed: {
    itemsPreview: function() {
      return this.getPreview(this.shoplist.items);
    },
    customItemsPreview: function() {
      return this.getPreview(this.shoplist.customItems);
    }
  },
  methods: {
    onMouseOver: function() {
      this.headerVariant.bg = 'light';
      this.headerVariant.fg = 'black';
    },
    onMouseOut: function() {
      this.headerVariant.bg = 'secondary';
      this.headerVariant.fg = 'white';
    },
    onClick: function() {
      this.$router.push(`/shoplist/${this.shoplist.id}`);
    },
    getPreview: function(arr) {
      return arr 
        .slice(0, 3)
        .map(i => {
          if(i.length <= this.maxNameLength){
            return i;
          } else {
            return i.slice(0, this.maxNameLength) + '...';
          }
        });
    }
  }
}
</script>

<style>
</style>
