import router from './router.js'
import store from './store/index.js'
import { getToken } from './plugins/auth.js' //获取touken

router.beforeEach(async (to,from,next) => {
	const hasToken = getToken()
	const whiteList = ['/login']
	
	if( hasToken ) {
		if( to.path === '/login') {
			next()
		} else {
			let hasRoles = store.getters.roles && store.getters.roles > 0
			if( hasRoles ) {
				next()
			} else {
				try{
					const roles = await store.dispatch('user/getInfo')
					const acRoutes = await store.dispatch('permission/generateRoutes',roles)
					router.addRoutes(acRoutes)
					hasRoles = true
					next({...to,replace:true})
				} catch (error) {
					await store.dispatch('user/resetToken')
					console.log(error);
					next(`/login?redirect=${to.path}`)
				}
			}
		}
	} else {
		if(whiteList.indexOf(to.path) !== -1) {
			next()
		} else {
			next(`/login?redirect=${to.path}`)
		}
	}
})