<template>
  <div id="pagination">
    <b-pagination-nav
      align="center"
      base-url="/discounts/" 
      use-router
      v-bind:number-of-pages="info.numPages" 
      v-model="info.currentPage" />
  </div>
</template>

<script>
export default { 
  props: ['info'],
}
</script>

<style>
</style>
