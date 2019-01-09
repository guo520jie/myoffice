<template>
    <div class="container">
        <div class="main">
            <div class="top">
                <p class="left-txt">核销统计根据天数计算</p>
                <p class="right-txt" @click="goChoseDate">自定义查询 <i class="iconfont icon-rili"></i> </p>
            </div>
            <scroller style="top: 50px;" :on-refresh="refresh" :on-infinite="infinite" ref="myscroller">
            <div class="middle">
                <template v-for="(item,key) in personData">
                    <div class="title">
                        <p class="date">{{key}}</p>
                        <p class="right-aligin num">核销总计：<span>{{item.length}}</span>次</p>
                    </div>
                    <div class="content">
                        <ul v-for="(value,index) in item" :key="index">
                            <li>
                                <p>用户昵称</p>
                                <p class="data">{{value.nickName}}</p>
                            </li>
                            <li>
                                <p>用户手机</p>
                                <p class="data">{{value.mobile}}</p>
                            </li>
                            <li>
                                <p>核销时间</p>
                                <p class="data">{{value.time}}</p>
                            </li>
                            <li>
                                <p>核销积分</p>
                                <p class="data">{{value.score}}</p>
                            </li>
                            <!--<li>-->
                                <!--<p>管理员名称</p>-->
                                <!--<p class="data">啦啦啦</p>-->
                            <!--</li>-->
                        </ul>
                    </div>
                </template>
                <!--<div class="title">-->
                    <!--<p class="date">2018年12月24号</p>-->
                    <!--<p class="right-aligin num">核销总计：<span>2</span>次</p>-->
                <!--</div>-->

                <!--<div class="person-info">-->
                    <!--<ul v-for="(item,index) in personData" :key="index">-->
                        <!--<li>-->
                            <!--<p class="img-box"><img src="../assets/logo.png" alt=""></p>-->
                            <!--<p class="name">suzili</p>-->
                            <!--<p class="time">11:20:20</p>-->
                        <!--</li>-->
                    <!--</ul>-->
                <!--</div>-->

                <!--<div class="content" v-if="middleShow">-->
                    <!--<ul v-for="(item,index) in personData" :key="index">-->
                        <!--<li>-->
                            <!--<p>用户昵称</p>-->
                            <!--<p class="data">suzilu</p>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<p>用户手机</p>-->
                            <!--<p class="data">17566219552</p>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<p>核销时间</p>-->
                            <!--<p class="data">11:20:20</p>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<p>核销积分</p>-->
                            <!--<p class="data">50000</p>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<p>管理员名称</p>-->
                            <!--<p class="data">啦啦啦</p>-->
                        <!--</li>-->
                    <!--</ul>-->
                <!--</div>-->
            </div>
            </scroller>
            <!--<div class="footer">-->
                <!--以上是全部核销记录-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
            	page:1,
                personData:{},
				noDate:false
            }
        },
		computed:{
			uid:function () {
				return this.$store.getters['getUUID'];
			},
		},
		created(){
			let self = this;
			this.$store.dispatch('checkLogin',function (res) {
				if(res.data.code!==0){
					self.$router.replace({
						path:'/'
					})

				}
			});
            this.getList();
		},
        methods:{
			goChoseDate:function () {
				this.$router.push({path:'/chosedate'});
			},
			getData(callback){
				let self = this;
				this.$http({
					methods:'get',
					url:'/mfw/xiaoliwu/backend/Login/consumeList',
					params:{
						uid:this.uid,
						page:this.page
					}
				}).then(res=>{
					var data = res.data.data;
					var newData = self.personData;
					if (self.page==1){
						newData = {};
					}
					var obj = false;
					for (var i in data){
						obj = true;
						if (newData[i]!==undefined){
							for (var j in data[i]){
								newData[i].push(data[i][j]);
							}

						}else {
							newData[i] = data[i];
						}
					}
					self.noDate = !obj
					self.personData = Object.assign({},{},newData)
					if (callback){
						callback();
					}
				})
			},
			getList:function () {
				console.log('getList')
				this.page = 1;
				this.personData = {};
				let self = this;
				this.getData(function () {
					console.log(self.personData)
				});
			},
			refresh (done) {
				this.$refs.myscroller.finishInfinite(true);
				done();
			},
			infinite (done) {
				console.log('asdasdasd',this.noDate,this.personData)
				let self = this;
				if (this.noDate){
					this.$refs.myscroller.finishInfinite(true);
				}else {
					setTimeout(()=>{
						this.getData(function () {
							self.page++;
							self.$refs.myscroller.finishInfinite(true);
						});
						done();
					},1500);
				}
			},
        }
    }
</script>

<style scoped lang="less">
    @r:2px;
    .container {
        width: 100%;
        height: 100%;
        font-size: 34/@r;
    }
    .main {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        /*background-color: #EFEFF4;*/
    }
    .main .top {
        height: 45px;
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        /*height: 180px;*/
        width: 100%;
        box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
        z-index: 1000;
        background-color: #EFEFF4;
    }
    .main .top p {
        flex: 1;
        line-height: 91/@r;
    }
    .main .top .left-txt {
        font-size: 28/@r;
        color: #888;
        padding-left: 15px;
    }
    .main .top .right-txt {
        text-align: right;
        color: #4F90FF;
        padding-right: 15px;
    }
    .main .top .right-txt i {
        font-size: 40/@r;
    }
    .main .middle {
        background-color: #fff;
    }
    .main .middle .title {
        display: flex;
        padding: 0 30/@r;
        border-bottom: 0.5px solid #eee;
    }
    .main .middle .right-aligin {
        text-align: right;
    }
    .main .middle .title p{
        flex: 1;
        margin: 50/@r 0 8/@r 0;
    }
    .main .middle .title .date {
        font-size: 28/@r;
        color: #666;
    }
    .main .middle .title .num {
        font-size: 28/@r;
    }
    .main .middle .content {
        // padding: 0 30/@r;
        height: 100%;
    }
    .main .middle .content ul {
        margin: 30/@r 0 49/@r 30/@r;
        padding-right: 30/@r;
        box-sizing: border-box;
        border-bottom: 0.5px solid #eee;
    }
    .main .middle .content li {
        display: flex;
        line-height: 54/@r;
    }
    .main .middle .content li p {
        flex: 1;
        font-size: 30/@r;
        color: #aaa;
    }
    .main .middle .content li .data {
        color: #333;
        text-align: right;
    }
    // 核销人信息
    .main .middle .person-info {
        height: 100%;
    }
    .main .middle .person-info ul {
        margin-left: 30/@r;
    }
    .main .middle .person-info ul li {
        display: flex;
        height: 85/@r;
        line-height: 85/@r;
        border-bottom: 0.5px solid #eee;
    }
    .main .middle .person-info ul li .img-box {
        flex: 1;
        height: 100%;
    }
    .main .middle .person-info ul li .img-box img {
        width: 67/@r;
        height: 67/@r;
        display: block;
        margin-top: 10/@r;
    }
    .main .middle .person-info ul li .name{
        flex: 2;
        margin-left: 20/@r;
        font-size: 30/@r;
        color: #333;
    }
    .main .middle .person-info ul li .time {
        flex: 3;
        text-align: right;
        margin-right: 30/@r;
        font-size: 30/@r;
        color: #aaa;
    }
    .main .footer {
        font-size: 30/@r;
        color: #999;
        text-align: center;
        margin-top: 60/@r;
    }
</style>