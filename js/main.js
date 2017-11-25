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
    },
  },
  beforeMount: function() {
    this.$http.get(url + '/sales/page/2').then(res => {
      this.items = res.data;
      this.itemsFiltered = res.data;
    }, res => {
      console.log('Error with ' + '"' + req + '"');
    });
  }
});;


