<template>
	<el-row>
		<el-col class="top" :span="4" v-for="(item, index) in company" :key="index" :offset="index%3 > 0 ? 2 : 4">
			<el-card :body-style="{ padding: '0px' }" shadow="hover" class="card">
				<div class="img">
					<img :src="item.companyLogo"
						class="image">
				</div>
				<div style="padding: 14px;">
					<span style="color: #409EFF;">{{ item.companyName }}</span>
					<div class="bottom clearfix">
						<time class="time">{{ item.slogan }}</time>
						<el-button type="text" class="button">删除</el-button>
					</div>
				</div>
			</el-card>
		</el-col>
		<el-col class="top" :span="4" :offset="(company.length)%3 > 0 ? 2 : 4" @click="newCompany()">
			<el-card :body-style="{ padding: '0px' }" shadow="hover" class="card">
				<div class="img">
					<image src=/static/tianjia.png alt="添加"/>
				</div>
				<div class="content">
					<span style="color: #409EFF;">添加企业</span>
					<!-- <div class="bottom clearfix">
						<time class="time">{{ item.slogan }}</time>
						<el-button type="text" class="button">删除</el-button>
					</div> -->
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				currentDate: new Date(),
				company: []
			};
		},
		created: function() {
			let pageIndex = 1
			let pageSize = 5

			uni.request({
				url: `http://1.15.175.248:8000/company/list/${pageIndex}/${pageSize}`,
				method: 'GET', 
				success: (res) => {
					this.company = res.data.data.data
					console.log(this.company);
				},
				fail: (err) => {
					console.log('failed', err);
				}
			})
		},
		methods:{
			newCompany:() => {
				console.log('start goto');
				uni.navigateTo({
					url: 'newCompany'
				})
			}
		}
	}
</script>

<style>
	.time {
		font-size: 13px;
		line-height: 20px;
		color: #999;
	}
	
	.top{
		margin-top: 50px;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}
	
	.img{
		padding: 20px;
		height: 130px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.img image{
		height: 130px;
		width: 130px;
	}

	.button {
		padding: 5px;
		float: right;
	}

	.image {
		width: 100%;
		display: block;
	}
	
	.content{
		padding: 14px;
		display: flex;
		justify-content: center;
	}
	
	.card{
		height: 280px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}
</style>
