<template>
	<div class="users">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item><a href="/home">活动管理</a></el-breadcrumb-item>
			<el-breadcrumb-item>活动列表</el-breadcrumb-item>
			<el-breadcrumb-item>活动详情</el-breadcrumb-item>
		</el-breadcrumb>

		<el-card>
			<el-row>
				<el-col :span='8'>
					<el-input placeholder="请输入内容" v-model="queryInfo.query" clearable>
						<el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click='dialogVisible = true'>添加用户</el-button>
				</el-col>
			</el-row>

			<el-table :data="userList" border stripe>
				<el-table-column type="index"></el-table-column>
				<el-table-column label="姓名" prop="username"></el-table-column>
				<el-table-column label="邮箱" prop="email"></el-table-column>
				<el-table-column label="电话" prop="mobile"></el-table-column>
				<el-table-column label="角色" prop="role_name"></el-table-column>
				<el-table-column label="状态" prop="mg_state">
					<template v-slot="scope">
						<el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template v-slot="scope">
						<el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable="false">
							<el-button @click="showEditDialog(scope.row.id)" type="primary" icon="el-icon-edit" size="mini"></el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="设置" placement="top" :enterable="false">
							<el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
							<el-button @click="removeUserId(scope.row.id)" type="danger" icon="el-icon-delete" size="mini"></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>

			<el-pagination :close-on-click-modal="false" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryInfo.pagenum" :page-sizes="[1,2,5,10]" :page-size="queryInfo.pagesize" :total='total' layout="total,sizes,prev,pager,next,jumper">
			</el-pagination>
		</el-card>

		<el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%"  @close="handleClose('dialogVisible','addForm')">
			<el-form :model="addForm" ref='addForm' label-width="70px" :rules='rules'>
				<el-form-item label="用户名" prop="username">
					<el-input v-model="addForm.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="addForm.password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="addForm.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机" prop="mobile">
					<el-input v-model="addForm.mobile" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addUser('addForm')">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog title="提示" :close-on-click-modal="false" :visible.sync="editDialogVisable" width="50%" @close="handleClose('editDialogVisable','editForm')">
			<el-form :model="editForm" ref='editForm' label-width="70px" :rules='rules'>
				<el-form-item label="用户名">
					<el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="editForm.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机" prop="mobile">
					<el-input v-model="editForm.mobile" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisable = false">取 消</el-button>
				<el-button type="primary" @click="editUserInfo('editForm')">确 定</el-button>
			</span>
		</el-dialog>
		
	</div>
</template>

<script>
	export default {
		data() {
			let checkEmail = (rule, value, callback = Function) => {
				const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
				if (regEmail.test(value)) {
					return callback()
				}

				callback(new Error('邮箱不合法'))
			}

			let checkMobile = (rule, value, callback = Function) => {
				const regMobile = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
				if (regMobile.test(value)) {
					return callback()
				}
				callback(new Error('手机号码不合法'))
			}
			return {
				queryInfo: {
					query: '',
					pagenum: 1,
					pagesize: 5
				},
				userList: [],
				total: 10,
				dialogVisible: false,
				editDialogVisable: false,
				addForm: {
					username: '',
					password: '',
					email: '',
					mobile: '',

				},
				editForm : {},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 6,
							message: '长度在 3 到 6 个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 10,
							message: '长度在 6 到 10 个字符',
							trigger: 'blur'
						}
					],
					email: [{
							required: true,
							message: '请输入邮箱',
							trigger: 'blur'
						},
						{
							validator: checkEmail,
							trigger: 'blur'
						}
					],
					mobile: [{
							required: true,
							message: '请输入手机号码',
							trigger: 'blur'
						},
						{
							validator: checkMobile,
							trigger: 'blur'
						}
					],

				}

			}
		},
		created() {
			this.getUserList()
		},
		methods: { 
			async showEditDialog(id) {
				console.log(id)
				const { data:res } = await this.$http.get('/users/'+id)
				if( res.meta.status !== 200 ) return this.$message.error('查询失败')
				this.editForm = res.data
				this.editDialogVisable = !this.editDialogVisable
			},
			editUserInfo(form){
				this.$refs[form].validate(async valid => {
				if (!valid) return
				const {data: res} = await this.$http.put('/users/'+this.editForm.id,{ email: this.editForm.email,mobile: this.editForm.mobile })
				if (res.meta.status !== 200) this.$message.error(res.meta.msg)
				this.getUserList()
				this.editDialogVisable = !this.editDialogVisable
				})
			},
			handleClose(bool,form) {
				this.$data[bool] = false
				this.$refs[form].resetFields();
			},
			addUser(form) {
				this.$refs[form].validate(async valid => {
					if (!valid) return
					const {
						data: res
					} = await this.$http.post('/users', this.addForm)
					console.log(res)
					if (res.meta.status !== 200) this.$message.error(res.meta.msg)
					this.getUserList()
					this.dialogVisible = !this.dialogVisible

				})
			},
			addDialogClosed(form) {
				this.$refs[form].resetFields();
			},
			async getUserList() {
				const {
					data: res
				} = await this.$http.get('/users', {
					params: this.queryInfo
				})
				if (res.meta.status !== 200) return this.$message.error('获取列表失败，请重试')
				this.userList = res.data.users;
				this.total = res.total;
			},
			handleSizeChange(newSize) {
				this.queryInfo.pagesize = newSize
				this.getUserList()
			},
			handleCurrentChange(newPage) {
				this.queryInfo.pagenum = newPage
				this.getUserList()
			},
			async userStateChange(userInfo) {
				const {
					data: res
				} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
				if (res.meta.status !== 200) {
					userInfo.mg_state = !userInfo.mg_state
					this.$message.error('修改状态失败')
				}
			},
			async removeUserId(id) {
			const msg =	await this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
					cancelButtonText: '取消',
					confirmButtonText: '确定',
					type: 'warning'
				}).catch(() => {
					this.$message({
						type: 'error',
						message: '取消删除!'
					});
				})
				
				if( msg !== 'confirm' )  return 
				
				const { data:res } = await this.$http.delete( '/users/' + id )
				console.log(res)
				if(res.meta.status !== 200) return this.$message({type: 'err',message: '删除失败'})
				this.$message({type: 'success',message: '删除成功'})
				this.getUserList()
			},
		}
	}
</script>

<style>
</style>
