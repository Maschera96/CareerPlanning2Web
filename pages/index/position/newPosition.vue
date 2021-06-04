<template>
	<div>
		</el-alert>
		<el-row>
			<!-- 左列 -->
			<el-col :span="6" :offset="2" style="margin-top: 20px;">
				<NecessaryTitle title="岗位名称"></NecessaryTitle>
				<el-input v-model="input.jobName" placeholder="请输入内容" style="margin: 5px 0px 20px 0px"></el-input>
				<NecessaryTitle title="工作地点"></NecessaryTitle>
				<div style="margin: 20px 0px 10px 0px">
					<el-checkbox-group v-model="checkboxGroup1" size="small" @change="selectCity()">
						<el-checkbox label="北京" border></el-checkbox>
						<el-checkbox label="上海" border></el-checkbox>
						<el-checkbox label="广州" border></el-checkbox>
						<el-checkbox label="深圳" border></el-checkbox>
						<el-checkbox label="杭州" border></el-checkbox>
					</el-checkbox-group>
				</div>
				</el-input>
				<NecessaryTitle title="学历要求"></NecessaryTitle>
				<el-input v-model="input.educationRequirement" placeholder="请输入内容" style="margin: 5px 0px 20px 0px">
				</el-input>
				<NecessaryTitle title="岗位类型"></NecessaryTitle>
				<div style="margin: 10px 0px 20px 0px;">
					<el-radio-group v-model="radio1">
						<el-radio-button label="运营"></el-radio-button>
						<el-radio-button label="研发"></el-radio-button>
						<el-radio-button label="销售"></el-radio-button>
						<el-radio-button label="管理"></el-radio-button>
					</el-radio-group>
				</div>


				<!-- <span>企业产品</span>
				<el-input  placeholder="请输入内容" style="margin: 5px 0px 20px 0px"></el-input> -->
				<NecessaryTitle title="岗位职责"></NecessaryTitle>
				<el-input style="margin: 5px 0px 20px 0px" type="textarea" :rows="7" placeholder="请输入内容"
					v-model="input.jobDuty">
				</el-input>
				<NecessaryTitle title="岗位要求"></NecessaryTitle>
				<el-input style="margin: 5px 0px 20px 0px" type="textarea" :rows="7" placeholder="请输入内容"
					v-model="input.jobRequirement">
				</el-input>
			</el-col>

			<!-- 右列 -->
			<el-col :span="13" :offset="1" style="margin-top: 20px;">
				<!-- 薪资 -->
				<NecessaryTitle title="薪资"></NecessaryTitle>
				<el-row class="salaryBox">
					<span class="salary">{{value[0]}}k</span>
					<div>---</div>
					<span class="salary">{{value[1]}}k</span>
				</el-row>
				<el-slider class="myslider" v-model="value" range :marks="marks" :max="20">
				</el-slider>

				<el-row>
					<el-col :span="11">
						<!-- 推荐课程 -->
						<span>推荐课程</span>
						<div v-if="!checkedCourse.length" class="help">点击下面添加课程，再次点击已添加的课程可删除</div>
						<li style="list-style: none;" v-for="(i,index) in checkedCourse"
							@click="checkedCourse.splice(index,1)">
							<CourseCard class="card" :lessonCode="i.indexCode" :courseName="i.courseName"
								:collegeName="i.collegeName"></CourseCard>
						</li>
						<div class="courseCheck">
							<ul class="infinite-list" v-infinite-scroll="courseLoad" style="overflow:auto">
								<li v-for="i in courseList" @click="checkCourse(i)">
									<CourseCard class="card" :lessonCode="i.indexCode" :courseName="i.courseName"
										:collegeName="i.collegeName"></CourseCard>
								</li>
							</ul>
						</div>
					</el-col>
					<el-col :span="11" :offset="1">
						<!-- 推荐书籍 -->
						<span>推荐书籍</span>
						<div v-if="!checkedBook.length" class="help">点击下面添加书籍，再次点击已添加的书籍可删除</div>
						<li style="list-style: none;" v-for="(i,index) in checkedBook"
							@click="checkedBook.splice(index,1)">
							<BookCard class="card" :imgurl="i.img" :title="i.title" :author="i.author"
								:publish="i.publish"></BookCard>
						</li>
						<div class="courseCheck">
							<ul class="infinite-list" v-infinite-scroll="bookLoad" style="overflow:auto">
								<li v-for="i in bookList" @click="checkBook(i)">
									<BookCard class="card" :imgurl="i.img" :title="i.title" :author="i.author"
										:publish="i.publish"></BookCard>
								</li>
							</ul>
						</div>
					</el-col>
				</el-row>



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
	import CourseCard from '@/components/CourseCard.vue'
	import BookCard from '@/components/BookCard.vue'


	export default {
		components: {
			NecessaryTitle,
			CourseCard,
			BookCard
		},
		data() {
			return {
				input: {
					"jobName": "前端工程师",
					"companyIndexCode": "",
					"jobPlace": "",
					"educationRequirement": "本科及以上",
					"jobType": "",
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
				},
				checkboxGroup1: [],
				radio1: '运营',
				value: [4, 8],
				marks: {
					0: '0k',
					5: '5k',
					10: '10k',
					15: '15k',
					20: '20k'
				},
				courseList: [],
				checkedCourse: [],
				courseIndex: 1,
				courseSize: 5,
				bookList: [],
				checkedBook: [],
				bookIndex: 1,
				bookSize: 5,
			};
		},
		onLoad: function(e) {
			this.input.companyIndexCode = e.companyIndexCode
			this.input.salary = `${this.value[0]}k-${this.value[1]}k`
		},
		methods: {
			courseLoad() {
				uni.request({
					url: `http://1.15.175.248:8002/course/list/${this.courseIndex}/${this.courseSize}`,
					success: (res) => {
						this.courseList = this.courseList.concat(res.data.data.data)
					}
				})
				this.courseIndex++
			},
			bookLoad() {
				// return
				uni.request({
					url: `http://1.15.175.248:8002/book/list/${this.bookIndex}/${this.bookSize}`,
					success: (res) => {
						this.bookList = this.bookList.concat(res.data.data.data)
						console.log(res);
					}
				})
				this.bookIndex++
			},
			checkCourse(e) {
				console.log(e);
				//调整格式
				let type = '选修'
				if (e.courseName[0] === 'A') {
					type = '必修'
				}
				let obj = {
					indexCode: e.indexCode,
					courseName: e.courseName,
					courseType: type,
					collegeName: e.collegeName
				}
				//入栈
				this.checkedCourse.push(obj)
			},
			checkBook(e) {
				//入栈
				console.log(e);
				this.checkedBook.push(e)
			},
			selectCity() {
				let _jobPlace = this.checkboxGroup1[0]
				for (let i = 1; i < this.checkboxGroup1.length; i++) {
					_jobPlace += ` ${this.checkboxGroup1[i]}`
				}
				this.input.jobPlace = _jobPlace
				console.log(this.input.jobPlace);
			},
			submitFn() {
				this.input.salary = `${this.value[0]}k-${this.value[1]}k`
				this.input.jobType = this.radio1
				for (let key in this.input) {
					if (!this.input[key]) {
						this.$alert(`未填写${key}`, '请填写必填项', {
							confirmButtonText: '确定',
						});
						return
					}
				}
				//判断时候选择了课程
				if (this.checkedCourse.length) {
					this.input.courses = this.checkedCourse
				} else if (this.checkedCourse) {
					delete this.input.courses
				}
				//判断是否选择了书籍
				if (this.checkedBook.length) {
					this.input.books = this.checkedBook
				} else if (this.checkedBook) {
					delete this.input.books
				}
				// console.log(this.input);
				// return
				uni.request({
					url: 'http://1.15.175.248:8002/job/add',
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: this.input
				}).then((res) => {
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
	.infinite-list {
		height: 450px;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.infinite-list-item {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
		background: #e8f3fe;
		margin: 10px;
		color: #7dbcfc;
	}

	.submit {
		display: flex;
		justify-content: center;
		margin-top: 50px;
	}

	.el-checkbox.is-bordered.el-checkbox--small {
		margin-left: 0px;
		margin-bottom: 10px;
	}

	.mybtn {
		height: 40px;
		width: 98px;
	}

	.myslider {
		margin: 30px 0px;
	}

	.salaryBox {
		margin-top: 20px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.salary {
		color: #F56C6C;
		font-size: 25px;
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

	.courseCheck {
		margin: 20px 0px;
		border: 2px dashed #eee;
		border-radius: 5px;
		padding: 5px;
	}

	.card:hover {
		box-shadow: 0px 3px 6px rgb(160, 207, 255);
	}

	.help {
		height: 80px;
		box-sizing: border-box;
		width: 100%;
		border: 2px dashed #eee;
		border-radius: 5px;
		padding: 15px 30px;
		margin-top: 12px;
		color: #8C939D;
		overflow: hidden;
	}
</style>
