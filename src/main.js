import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App.vue'
import Discounts from './components/Discounts.vue'
import ShopList from './components/ShopList.vue'


Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Discounts },
  { path: '/discounts', component: Discounts },
  { path: '/shoplist', component: ShopList },
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
