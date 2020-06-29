import Vue from 'vue'
import Vuex from 'vuex'
import user from './user.js'
import permission from './permission.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules : {
	user,
	permission
	},
  getters:{
		roles(){
			return 0;
		}
	}
})
