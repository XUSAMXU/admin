import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login.vue'
import Home from './components/home.vue'
import Welcome from './components/welcome.vue'
import Users from './components/user/users.vue'
import Rights from './components/power/rights.vue'
import Roles from './components/power/roles.vue'
import Cates from './components/goods/cates.vue'
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
			meta:['首页'],
			redirect: '/welcome',
			children: [
				{path: '/welcome',component: Welcome,meta:['后台主页']},
				{path: '/users',component: Users,meta:['用户管理','用户列表']},
				{path: '/rights',component: Rights,meta:['权限管理','权限列表']},
				{path: '/roles',component: Roles,meta:['权限管理','角色列表']},
				{path: '/goods',component: Cates,meta:['商品管理','商品分类']},
				
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