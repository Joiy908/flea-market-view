import Vue from 'vue'
import App from './App.vue'
import { Search, Col, Row, List, Card, Popup } from 'vant'

Vue.config.productionTip = false

Vue.use(Search)
Vue.use(Col)
Vue.use(Row)
Vue.use(List)
Vue.use(Card)
Vue.use(Popup)


new Vue({
  render: h => h(App),
}).$mount('#app')
