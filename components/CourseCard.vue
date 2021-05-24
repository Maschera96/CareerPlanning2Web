<template>
	<view class="course_item">
		<view class="level">{{level}}</view>
		<view class="courseone">
			<view class="course_name">{{courseName}}</view>
			<view class="course_summary">{{collegeName}}</view>
		</view>
		<view :class="[req == '必修'?'course_request1':'course_request2']">{{req}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			lessonCode: {
				type: String,
			},
			courseName: {
				type: String,
			},
			collegeName: {
				type: String,
			}
		},
		data() {
			let level
			let req = '选修'
			switch(this.lessonCode[0]){
				case 'A':
					level = 'A类';
					req = '必修';
					break;
				case 'B':
					level = 'B类';
					break;
				default:
					level = 'C类';
					break;
			}
			return {
				level: level,
				req: req
			};
		},
		created: function() {
		},
		methods:{
		}
	}
</script>

<style>
	
	.course_item {
		border: 1px solid #ffffff;
		border-radius: 4px;
		box-shadow: 0px 3px 6px #e6e6e6;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		flex-direction: row;
		width: 270px;
		height: 80px;
		margin-top: 10px;
		padding: 0px 10px;
		align-items: center;
		justify-content: space-around;
	}
	
	.courseone {
		display: flex;
		flex-direction: column;
		width: 200px;
		position: relative;
		left: 10px;
	}
	
	.level {
		border: 1px solid #5b5b5b;
		color: #5b5b5b;
		height: 13px;
		width: 30px;
		font-size: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.course_name {
		font-size: 16px;
		font-weight: bold;
		color: #5f656c;
	}
	
	.course_summary {
		color: #5b5b5b;
		margin-top: 10px;
		font-size: 12px;
	}
	
	.course_request1{
		color: #e1945f;
		display: flex;
		align-items: center;
		margin-left: 5px;
		font-size: 8px;
	}
	
	.course_request2{
		color:#37c17c;
		display: flex;
		align-items: center; 
		margin-left: 5px;
		font-size: 8px;
	}
</style>
