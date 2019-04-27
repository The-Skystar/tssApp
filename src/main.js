// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Axios from 'axios'
import  Qs from 'querystring'
import 'font-awesome/css/font-awesome.css'
import Mui from 'vue-awesome-mui'
import store from './vuex/store'

Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Vue.prototype.qs = Qs
Axios.defaults.baseURL = '/api'
Vue.use(MintUI)
Vue.use(Mui)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',

})
