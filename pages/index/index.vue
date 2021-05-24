<template>
	<el-row>
		<el-col class="top" :span="4" v-for="(item, index) in company" :key="index" :offset="index%3 > 0 ? 2 : 4">
			<el-card :body-style="{ padding: '0px' }" shadow="hover" class="card">
				<div @click="gotoCompany(item)">
					<div class="img">
						<img :src="item.companyLogo"
							class="image">
					</div>
					<div style="padding: 14px;">
						<span style="color: #409EFF;">{{ item.companyName }}</span>
						<div class="bottom clearfix">
							<time class="time">{{ item.slogan }}</time>
						</div>
					</div>
				</div>
				<el-popconfirm
				class="btn"
				  confirm-button-text='删除'
				  cancel-button-text='不用了'
				  icon="el-icon-info"
				  icon-color="red"
				  title="确定删除该公司嘛？"
				  @confirm="deleteCompany(item)"
				>
					<el-button  type="text" class="button" slot="reference">删除</el-button>
				</el-popconfirm>
			</el-card>
		</el-col>
		<div @tap="newCompany()">
			<el-col class="top" :span="4" :offset="(company.length)%3 > 0 ? 2 : 4">
				<el-card :body-style="{ padding: '0px' }" shadow="hover" class="card">
					<div class="img">
						<image class="tianjia" src=/static/tianjia.png alt="添加"/>
					</div>
					<div class="content">
						<span style="color: #409EFF;">添加企业</span>
					</div>
				</el-card>
			</el-col>
		</div>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				company: [],
			}
		},
		onShow() {
			this.load()
		},
		methods: {
			newCompany:() => {
				uni.navigateTo({
					url: '/pages/index/newCompany'
				})
			},
			deleteCompany:function(e){
				console.log(e.indexCode);
				uni.request({
					url: `http://1.15.175.248:8000/company/delete/${e.indexCode}`,
					method: 'DELETE',
				}).then(() => {
					this.load()
				})
			},
			stopPropagation(e){
				console.log(e);
				even.stopPropagation()
			},
			gotoCompany(item){
				console.log(item.companyName);
				uni.navigateTo({
					url: `/pages/index/position/position?indexCode=${item.indexCode}&companyName=${item.companyName}`
				})
			},
			load: function(){
				let pageIndex = 1
				let pageSize = 10
				
				uni.request({
					url: `http://1.15.175.248:8000/company/list/${pageIndex}/${pageSize}`,
					method: 'GET', 
					success: (res) => {
						this.company = res.data.data.data
						// console.log(this.company);
					},
					fail: (err) => {
						console.log('failed', err);
					}
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
		height: 110px;
		width: 110px;
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
		position: relative;
	}
	
	.btn{
		position: absolute;
		right: 5px;
		bottom: 5px;
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
