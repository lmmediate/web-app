// var url = 'http://46.17.44.125:8080/api/sales';
var url = 'http://localhost:8080/api';

var vm = new Vue({
  el: '#grid',
  data: {
    items: [],
    itemsFiltered: []
  }, 
  methods: {
    total: function() {
      return this.itemsFiltered.length;
    },
    filter: function(event) {
      var name = event.target.value;
      var req = url + '/sales?name=' + name;

      this.$http.get(req).then(res => {
        if(name) {
          this.itemsFiltered = res.data;
        } else {
          this.itemsFiltered = this.items;
        }
        console.log(res.data.length);
      }, res => {
        console.log('Error with ' + '"' + req + '"');
      });

      // var name = event.target.value;
      // // TODO: call a filter function from API
      // // to filter all items (not a single page)
      // this.itemsFiltered = this.items.filter(function(value) {
      //   return value.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
      // });
    },
  }
});;

var xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', url + '/sales/page/2');
xmlhttp.onload = function() {
  if (xmlhttp.status === 200) {
    var data = JSON.parse(xmlhttp.responseText);
    vm.items = data;
    vm.itemsFiltered = data;
  } else {
    console.log('Loading error.');
  }
};
xmlhttp.send();


