<template>
  <div id="content">

    <!-- TODO: temporary pagination -->
    <div id="pagination">
      <ul>
        <li v-for="i in info.numPages">
          <router-link v-bind:to="'/discounts/' + i">{{i}}</router-link>
       </li>
      </ul>
    </div>
    
    <div id="item-list">
      <item v-for="item in items" v-bind:item="item" v-bind:key="item.name"></item>
    </div>  

  </div>  
</template>

<script>
import Item from './Item.vue'

export default {
  components: {
    'item': Item
  },
  methods: {
    getPage: function(num) {
      console.log(num);
      var req = this.url + '/sales/page/' + num;
      this.$http.get(req).then(res => {
        this.items = res.data;
      }, res => {
        console.log('Error during GET request. Url: ' + req);
      });
    },
    getInfo: function() {
      var req = this.url + '/sales/info';
      this.$http.get(req).then(res => {
        this.info = res.data;
        console.log(this.info); // TODO: remove
      }, res => {
        console.log('Error during GET request. Url: ' + req);
      });
    }
  },
  watch: {
    '$route':  function(to, from) {
        this.getPage(to.params.page);
    }
  },
  data: function() {
    return {
      // url: 'http://46.17.44.125:8080/api',
      url: 'http://localhost:8080/api',
      items: 
      [
      // MOCK items
      {"old_price":66.9,"name":"Биойогурт слобода мюсли-яблоки-мандарин-орех 7,6%, 210 г слобода  слобода слобода слобода слобода слободаслобода слобода слобода","condition":"-","img_url":"https://dixy.ru/upload/iblock/06c/2000262152.jpg","new_price":49.99,"date":"АКЦИЯ 04/12—10/12","discount":-25,"category":"Молочная гастрономия"}
      ],
      info: {}
    }
  },
  beforeMount: function() {
    this.getInfo();
    this.getPage(1);
  }
}
</script>

<style>

div#content {
  width: 90%;
  margin: 0 auto;
}

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

div#item-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
@media screen and (min-width: 768px) {
  div#item-list {
    justify-content: flex-start;
  }
}
</style>
