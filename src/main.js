import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App.vue'
import Discounts from './components/Discounts.vue'
import ShopList from './components/ShopList.vue'
import Login from './components/Login.vue'

Vue.use(BootstrapVue)
Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [
  { path: '/login', component: Login },
  { path: '/', redirect: '/discounts/1', component: Discounts },
  { path: '/discounts', redirect: '/discounts/1', component: Discounts },
  { path: '/discounts/:page', component: Discounts },
  { path: '/shoplist', component: ShopList },
];

const router = new VueRouter({
  routes: routes
});

// 'http://46.17.44.125:8080/api',
// 'http://localhost:8080/api',
 
Vue.http.options.root = 'http://localhost:8080'; 

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
