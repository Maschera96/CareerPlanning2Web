<template>
	<el-row class="row">
		<span>{{title}}</span>
		<view class="necessary">(必填)</view>
	</el-row>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
			}
		}
	}
</script>

<style>
	.row{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.necessary{
		color: red;
		font-size: 10rpx;
	}
</style>
