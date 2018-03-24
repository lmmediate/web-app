<template>
  <b-card 
    @mouseover="onMouseOver"
    @mouseout="onMouseOut"
    @click="onClick" 
    :header-bg-variant="headerVariant.bg"
    :header-text-variant="headerVariant.fg"
    :header="shoplist.name">
    <p class="card-text">
    <b-list-group>
      <b-list-group-item v-for="item in shoplist.items">
        {{item.name}}
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
      maxNameLength: 40
    }
  },
  computed: {
    // TODO: displayName
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
      console.log('CLICK');
    },
    openShopList: function() {
      
    }
  }
}
</script>

<style>
</style>
