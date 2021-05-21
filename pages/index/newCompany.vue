<template>
	<div>
		</el-alert>
		<el-row>
			<el-col :span="6" :offset="3" style="margin-top: 50px;">
				<NecessaryTitle title="企业名称"></NecessaryTitle>
				<el-input v-model="input.companyName" placeholder="请输入内容" style="margin: 5px 0px 20px 0px"></el-input>
				<NecessaryTitle title="企业地址"></NecessaryTitle>
				<el-input v-model="input.companyAddress" placeholder="请输入内容" style="margin: 5px 0px 20px 0px">
				</el-input>
				<NecessaryTitle title="融资情况"></NecessaryTitle>
				<el-input v-model="input.financing" placeholder="请输入内容" style="margin: 5px 0px 20px 0px"></el-input>
				<NecessaryTitle title="企业规模"></NecessaryTitle>
				<el-input v-model="input.scale" placeholder="请输入内容" style="margin: 5px 0px 20px 0px"></el-input>
				<NecessaryTitle title="企业类型"></NecessaryTitle>
				<el-input v-model="input.companyType" placeholder="请输入内容" style="margin: 5px 0px 20px 0px"></el-input>
				<!-- <span>企业产品</span>
				<el-input  placeholder="请输入内容" style="margin: 5px 0px 20px 0px"></el-input> -->
				<NecessaryTitle title="企业官网"></NecessaryTitle>
				<el-input v-model="input.website" placeholder="请输入内容" style="margin: 5px 0px 20px 0px"></el-input>
				<NecessaryTitle title="企业介绍"></NecessaryTitle>
				<el-input style="margin: 5px 0px 20px 0px" type="textarea" :rows="3" placeholder="请输入内容"
					v-model="input.introduction">
				</el-input>
			</el-col>
			<el-col :span="6" :offset="5" style="margin-top: 50px;">
				<NecessaryTitle title="企业logo"></NecessaryTitle>
				<el-upload class="avatar-uploader" action="http://1.15.175.248:8001/file/upload" :show-file-list="false"
					:on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="input.companyLogo" :src="input.companyLogo" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<NecessaryTitle title="企业内容"></NecessaryTitle>
				<el-input v-model="input.content" placeholder="请输入内容" style="margin: 5px 0px 20px 0px"></el-input>
				<NecessaryTitle title="企业标语"></NecessaryTitle>
				<el-input v-model="input.slogan" placeholder="请输入内容" style="margin: 5px 0px 20px 0px"></el-input>
				<NecessaryTitle title="企业全称"></NecessaryTitle>
				<el-input v-model="input.fullName" placeholder="请输入内容" style="margin: 5px 0px 20px 0px"></el-input>
				<NecessaryTitle title="成立时间"></NecessaryTitle>
				<el-input v-model="input.establishTime" placeholder="请输入内容" style="margin: 5px 0px 20px 0px"></el-input>
				<NecessaryTitle title="法人"></NecessaryTitle>
				<el-input v-model="input.legalPerson" placeholder="请输入内容" style="margin: 5px 0px 20px 0px"></el-input>
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
					"companyName": "测试公司111",
					"companyLogo": "",
					"interviewScore": 4,
					"companyAddress": "浙江省杭州市江干区白杨街道777号",
					"financing": "C轮",
					"scale": "1000人以上",
					"companyType": "文娱",
					"content": "很牛逼的一家公司",
					"slogan": "我们很牛逼",
					"introduction": "说了很牛逼，就是很牛逼",
					"products": [],
					"website": "www.yyfyyf.com",
					"fullName": "杭州测试111股份有限公司",
					"establishTime": "2000-01-01",
					"registerMoney": 500,
					"legalPerson": "张三"
				}
			};
		},
		onLoad: function() {

		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.input.companyLogo = URL.createObjectURL(file.raw);
				this.imageUrl = res.data
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			submitFn() {
				for (let key in this.input) {
					if (!this.input[key] && key !== 'products') {
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
				this.input.companyLogo = this.imageUrl
				console.log('没有任何问题');
				uni.request({
					url: 'http://1.15.175.248:8000/company/add',
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: this.input
				}).then((res) => {
					console.log(res[1].data.data);
					uni.navigateBack({})
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
