import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import store from './store'
import TreeTable from 'vue-table-with-tree-grid'

Vue.prototype.$http = axios
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config=>{
	config.headers.Authorization = window.sessionStorage.getItem('token')
	return config 
})

Vue.component('tree-table', TreeTable)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
