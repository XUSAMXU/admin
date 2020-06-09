import { getToken,setToken } from '../plugins/auth.js'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config=>{
	config.headers.Authorization = getToken()
	return config 
})

const state= {
	token : getToken(),
}

const mutations= {
	SET_TOKEN : ( state,token ) => {
			state.token = token
	},
}

const actions= {
	login ({ commit },userInfo) {
		return axios.post('/login',userInfo).then( res => {
			const { data:result } = res;
			console.log(result)
			commit("SET_TOKEN",result.data.token)
			setToken(result.data.token)
			return res
		}).catch( reject => {
			return reject
		})
	}
}
 
export default {
	namespaced : true ,
	state,
	mutations,
	actions
}