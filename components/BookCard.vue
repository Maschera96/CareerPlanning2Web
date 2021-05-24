<template>
	<view class="ro">
		<image class="imag_" :src="imgurl"></image>
		<view class="cul">
			<text class="text-title_">{{booktitle}}</text>
			<text class="text-introtion_">作者: {{author}}</text>
			<text class="text-introtion_">出版社: {{publish}}</text>
		</view>
	</view>
	<!-- <view class="course_item">
		<view class="level">{{level}}</view>
		<view class="courseone">
			<view class="course_name">{{courseName}}</view>
			<view class="course_summary">{{collegeName}}</view>
		</view>
		<view :class="[req == '必修'?'course_request1':'course_request2']">{{req}}</view>
	</view> -->
</template>

<script>
	export default {
		props: {
			imgurl: {
				type: String,
			},
			title: {
				type: String,
			},
			author: {
				type: String,
			},
			publish: {
				type: String,
			}
		},
		data() {
			let booktitle = this.title.split(' ')[0]
			console.log(booktitle);
			return {
				booktitle: booktitle
			};
		},
		created: function() {
		},
		methods:{
		}
	}
</script>

<style>
	.ro {
		border: 1px solid #ffffff;
		border-radius: 4px;
		box-shadow: 0px 3px 6px #e6e6e6;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		flex-direction: row;
		width: 270px;
		height: 110px;
		margin-top: 10px;
		padding: 0px 10px;
		align-items: center;
		justify-content: space-around;
	}
	
	.imag_ {
		width: 80px;
		height: 90px;
		background-color: #eeeeee;
	}
	
	.cul {
		display: flex;
		flex-direction: column;
		width: 65%;
		/* background-color: #FFFFFF; */
	}
	
	.text-title_ {
		font-size: 16px;
		font-weight: bold;
		color: #5f656c;
		margin-bottom: 8px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.text-introtion_ {
		color: #AAAAAA;
		color: #5b5b5b;
		margin-top: 3px;
		font-size: 12px;
	}
</style>
