import { getToken,setToken,resetToken } from '../plugins/auth.js'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config=>{
	config.headers.Authorization = getToken()
	return config 
})

const state= {
	token : getToken(),
	id : '',
	roles : [] 
}

const mutations= {
	SET_TOKEN : ( state,token ) => {
			state.token = token
	},
	SET_ID : ( state , id ) => {
		state.id = id
	},
	SET_ROLES: (state,roles) => {
		if(roles.length>0) 	return state.roles.push(roles);
		roles = []
	}
}

const actions= {
	login ({ commit },userInfo) {
		return axios.post('/login',userInfo).then( res => {
			const { data:result } = res;
			commit("SET_TOKEN",result.data.token)
			commit("SET_ID",result.data.username)
			setToken(result.data.token)
			return res
		}).catch( reject => {
			return reject
		})
	},
	getInfo ( { commit,state } ) {
		return axios.get('users',{params:{query: state.id ,pagenum:  1,pagesize: 1}}).then( resolve => {
			const { data:res } = resolve
			commit('SET_ROLES' , res.data.users[0].role_name)
			return state.roles
		}).catch( err => err )
	},
	resetToken({commit}){
		return new Promise(resolve => {
			commit("SET_TOKEN","")
			commit("SET_ROLES",[])
			resetToken()
			resolve();
		})
	}
}
 
export default {
	namespaced : true ,
	state,
	mutations,
	actions
}