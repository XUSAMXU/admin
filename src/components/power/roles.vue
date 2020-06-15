<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="( item,index ) in $route.meta" :key='index'>
				{{item}}
			</el-breadcrumb-item>
		</el-breadcrumb>

		<el-card>
			<el-row>
				<el-col :span="4">
					<el-button type='primary'>添加角色</el-button>
				</el-col>
			</el-row>
			<el-table :data="rolesList" border stripe>
				<el-table-column type="expand">
					<template v-slot="scope">
						<el-row :class="['vcenter','bdbottom', i1===0 ? 'bdtop': '']" v-for="(item1,i1) in scope.row.children" :key="item1.id">
							<el-col :span="5">
								<el-tag style="margin: 7px;">
									{{item1.authName}}
								</el-tag>
							</el-col>
							<el-col :span="19">
								<el-row :class="['vcenter',i2 === 0 ? '' : 'bdtop']" v-for="(item2,i2) in item1.children" :key="item2.id">
									<el-col :span="6">
										<el-tag type="success" style="margin: 7px;">
											{{item2.authName}}
										</el-tag>
									</el-col>
									<el-col :span="18">
										<el-tag type="warning" @close="removeRightById(scope.row,item3.id)" closable :class="['vcenter',i3 === 0 ? '' : 'bdtop']" v-for="(item3,i3) in item2.children" :key="item3.id">
											{{item3.authName}}
										</el-tag>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
					</template>
				</el-table-column>
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column label="角色名称" prop="roleName"></el-table-column>
				<el-table-column label="角色描述" prop="roleDesc"></el-table-column>
				<el-table-column label="操作" width="300px">
					<template v-slot="scope">
						<el-button  size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
						<el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
						<el-button @click="showRights(scope.row)"  size="mini" type="warning" icon="el-icon-setting">分配角色</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		
		<el-dialog title="编辑权限" :visible.sync="showRightsVisable" width="50%">
			<el-tree ref="tree" :default-checked-keys="defkeys" node-key="id" default-expand-all show-checkbox :data="rightList" :props="treeProps"></el-tree>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showRightsVisable = false">取 消</el-button>
				<el-button type="primary" @click="allotRight">确 定</el-button>
			</span>
		</el-dialog>
		
		
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				rolesList: [],
				rightList: [],
				showRightsVisable: false,
				roleId :0,
				treeProps:{
					label:'authName',
					children:'children'
				},
				defkeys:[],
			}
		},
		created() {
			this.getRightsList()
		},
		methods: {
			async getRightsList() {
				const {
					data: res
				} = await this.$http.get('/roles')
				if (res.meta.status !== 200) return this.$message.error('获取失败')
				this.rolesList = res.data
			},
			async removeRightById(role, rightId) {
				const msg = await this.$confirm('此操作将永久删除该权限,是否继续？', '提示', {
					cconfirmBUttonText: '确定',
					concalButtonText: '取消',
					type: 'warning'
				}).catch(err => err)
				if (msg !== 'confirm') return this.$message.info('取消了删除')
				const {
					data: res
				} = this.$http.delete(`roles/${role.id}/rights/${rightId}`)

				if (res.meta !== 200) return this.$message.error("删除失败")
				role.children = res.data
			},
			async showRights(role) {
				this.roleId = role.id
				const { data:res } = await this.$http.get('rights/tree')
				if(res.meta.status !== 200) {
					return this.$message.error('获取数据失败')
				}
				this.rightList = res.data
				this.getLeafKeys(role,this.defkeys)
				this.showRightsVisable = true
				
			},
			handleClose(done = Function) {
				this.$confirm('确认关闭？')
				.then( _ => {
					this.defkeys = [];
					console.log(_)
					done();
				})
				.catch(_ => _ );
			},
			getLeafKeys (node , arr) { 
				if(!node.children){
					return arr.push(node.id)
				}
				node.children.forEach( item => {
					this.getLeafKeys(item,arr)
				})
			},
			async allotRight () {
				const keys = [
					this.$refs['tree'].getCheckedKeys(),this.$refs['tree'].getHalfCheckedKeys()
				]
				const idStr = keys.join(',')
				console.log(this.roleId);
				
				const { data:res } = await this.$http.post(`roles/${this.roleId}/rights`, {rids:idStr})
				
				if(res.meta.status !== 200) return this.$message.error('分配权限失败')
				this.$message.success('分配权限成功')
				this.getRightsList()
				this.showRightsVisable = false 
			}
		}
	}
</script>

<style>
	.bdtop {
		border-top: 1px solid #eee;
	}

	.bdbottom {
		border-bottom: 1px solid #eee;
	}

	.vcenter {
		display: flex;
		align-items: center;
	}
</style>
