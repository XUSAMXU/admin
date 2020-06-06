<template>
	<div class="login_container">
	<div class="login_box">
		<div class="avatar_box">
			<img src="../assets/logo.png" alt="">ss
		</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0" class="login_form">
			<!-- 用户名 -->
			<el-form-item prop="username">
				<el-input placeholder="请输入用户名" v-model="ruleForm.username" prefix-icon="el-icon-user"></el-input>
			</el-form-item>
			<!-- 密码 -->
			<!-- 按钮区域 -->
			<el-form-item prop="password">
				<el-input placeholder="请输入密码" type="password" v-model="ruleForm.password" prefix-icon="el-icon-user-solid"></el-input>
			</el-form-item>
			<!-- 按钮区域 -->
			<el-form-item class="btns">
				<el-button @click="login('ruleForm')" type="primary">登陆</el-button>
				<el-button type="info" @click="resetLoginForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
		
	</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				ruleForm: {
					username:'',
					password:'',
				},
				rules: {
					username:[  
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
						],
					password:[
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
					]
				}
			}
		},
		methods: {
			change(e) {
				this.$emit('input',e)
			},
			login(formName) {
				this.$refs[formName].validate(async valid => {
					if(!valid) {
						return
					} else {
						const { data:res } =await this.$http.post('login',this.ruleForm)
						console.log(res);
						if(res.meta.status != 200) return this.$message.error('登陆失败');
						this.$message.success('登陆成功')
						window.sessionStorage.setItem('token',res.data.token)
						this.$router.push('/home')
					}
				})
			},
			resetLoginForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
		
	}
</script>

<style lang="less" scoped="scoped">
.login_container{
		height: 100%;
		background: #2b4b6b;
}	
.login_box{
	width: 40%;
	height: 300px;
	background-color: #fff;
	position: absolute;
	left: 50%;
	top: 50%;
	// margin-left: -20%;
	transform: translate(-50%,-50%);
	.avatar_box {
		height: 130px;
		width: 130px;
		border-radius: 50%;
		padding: 20px;
		border: 1px solid #eee;
		position:  absolute;
		left: 50%;
		transform: translate(-50%,-50%);
		img{
			width: 100%;
			height: 100%;
			border-radius: 50%;
			background: #eee;
		}
	}
}
.login_form {
	width: 100%;
	position: absolute;
	padding: 0 20px;
	box-sizing: border-box;
	bottom: 20px;
}
.btns {
	display: flex;
	justify-content: flex-end;
}
</style>
