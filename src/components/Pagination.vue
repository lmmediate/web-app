<template>
  <div id="pagination">
    <ul>
      <li v-for="i in info.numPages">
        <router-link v-bind:to="'/discounts/' + i">
          {{i}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default { 
  props: ['info']
}
</script>

<style scoped>
.router-link-active {
  background-color: rgb(204, 153, 255);
}
#pagination {
  margin-top: 20px;
  margin-bottom: 20px;
}
a {
  text-decoration: none;
  padding: 10px;
  display: block;
}
a:visited {
  color: black;
}
a:hover {
  background-color: rgb(153, 51, 255);
  color: white;
}
ul {
  list-style-type: none;
}
li {
  display: inline-block;
}

</style>
