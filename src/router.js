import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'
// import Welcome from './components/welcome.vue'
// import Users from './components/user/users.vue'
// import Rights from './components/power/rights.vue'
// import Roles from './components/power/roles.vue'
// import Cates from './components/goods/cates.vue'
// import Params from './components/goods/params.vue'

Vue.use(Router)

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
 
export const constRoutes =[
		{
			path: '/login',
			component:()=>import("@/views/login.vue"),
			hidden:true
		},
		{
			path: '/',
			component : Layout,
			redirect:'/home',
			children: [{
				path:'home',
				component:()=>import(/*webpackChunkName:"home"*/ "@/views/home.vue"),
				name:'home',
				meta:{
					title:'s', // 导航菜单项标题
					icon:"qq" //导航菜单单项图标
				}
			}]
		}
	]

export const asyncRoutes = [
	{
		path : '/page',
		component: Layout,
		redirect:'/page/welcome',
		children: [
			{path: 'welcome',component: () => import("@/components/welcome.vue"),/**meta:['用户管理','用户列表'],**/meta:{title:['欢迎管理'],icon:'welcome'}},
			{path: 'users',component: () => import("@/components/user/users.vue"), /**meta:['用户管理','用户列表'],**/meta:{title:['用户列表'],icon:'home',roles:['超级管理员']}},
			{path: 'rights',component: () => import("@/components/power/rights.vue"),/*meta:['权限管理','权限列表']},*/meta:{title:['分类参数'],icon:'params',roles:['超级管理员']}},
			{path: 'roles',component: () => import("@/components/power/roles.vue"),/*meta:['权限管理','角色列表']},*/meta:{title:['角色列表'],icon:'params',roles:['超级管理员']}},
			{path: 'goods',component: () => import("@/components/goods/cates.vue"),/*meta:['商品管理','商品分类']},*/meta:{title:['商品分类'],icon:'params',roles:['超级管理员']}},
			{path: 'params',component: () => import("@/components/goods/params.vue"),/*meta:['商品管理','分类参数'],*/meta:{title:['分类参数'],icon:'params',roles:['test']}},
			]
	},
]

export default new Router({
	mode:'history',
	base: process.env.BASE_URL,
	routes: constRoutes
})