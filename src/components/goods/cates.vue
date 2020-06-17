<template>
	<div id="goods">
		<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item v-for="( item,index ) in $route.meta" :key='index'>
				{{item}}
				</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<el-row>
				<el-col>
					<el-button @click="showAddCateDialog" type="primary">添加分类</el-button>
				</el-col>
			</el-row>
			<!-- 表格 -->
			<tree-table class="treeTable" border index-text="#" show-index :expand-type="false" :selection-type="false" :data="cateList" :columns="columns">
				<template v-slot:isok="scope">
					<i style="color:lightgreen;" class="el-icon-success" v-if="scope.row.cat_deleted === false"></i>
					<i class="el-icon-error" v-else></i>
				</template>
				
				<template v-slot:order="scope">
					<el-tag type="primary" size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
					<el-tag type="success" size="mini" v-else-if="scope.row.cat_level === 1">二级</el-tag>
					<el-tag type="warning" size="mini" v-else>三级</el-tag>
				</template>
				
				<template v-slot:opt="scope">
					<div v-show="false"> {{scope}}</div>
					<el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
					<el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
				</template>
			</tree-table>
			<!-- 分页 -->
			<el-pagination :close-on-click-modal="false" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryInfo.pagenum" :page-sizes="[3,5,10,15]" :page-size="queryInfo.pagesize" :total='total' layout="total,sizes,prev,pager,next,jumper">
			</el-pagination>
			<!-- 添加分类对话框 -->
			
			<el-dialog @close="handleClosed('addCateFormRef')" title="添加分类" :visible.sync="addCateDialogVisable" width="30%">
				<!-- 添加分类表单 -->
				<div class="left-text">
					<el-form :model="addCateForm"  :rules="addCateFormRules" ref="addCateFormRef" label-width="20%" >
						<el-form-item label="分类名称:" prop="cat_name">
							<el-input v-model="addCateForm.cat_name"></el-input>
						</el-form-item>
						<el-form-item label="父级分类:" prop="cat_name">
							<el-cascader  clearable change-on-select checkStrictly :show-all-levels="false" expand-trigger="hover" :props="cascaderProps" :options="parentCateList"  v-model="value" @change="handleChange"></el-cascader>
						</el-form-item>
					</el-form>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="addCateDialogVisable = false">取 消</el-button>
					<el-button type="primary" @click="addCate">确 定</el-button>
				</span>
			</el-dialog>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//商品分类数据列表
				cateList:[],
				addCateDialogVisable:false,
				queryInfo:{
					pagenum: 1,
					pagesize: 5
				},
				total:0,
				columns:[
					{
						label:"分类名称",
						prop:'cat_name'
					},
					{
						label:"是否邮箱",
						type: 'template',
						template: 'isok'
					},
					{
						label:"排序",
						type: 'template',
						template: 'opt',
						
					}
				],
				addCateFormRules:{
					cat_name:[
						{required:true,message:'请输入分类名称', trigger: 'blur'},
					]
				},
				addCateForm:{
					cat_pid: 0,
					cat_level: 0 ,
					cat_name: ''
				},
				parentCateList:[],
				cascaderProps:{
					value:'cat_id',
					label:'cat_name',
					children: 'children'
				},
				value:[]
			}
		},
		created(){
				this.getCateList()
		},
		methods:{
			async getParentList(){
				const { data:res } = await this.$http.get('/categories',{params:{type:2}})
				if( res.meta.status !== 200 ) this.$message.error(res.meta.msg)
				this.parentCateList = res.data
			},
			async getCateList() {
				const { data:res } = await this.$http.get('/categories',{params:this.queryInfo})
				if( res.meta.status !== 200 ) this.$message.error(res.meta.msg)
				this.cateList = res.data.result
				this.total = res.data.total
			},
			handleSizeChange(newSize){
				this.queryInfo.pagesize = newSize
				this.getCateList()
			},
			handleCurrentChange(newPage){
				this.queryInfo.pagenum = newPage
				this.getCateList()
			},
			showAddCateDialog(){
				this.addCateDialogVisable = true
				this.getParentList()
			} ,
			handleClosed(form){ 
				this.value =[]
				this.addCateForm.cat_level = 0
				this.addCateForm.cat_pid = 0
				this.$refs[form].resetFields()
				this.addCateDialogVisable = false
			},
			handleChange(){ 
				if(this.value.length > 0) {
					this.addCateForm.cat_pid = this.value[this.value.length -1]
					this.addCateForm.cat_level = this.value.length
				} else {
					this.addCateForm.cat_pid = 0
					this.addCateForm.cat_level = 0
				}
			},
			addCate(){
				this.$refs.addCateFormRef.validate(async valid => {
					if(!valid) return 
					const { data:res } = await this.$http.post('/categories',this.addCateForm)
					if( res.meta.status !== 200 ) this.$message.error(res.meta.msg)
					this.$message.success('添加成功')
					this.getCateList()
					this.addCateDialogVisable = false
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.treeTable{
		margin-top:  15px;
	}
	
</style>
