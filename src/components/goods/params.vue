<!-- eslint disabled -->
<template>
	<div id="params">
		<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item v-for="( item,index ) in $route.meta" :key='index'>
				{{item}}
				</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<el-alert :closable="false" show-icon type="warning" title="注意:只允许为第三级分类设置相关参数!"></el-alert>
			<el-row class="cat_pot">
				<el-col :span='10' >
					<span>选择商品分类:</span>
					<el-cascader :props="cateProps"  clearable  :show-all-levels="false" expand-trigger="hover" :options="cateList"  v-model="value" @change="handleChange"></el-cascader>
				</el-col>
			</el-row>
			
			<template>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<!-- 动态参数 -->
				<el-tab-pane label="用户管理" name="many">
					<el-button type="primary" :disabled="isBtnDisable"  size="mini">添加参数</el-button>
					<el-table :data="difTableData" border stripe>
						<el-table-column type='index'></el-table-column>
						<el-table-column label="参数名称" prop="attr_name"></el-table-column>
						<el-table-column lbael="操作">
							<template v-slot="scope">
								<span v-if="false">{{scope}}</span>
								<el-button>编辑</el-button>
								<el-button type="danger">删除</el-button>
							</template>
						</el-table-column>

					</el-table>
				</el-tab-pane>
				<!-- 静态属性 -->
				<el-tab-pane label="配置管理" name="only">
					<el-button type="primary" :disabled="isBtnDisable" size="mini">添加属性</el-button>
				<el-table :data="difTableData" border stripe>
					<el-table-column type='index'></el-table-column>
					<el-table-column label="参数名称" prop="attr_name"></el-table-column>
					<el-table-column lbael="操作">
						<template v-slot="scope">
							<span v-if="false">{{scope}}</span>
							<el-button>编辑</el-button>
							<el-button type="danger">删除</el-button>
						</template>
					</el-table-column>
				
				</el-table>
				</el-tab-pane>
			</el-tabs>
			</template>
			
		</el-card>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				activeName:'many',
				cateList:[],
				value:[],
				cateProps:{
					value:'cat_id',
					label:'cat_name',
					children: 'children'
				},
				manyTableData:[],
				onlyTableData:[],
				diff:1
			}
		},
		created(){
			this.getCateList()
		},
		computed:{
			difTableData(){
				if(this.activeName === 'many') {
					return this.manyTableData
				}  else {
					return this.onlyTableData
				}
			},
			isBtnDisable() {
				if(this.value.length !== 3) {
					return true
				}
				return false
			},
			cateId(){
				if(this.value.length === 3 ) {
					return this.value[2]
				} else {
					return ''
				}
			}
		},
		methods:{
			async getCateList(){
				const {data:res} = await this.$http.get('/categories')
				if(res.meta.status !== 200) {
					return this.$message.error('获取数据失败')
				}
				this.cateList = res.data
			},
			handleChange(){
				this.getParamsData()
			},
			handleClick(){
				this.getParamsData()
			},
			async getParamsData(){
				if(this.value.length !== 3) return
				const { data:res } = await this.$http.get(`/categories/${this.cateId}/attributes`,{params:{sel:this.activeName}})
				if(res.meta.status !== 200) {
					return this.$message.error('获取数据失败')
				}
				if(this.activeName === "many") {
					this.manyTableData = res.data
				} else {
					this.onlyTableData = res.data
				}
			}
			
			
		}
	}
</script>

<style>
.cat_pot{
	margin-top: 15px;
	text-align: left;
}
.el-cascader {
	width: 50% !important;
	margin-left: 10px;
}
</style>
