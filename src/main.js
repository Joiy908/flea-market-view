import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router';
import router from './router'

import { Search, List, Card, Popup, Cell, CellGroup, Button, Field, Toast} from 'vant'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Search)
   .use(List)
   .use(Card)
   .use(Popup)
   .use(Cell)
   .use(CellGroup)
   .use(Button)
   .use(Field)
   .use(Toast)


new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
