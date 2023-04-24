import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router';
import router from './router'

import { Search, List, Card, Popup } from 'vant'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Search)
   .use(List)
   .use(Card)
   .use(Popup)


new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
