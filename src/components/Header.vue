<template>
    <div id="header">
      <div id="logo"><a href="/">ShopDisounts</a></div>
      <div id="top-navbar">
        <ul>
          <li><a href="./discounts">Акции</a></li>
          <li><a href="./shoplist">Список покупок</a></li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {};
  }
}
</script>

<style>
div#header {
  background-color: rgb(204, 153, 255);
}
div#logo {
  padding: 10px;
  text-align: center;
  font-size: 180%;
}
div#top-navbar {
  font-size: 120%;
  text-align: center;
}
div#top-navbar ul {
  list-style-type: none;
}
a {
  text-decoration: none;
}
a:visited {
  color: black;
}
div#top-navbar a {
  display: inline-block;
  padding: 10px;
  text-align: center;
  color: black;
}
div#top-navbar a:hover {
  background-color: rgb(153, 51, 255);
  color: white;
}
@media screen and (min-width: 768px) {
  div#top-navbar li {
     display: inline-block;
  }
}
</style>
