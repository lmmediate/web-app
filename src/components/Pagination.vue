<template>
  <div id="pagination">
    <ul>
      <li v-for="i in info.numPages">
        <router-link v-bind:to="'/discounts/' + i">{{i}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default { 
  props: ['info']
}
</script>

<style>
div#pagination ul {
  list-style-type: none;
}
div#pagination li {
  display: inline-block;
  margin: 5px;
}
div#pagination button {
  padding: 5px;
}
</style>
