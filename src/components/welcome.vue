<template>
	<div class="welcome">
		welcome to admin
	</div>
</template>

<script>
	export default {
		created() {
			this.getMenu()
		},
		methods:{
			async getMenu(){
				const { data:res } = await this.$http.get('menus')
				console.log(res);
			}
		}
	}
</script>

<style>
</style>
