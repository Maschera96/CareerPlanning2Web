<template>
	<el-container style="height: 800px; border: 1px solid #eee">
		<el-aside width="200px" style="background-color: rgb(238, 241, 246)">
			<el-menu :default-openeds="['1', '3']">
				<el-submenu index="1">
					<template slot="title"><i class="el-icon-message"></i>导航一</template>
					<el-menu-item-group>
						<template slot="title">分组一</template>
						<el-menu-item index="1-1">选项1</el-menu-item>
						<el-menu-item index="1-2">选项2</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="分组2">
						<el-menu-item index="1-3">选项3</el-menu-item>
					</el-menu-item-group>
					<el-submenu index="1-4">
						<template slot="title">选项4</template>
						<el-menu-item index="1-4-1">选项4-1</el-menu-item>
					</el-submenu>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title"><i class="el-icon-menu"></i>导航二</template>
					<el-menu-item-group>
						<template slot="title">分组一</template>
						<el-menu-item index="2-1">选项1</el-menu-item>
						<el-menu-item index="2-2">选项2</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="分组2">
						<el-menu-item index="2-3">选项3</el-menu-item>
					</el-menu-item-group>
					<el-submenu index="2-4">
						<template slot="title">选项4</template>
						<el-menu-item index="2-4-1">选项4-1</el-menu-item>
					</el-submenu>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title"><i class="el-icon-setting"></i>导航三</template>
					<el-menu-item-group>
						<template slot="title">分组一</template>
						<el-menu-item index="3-1">选项1</el-menu-item>
						<el-menu-item index="3-2">选项2</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="分组2">
						<el-menu-item index="3-3">选项3</el-menu-item>
					</el-menu-item-group>
					<el-submenu index="3-4">
						<template slot="title">选项4</template>
						<el-menu-item index="3-4-1">选项4-1</el-menu-item>
					</el-submenu>
				</el-submenu>
			</el-menu>
		</el-aside>

		<el-container>
			<el-header style="text-align: right; font-size: 12px">
				<el-dropdown @command="newJob()">
					<i class="el-icon-setting" style="margin-right: 15px"></i>
					<el-dropdown-menu slot="dropdown">
						<!-- <el-dropdown-item>查看</el-dropdown-item> -->
						<el-dropdown-item>新增</el-dropdown-item>
						<!-- <el-dropdown-item>删除</el-dropdown-item> -->
					</el-dropdown-menu>
				</el-dropdown>
				<span>{{name}}</span>
			</el-header>

			<el-main>
				<el-table :data="job">
					<el-table-column prop="jobPlace" label="工作地点" width="140">
					</el-table-column>
					<el-table-column prop="jobType" label="岗位类型" width="100">
					</el-table-column>
					<el-table-column prop="jobName" label="岗位名称" width="120">
					</el-table-column>
					<el-table-column prop="jobRequirement" label="岗位要求">
					</el-table-column>
					<el-table-column label="操作" width="150">
						<template slot-scope="scope">
							<el-button class="mybtn" size="mini" @click="editJob(scope.row)">编辑</el-button>
							<el-popconfirm
							  confirm-button-text='删除'
							  cancel-button-text='不用了'
							  icon="el-icon-info"
							  icon-color="red"
							  title="确定删除该岗位嘛？"
							  @confirm="deleteJob(scope.row)"
							>
								<el-button size="mini" type="danger" slot="reference">删除</el-button>
							</el-popconfirm>
							<!-- <el-button size="mini" type="danger" @click="deleteJob(scope.row)">删除</el-button> -->
						</template>
					</el-table-column>
				</el-table>
			</el-main>
		</el-container>
	</el-container>

</template>

<script>
	export default {
		data() {
			const item = {
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			};
			return {
				tableData: Array(20).fill(item),
				job: [],
				name: ''
			}
		},
		onLoad(e) {
			this.index = e.indexCode
			this.name = e.companyName
			this.load(e.indexCode)
		},
		onShow() {
			this.load(this.index)
		},
		methods: {
			load(index) {
				let [companyIndexCode, pageIndex, pageSize] = [index, 1, 10]
				console.log(companyIndexCode, pageIndex, pageSize);
				uni.request({
					url: `http://1.15.175.248:8002/job/list/${companyIndexCode}/${pageIndex}/${pageSize}`,
					success: (res) => {
						console.log(res.data.data.data);
						this.job = res.data.data.data
					}
				})
			},
			editJob(item) {
				console.log('edit', item.jobName);
			},
			deleteJob(item) {
				console.log('delete', item.jobName);
				uni.request({
					url: `http://1.15.175.248:8002/job/delete/${item.indexCode}`,
					method: 'DELETE',
					success: () => {
						this.load(this.index)
					}
				})
			},
			newJob(){
				console.log('newJob');
				uni.navigateTo({
					url: `/pages/index/position/newPosition?companyIndexCode=${this.index}`
				})
			}
		}
	}
</script>

<style>
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}

	.el-aside {
		color: #333;
	}
	
	.mybtn{
		margin-right: 10px;
	}
</style>
