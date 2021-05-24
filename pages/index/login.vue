<template>
	<div>

		<el-col :span="6" :offset="9" style="margin-top: 200px;">
			<span>账号</span>
			<el-input v-model="userName" placeholder="请输入内容" style="margin: 5px 0px 20px 0px"></el-input>
			<span>密码</span>
			<el-input v-model="password" placeholder="请输入内容" style="margin: 5px 0px 20px 0px"show-password></el-input>
			<el-row class="submit">
				<el-button type="primary" @click="submitFn()">登陆</el-button>
			</el-row>
		</el-col>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				message: '',
				userName: '',
				password: ''
			};
		},
		methods: {
			submitFn() {
				if (!(this.userName && this.password)) {
					this.$alert('请输入账号或密码', '注意', {
						confirmButtonText: '确定'
					});
					return
				}
				uni.request({
					url: `http://1.15.175.248:8007/login/admin/${this.userName}/${this.password}`,
					success: (res) => {
						console.log(res);
						if (res.data.code === -1) {
							this.$alert('账号或密码错误', '注意', {
								confirmButtonText: '确定'
							});
							return
						} else if (res.data.code === 0) {
							uni.navigateTo({
								url: 'index'
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	.submit {
		margin-top: 50px;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
</style>
