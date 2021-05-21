<template>
	<div>
		</el-alert>
		<el-row>
			<el-col :span="6" :offset="3" style="margin-top: 50px;">
				<NecessaryTitle title="岗位名称"></NecessaryTitle>
				<el-input v-model="input.jobName" placeholder="请输入内容" style="margin: 5px 0px 20px 0px"></el-input>
				<NecessaryTitle title="工作地点"></NecessaryTitle>
				<el-input v-model="input.jobPlace" placeholder="请输入内容" style="margin: 5px 0px 20px 0px">
				</el-input>
				<NecessaryTitle title="学历要求"></NecessaryTitle>
				<el-input v-model="input.educationRequirement" placeholder="请输入内容" style="margin: 5px 0px 20px 0px">
				</el-input>
				<NecessaryTitle title="岗位类型"></NecessaryTitle>
				<el-input v-model="input.jobType" placeholder="请输入内容" style="margin: 5px 0px 20px 0px"></el-input>
				<NecessaryTitle title="薪资"></NecessaryTitle>
				<el-input v-model="input.salary" placeholder="请输入内容" style="margin: 5px 0px 20px 0px"></el-input>
				<!-- <span>企业产品</span>
				<el-input  placeholder="请输入内容" style="margin: 5px 0px 20px 0px"></el-input> -->
				<NecessaryTitle title="岗位职责"></NecessaryTitle>
				<el-input v-model="input.jobDuty" placeholder="请输入内容" style="margin: 5px 0px 20px 0px"></el-input>
				<NecessaryTitle title="岗位要求"></NecessaryTitle>
				<el-input style="margin: 5px 0px 20px 0px" type="textarea" :rows="3" placeholder="请输入内容"
					v-model="input.jobRequirement">
				</el-input>
			</el-col>
			<el-col :span="6" :offset="5" style="margin-top: 50px;">
				<!-- <span>推荐课程</span>
				<el-input v-model="input.courses[0].courseName" placeholder="请输入内容" style="margin: 5px 0px 20px 0px"></el-input> -->
			</el-col>
		</el-row>
		<el-row class="submit">
			<el-button type="primary" @click="submitFn()">提交</el-button>
		</el-row>
		<el-row class="submit"></el-row>
	</div>
</template>

<script>
	import NecessaryTitle from '@/components/NecessaryTitle.vue'

	export default {
		components: {
			NecessaryTitle
		},
		data() {
			return {
				input: {
					"jobName": "前端工程师",
					"companyIndexCode": "",
					"jobPlace": "杭州",
					"educationRequirement": "本科及以上",
					"jobType": "研发",
					"salary": "7k-10k",
					"jobDuty": "吃喝玩乐打游戏",
					"jobRequirement": "会吃会玩",
					// "courses": [
					// 	{
					// 		"indexCode": "A123321",
					// 		"courseName": "操作系统",
					// 		"courseType": "必修"
					// 	}
					// ]
				}
			};
		},
		onLoad: function(e) {
			console.log(e.companyIndexCode);
			this.input.companyIndexCode = e.companyIndexCode
		},
		methods: {
			submitFn() {
				for (let key in this.input) {
					if (!this.input[key]) {
						this.$alert(`未填写${key}`, '请填写必填项', {
							confirmButtonText: '确定',
							// callback: action => {
							// 	this.$message({
							// 		type: 'info',
							// 		message: `action: ${ action }`
							// 	});
							// }
						});
						return
					}
				}
				// this.input.companyLogo = this.imageUrl
				console.log('上传前数据没有任何问题');
				uni.request({
					url: 'http://1.15.175.248:8002/job/add',
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: this.input
				}).then((res) => {
					console.log(res);
					this.$alert('新增岗位成功', '请确认', {
						confirmButtonText: '确定',
						callback: action => {
							uni.navigateBack({})
						}
					});
					// uni.navigateBack({})
				})
			}
		},
	}
</script>

<style>
	.submit {
		display: flex;
		justify-content: center;
		margin-top: 50px;
	}

	.mybtn {
		height: 40px;
		width: 98px;
	}

	.avatar-uploader {
		max-width: 180px;
		border: 1px dashed #8e8e8e;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		margin: 5px 0px 20px 0px;
	}

	.avatar-uploader:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
