<template>
  <div id="pagination">
    <b-pagination-nav
      use-router
      base-url="/discounts/" 
      v-bind:number-of-pages="info.numPages" 
      v-model="currentPage" />
  {{ currentPage }}
  </div>
</template>

<script>
// TODO: change currentPage on refresh
export default { 
  props: ['info'],
  data: function() {
    return {
      currentPage: 1
    }
  }
}
</script>

<style>
</style>
