import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
Vue.prototype.$http = axios
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

new Vue({router,
  render: h => h(App),
}).$mount('#app')
