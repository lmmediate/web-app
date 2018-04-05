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

Vue.use(BootstrapVue)
Vue.use(VueResource);
Vue.use(VueRouter);

function passProps(route) {
  return {
    shopId: route.query.shop,
    currentCategory: route.query.category,
    currentPage: route.query.page 
  }
}

const routes = [
  { path: '/login', component: Login },
  { path: '/', beforeEnter: (to, from, next) => {
    // Custom redirect function
    next({ path: '/sales', query: { shop: 1, page: 1 } });
  }},
  { path: '/sales', component: Discounts, props: passProps  },
  { path: '/shoplist', component: ShopListPreview },
  { path: '/shoplist/:id', component: ShopList }
];

const router = new VueRouter({
  routes: routes
});

// 'http://46.17.44.125:8080',
// 'http://localhost:8080',
 
Vue.http.options.root = 'http://gcsales.ru'; 
Vue.http.interceptors.push(function(req, next) {
  var token = localStorage.getItem('auth');
  req.headers.set('Authorization', token);
  next();
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
