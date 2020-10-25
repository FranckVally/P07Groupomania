import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Vue from 'vue'
import App from './App.vue'
import router from '../src/router'
import store from '../src/store'


//pour format des dates
const moment = require('moment')
require('moment/locale/fr')

Vue.use(require('vue-moment'), {
  moment
})


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
