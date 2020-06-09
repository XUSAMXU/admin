import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login.vue'
import Home from './components/home.vue'
import Welcome from './components/welcome.vue'
import Users from './components/user/users.vue'
Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
	routes : [
		{
			path : '/', 
			redirect : './login'
		},
		{
			path : '/home',
			component: Home,
			redirect: '/welcome',
			children: [
				{path: '/welcome',component: Welcome},
				{path: '/users',component: Users},
				]
		},
		{
			path: '/login',
			component: Login
		},	
	]
})

router.beforeEach((to,from,next) => {
	if( to.path=== '/login' ) return next()
	const tokenStr = window.sessionStorage.getItem('token')
	if(!tokenStr) return next('/login')	
	next()
})

export default router