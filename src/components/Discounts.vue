<template>
  <div id="discounts">
    <item-list v-bind:items="items"></item-list>
    <pagination v-bind:info="info"></pagination>
  </div>
</template>

<script>
import ItemList from './ItemList.vue'
import Pagination from './Pagination.vue'

export default {
  components: {
    'item-list': ItemList,
    'pagination': Pagination
  },
  data: function() {
    return {
      // url: 'http://46.17.44.125:8080/api',
      url: 'http://localhost:8080/api',
      // FIXME: mock
      info: { numPages: 5 },
      items: [
        {"date": "\u0410\u041a\u0426\u0418\u042f 30/10\u201405/11", "img_url": "https://dixy.ru/upload/iblock/3cb/2000015860.jpg", "category": "\u041e\u0432\u043e\u0449\u0438 \u0438 \u0444\u0440\u0443\u043a\u0442\u044b", "new_price": 32.99, "name": "\u0422\u044b\u043a\u0432\u0430, 1 \u043a\u0433", "condition": "-", "old_price": 44.9, "discount": -27.0},
        {"date": "\u0410\u041a\u0426\u0418\u042f 30/10\u201405/11", "img_url": "https://dixy.ru/upload/iblock/5cb/1100074440.jpg", "category": "\u041e\u0432\u043e\u0449\u0438 \u0438 \u0444\u0440\u0443\u043a\u0442\u044b", "new_price": 89.99, "name": "\u0413\u0440\u0438\u0431\u044b \u0412\u0435\u0448\u0435\u043d\u043a\u0438 \u0443\u043f\u0430\u043a\u043e\u0432\u043a\u0430, 1 \u0448\u0442", "condition": "-", "old_price": 0.0, "discount": "\u0421\u043a\u0438\u0434\u043a\u0430 \u0437\u0434\u0435\u0441\u044c!"},
        {"date": "\u0410\u041a\u0426\u0418\u042f 30/10\u201405/11", "img_url": "https://dixy.ru/upload/iblock/2fb/2000003216.jpg", "category": "\u041e\u0432\u043e\u0449\u0438 \u0438 \u0444\u0440\u0443\u043a\u0442\u044b", "new_price": 24.99, "name": "\u041b\u0443\u043a \u0440\u0435\u043f\u0447\u0430\u0442\u044b\u0439 \u043a\u0440\u0430\u0441\u043d\u044b\u0439, 1 \u043a\u0433", "condition": "-", "old_price": 35.9, "discount": -30.0},
        {"date": "\u0410\u041a\u0426\u0418\u042f 30/10\u201405/11", "img_url": "https://dixy.ru/upload/iblock/e41/DI00078769.jpg", "category": "\u041e\u0432\u043e\u0449\u0438 \u0438 \u0444\u0440\u0443\u043a\u0442\u044b", "new_price": 99.99, "name": "\u0427\u0435\u0441\u043d\u043e\u043a, 1 \u043a\u0433", "condition": "-", "old_price": 119.9, "discount": -17.0},
        {"date": "\u0410\u041a\u0426\u0418\u042f 30/10\u201405/11", "img_url": "https://dixy.ru/upload/iblock/1a6/\u0426\u04220036199.jpg", "category": "\u041e\u0432\u043e\u0449\u0438 \u0438 \u0444\u0440\u0443\u043a\u0442\u044b", "new_price": 22.9, "name": "\u041c\u043e\u0440\u043a\u043e\u0432\u044c \u043c\u044b\u0442\u0430\u044f, 1 \u043a\u0433", "condition": "-", "old_price": 32.9, "discount": -30.0},
        {"date": "\u0410\u041a\u0426\u0418\u042f 30/10\u201405/11", "img_url": "https://dixy.ru/upload/iblock/933/2000003215.jpg", "category": "\u041e\u0432\u043e\u0449\u0438 \u0438 \u0444\u0440\u0443\u043a\u0442\u044b", "new_price": 24.99, "name": "\u041a\u0430\u0440\u0442\u043e\u0444\u0435\u043b\u044c \u043c\u044b\u0442\u044b\u0439, 1 \u043a\u0433", "condition": "-", "old_price": 33.9, "discount": -26.0},
        {"date": "\u0410\u041a\u0426\u0418\u042f 30/10\u201405/11", "img_url": "https://dixy.ru/upload/iblock/01a/10E0074362.jpg", "category": "\u041e\u0432\u043e\u0449\u0438 \u0438 \u0444\u0440\u0443\u043a\u0442\u044b", "new_price": 59.99, "name": "\u042f\u0431\u043b\u043e\u043a\u0438 \u0441\u0435\u0437\u043e\u043d\u043d\u044b\u0435, 1 \u043a\u0433", "condition": "-", "old_price": 0.0, "discount": "\u0421\u043a\u0438\u0434\u043a\u0430 \u0437\u0434\u0435\u0441\u044c!"},
        {"date": "\u0410\u041a\u0426\u0418\u042f 30/10\u201405/11", "img_url": "https://dixy.ru/upload/iblock/8b3/10E0074364.jpg", "category": "\u041e\u0432\u043e\u0449\u0438 \u0438 \u0444\u0440\u0443\u043a\u0442\u044b", "new_price": 99.99, "name": "\u041b\u0438\u043c\u043e\u043d\u044b, 1 \u043a\u0433", "condition": "-", "old_price": 0.0, "discount": "\u0421\u043a\u0438\u0434\u043a\u0430 \u0437\u0434\u0435\u0441\u044c!"},
        {"date": "\u0410\u041a\u0426\u0418\u042f 30/10\u201405/11", "img_url": "https://dixy.ru/upload/iblock/f19/DI00081192.jpg", "category": "\u041e\u0432\u043e\u0449\u0438 \u0438 \u0444\u0440\u0443\u043a\u0442\u044b", "new_price": 59.99, "name": "\u0410\u0432\u043e\u043a\u0430\u0434\u043e, 1 \u0448\u0442", "condition": "-", "old_price": 0.0, "discount": "\u0421\u043a\u0438\u0434\u043a\u0430 \u0437\u0434\u0435\u0441\u044c!"},
        {"date": "\u0410\u041a\u0426\u0418\u042f 30/10\u201405/11", "img_url": "https://dixy.ru/upload/iblock/0cd/DI00079982.jpg", "category": "\u041e\u0432\u043e\u0449\u0438 \u0438 \u0444\u0440\u0443\u043a\u0442\u044b", "new_price": 99.99, "name": "\u0412\u0438\u043d\u043e\u0433\u0440\u0430\u0434 \u0442\u0435\u043c\u043d\u044b\u0439, 1 \u043a\u0433", "condition": "-", "old_price": 119.9, "discount": -17.0},
        {"date": "\u0410\u041a\u0426\u0418\u042f 30/10\u201405/11", "img_url": "https://dixy.ru/upload/iblock/cda/DI00078763.jpg", "category": "\u041e\u0432\u043e\u0449\u0438 \u0438 \u0444\u0440\u0443\u043a\u0442\u044b", "new_price": 49.99, "name": "\u041c\u0430\u043d\u0434\u0430\u0440\u0438\u043d\u044b, 1 \u043a\u0433", "condition": "-", "old_price": 99.99, "discount": -50.0},
        {"date": "\u0410\u041a\u0426\u0418\u042f 30/10\u201405/11", "img_url": "https://dixy.ru/upload/iblock/47b/2000015855.jpg", "category": "\u041e\u0432\u043e\u0449\u0438 \u0438 \u0444\u0440\u0443\u043a\u0442\u044b", "new_price": 89.99, "name": "\u0413\u0440\u0430\u043d\u0430\u0442\u044b, 1 \u043a\u0433", "condition": "-", "old_price": 149.99, "discount": -40.0},
      ]
    }
  },
  methods: {
    getInfo: function() {
      var req = this.url + '/sales/info';
      this.$http.get(req).then(res => {
        this.info = res.data;
        console.log(this.info); // TODO: remove
      }, res => {
        console.log('Error during GET request. Url: ' + req);
      });
    },
    getPage: function(num) {
      console.log('Loading page ' + num);
      var req = this.url + '/sales/page/' + num;
      this.info.currentPage = +num; // cast to number

      this.$http.get(req).then(res => {
        this.items = res.data;
      }, res => {
        console.log('Error during GET request. Url: ' + req);
      });
    },
  },
  watch: {
    '$route': function(to, from) {
      this.getPage(to.params.page);
    }
  },
  beforeMount: function() {
    this.getInfo();
    var page = this.$route.params.page || 1;
    this.getPage(page);
  }
}
</script>

<style>
</style>
