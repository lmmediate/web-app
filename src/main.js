import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
// import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App.vue'
import Discounts from './components/Discounts.vue'
import ShopList from './components/ShopList.vue'
import ShopListPreview from './components/ShopListPreview.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import ShopSelector from './components/ShopSelector.vue'
import auth from './auth'
import Media from 'vue-media'

Vue.component('media', Media);
Vue.use(BootstrapVue)
Vue.use(VueResource);
Vue.use(VueRouter);

// Check user login on the app start
auth.checkLogin();

// function beforeEnter(to, from, next) {
//   // Custom redirect function
//   next({path: '/sales', query: {shop: 1}});
// }


Vue.http.options.root = 'http://gcsales.ru';
Vue.http.interceptors.push(function (req, next) {
  var token = localStorage.getItem('auth');
  req.headers.set('Authorization', token);
  next();
});

// Get available shops and store them in localstorage
Vue.http.get('api/shops')
  .then(res => {
    var jsonData = JSON.stringify(res.data);
    localStorage.setItem('shops', jsonData);
  });


function passProps(route) {
  return {
    shop: route.params.shop,
    category: route.query.category
  }
}

const routes = [
  {path: '/', redirect: '/sales'},
  {path: '/sales', component: ShopSelector},
  {path: '/sales/:shop', component: Discounts, props: passProps},
  {path: '/shoplist', component: ShopListPreview},
  {path: '/shoplist/:id', component: ShopList},
  {path: '/login', component: Login},
  {path: '/register', component: Register}
];

const router = new VueRouter({
  routes: routes
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
