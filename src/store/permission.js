import { asyncRoutes,constRoutes } from '../router.js'

function hasPermission( roles,route ) {
	if( route.meta && route.meta.roles ) {
		return route.meta.roles.some( role => roles.includes(role) );
	} else {
		return true
	}
}

export function filterAsyncRoutes(routes,roles) {
	const res = []
	routes.forEach( route => {
		const tmp = { ...route }
		if(hasPermission(roles,tmp)){
			if(tmp.children) {
				tmp.children = filterAsyncRoutes( tmp.children , roles)
			}
			res.push(tmp)
		}
	})
	return res
}

const state = {
	routes: [],
	addRoutes:[]
}

const mutations = {
	SET_ROUTES: (state,routes) => {
		state.addRoutes = routes
		state.routes = constRoutes.concat(routes)
	}
}

const actions = {
	generateRoutes({commit},roles) {
		return new Promise(resolve => {
			let accessRoutes
			if(roles.includes('admin')) {
				accessRoutes = asyncRoutes || [];
			} else {
				accessRoutes = filterAsyncRoutes(asyncRoutes,roles)
			}
			
			commit("SET_ROUTES",accessRoutes)
			resolve(accessRoutes)	
		}).then(res=>res).catch(err=>err)
	}
}

export default {
	namespaced:true,
	state,
	mutations,
	actions
}