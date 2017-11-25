// var url = 'http://46.17.44.125:8080/api/sales';
var url = 'http://localhost:8080/api';

var vm;

var xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', url + '/sales/page/1');
xmlhttp.onload = function() {
  if (xmlhttp.status === 200) {
    var d = JSON.parse(xmlhttp.responseText);

    vm = new Vue({
      el: '#item-list',
      data: {
        items: d
      }
    });

    console.log(vm.items);

  } else {
    console.log('Loading error.');
  }
};
xmlhttp.send();


