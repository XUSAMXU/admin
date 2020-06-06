<template>
	<div class="home">
		welcome to my pro
		<el-button type="info" @click='logout'>退出</el-button>
	</div>
</template>

<script>
	export default {
		name:'home',
		methods:{
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
			}
		}
	}
</script>

<style>
</style>
