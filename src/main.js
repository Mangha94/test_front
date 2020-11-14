import 'babel-polyfill';
import Vue from 'vue'
import App from './App.vue'
import 'axios'
import './plugins/common';
import './plugins/element.js'
import router from './router'
import store from "./store";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
