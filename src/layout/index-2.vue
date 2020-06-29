<template>
	<div class="home">
		<el-container class='container'>
			<el-header>
				<div>
					Header
				</div>
				<el-button class="logout" type="info" @click='logout'>退出</el-button>
			</el-header>
			<el-container style="border: 1px solid #eee">
				<el-aside :width="!isCollapse ? '200px' : '64px'" style="background-color: rgb(238, 241, 246)">
					<div class="toggle" @click="collapse"> ||| </div>
					<el-menu :default-active="$route.path" router :default-openeds="['1']" unique-opened :collapse="isCollapse" :collapse-transition="false">
						<el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
							<template slot="title">
								<i :class="iconList[item.id]"></i>
								<span>{{item.authName}}</span>
							</template>
								<el-menu-item is-active-color="#409EFF"  :index="'/'+child.path" v-for="child in item.children" :key="child.id"> 
									<template slot="title">
										<i class="el-icon-menu"></i>
										<span>{{child.authName}}</span>
									</template>
								</el-menu-item>
						</el-submenu>
					</el-menu>
				</el-aside>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	
	</div>
</template>

<script>
	export default {
		name:'home',
		data(){
			return {
				menuList:[],
				iconList:{
					'125': 'el-icon-user',
					'103': 'el-icon-star-on',
					'102': 'el-icon-s-goods',
					'101': 'el-icon-c-scale-to-original',
					'145': 'el-icon-s-opportunity'
				},
				isCollapse: false
			}
		},
		created () {
			this.getMenuList()
		},
		methods:{
			collapse(){
				this.isCollapse = !this.isCollapse;
			},
			remove() {
				return new Promise(resolve=>{
					setTimeout(()=>{
						window.sessionStorage.removeItem('token');
						resolve('退出成功');
					},1000)
				})
			},
			logout() {
				this.remove().then(resolve =>{
				console.log(resolve);
				this.$router.push('./login')
			})
			},
			getMenuList: async function() {
				const { data:res } = await this.$http.get('menus')
				if( res.meta.status !== 200 ) return this.$message.error('res.meta.msg')
				this.menuList = res.data
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.home,.container {
		height: 100%;
	}
	.el-menu-item {
		padding:0 70px !important;
	}
	.el-header {
		background-color: #2C3E50;
		display: flex;
		justify-content: space-between;
		padding-left: 0;
		align-items: center;
		color: #fff;
		font-size: 20px;
		div {
			display: flex;
			align-items: center;
		}
	}
	.el-aside {
		background-color: #333744;
	}
	.el-main {
		background-color: #eeeeee;
	}
	.logout {
		float: right;
	}
	.toggle {
		background-color: #5daf34;
		cursor: pointer;
		color: #FFF;
	}
	.el-container {
		border: 0 !important;
	}
</style>
