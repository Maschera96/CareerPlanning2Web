<template>
	<el-container style="height: 800px; border: 1px solid #eee">
		<el-aside width="170px" style="background-color: rgb(238, 241, 246)">
			<el-menu :default-openeds="['1', '2']">
				<el-submenu index="1">
					<template slot="title"><i class="el-icon-message"></i>工作城市</template>
					<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange"
						class="checkboxGroup">
						<el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
					</el-checkbox-group>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title"><i class="el-icon-menu"></i>岗位类型</template>
					<el-checkbox-group v-model="checkedType" @change="handleCheckedCitiesChange" class="checkboxGroup">
						<el-checkbox v-for="type in jobType" :label="type" :key="type">{{type}}</el-checkbox>
					</el-checkbox-group>
				</el-submenu>
				<!-- <el-submenu index="3">
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
				</el-submenu> -->
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
							<el-popover class="mybtn" placement="top-start" title="对不起" trigger="click" content="编辑岗位功能暂未开放!">
								<el-button size="mini" @click="editJob(scope.row)" slot="reference">编辑</el-button>
							</el-popover>
							<el-popconfirm confirm-button-text='删除' cancel-button-text='不用了' icon="el-icon-info"
								icon-color="red" title="确定删除该岗位嘛？" @confirm="deleteJob(scope.row)">
								<el-button size="mini" type="danger" slot="reference">删除</el-button>
							</el-popconfirm>
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
				name: '',
				checkedCities: ['上海', '北京'],
				cities: ['上海', '北京', '广州', '深圳', '杭州'],
				checkedType: ['运营', '研发'],
				jobType: ['运营', '研发', '销售', '管理'],
			}
		},
		onLoad(e) {
			this.index = e.indexCode
			this.name = e.companyName
			// this.load(e.indexCode)
		},
		onShow() {
			this.checkedCities = []
			this.checkedType = []
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
						// uni.request({
						// 	url: `http://1.15.175.248:8002/job/get/${this.job[0].indexCode}/0002`,
						// 	success: (res) => {
						// 		console.log(res);
						// 	}
						// })
					}
				})
			},
			handleCheckedCitiesChange(value) {
				let [pageIndex, pageSize] = [1, 10]
				let _jobPlace, _jobType
				if(this.checkedCities.length === 0){_jobPlace = this.cities.join(' ')}else{_jobPlace = this.checkedCities.join(' ')}
				if(this.checkedType.length === 0){_jobType = this.jobType.join(' ')}else{_jobType = this.checkedType.join(' ')}
				uni.request({
					url: `http://1.15.175.248:8004/search/job/${pageIndex}/${pageSize}`,
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: {
						'jobPlaces': _jobPlace,
						'jobTypes': _jobType,
						'companyIndexCode': this.index
					},
					success: (res) => {
						console.log(res);
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
			newJob() {
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

	.checkboxGroup {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
	}

	.el-checkbox {
		margin: 10px 0px 10px 40px;
	}
</style>
