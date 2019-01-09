<template>
    <div class="choseDate container">
        <div class="main">
            <div class="chose">
                <div class="start">
                    <span>开始时间</span>
                    <input type="text" readonly="readonly" @click="chosestart" v-model="start" placeholder="选择开始时间">
                </div>
                <div class="end">
                    <span>结束时间</span>
                    <input type="text" readonly="readonly" @click="choseend" v-model="end" placeholder="选择结束时间">
                </div>
                <div class="btn" @click="getList">
                    查询
                </div>
            </div>
            <scroller v-if="isSelect" style="top: 180px;" :on-refresh="refresh" :on-infinite="infinite" ref="myscroller">
                <div class="middle" v-for="(item,key) in personData">
                    <div class="title">
                        <p class="date">{{key}}</p>
                        <p class="right-aligin num">核销总计：<span>{{item.length}}</span>次</p>
                    </div>

                    <div class="content">
                        <ul v-for="(value,index) in item">
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
                        </ul>
                    </div>
                </div>
                <!--<div class="footer" slot="bottom">以上是全部核销记录</div>-->
            </scroller>


            <!--<div class="footer">以上是全部核销记录</div>-->

        </div>
    </div>
</template>

<script>
    import { Sticky,ViewBox } from 'vux'
    export default {
        components:{
			Sticky,
			ViewBox
        },
        data(){
            return{
                start:'',
                end:'',
                page:1,
                personData:{},
                isSelect:false,
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
        	// this.getData();
        },
        methods:{
            chosestart:function(){
                let self = this;
                this.$vux.datetime.show({
                format:'YYYY-MM-DD HH:mm',
                yearRow:'{value}年',
                monthRow:'{value}月',
                dayRow:'{value}日',
                hourRow:'{value}时',
                minuteRow:'{value}分',
                value: '',
                confirmText:'确定',
                cancelText:'取消',
                onHide () {
                    const _this = this
                },
                onShow () {
                    const _this = this
                },
                onConfirm (value) {
                    console.log(value)
                    console.log(self.start)
                    self.start = value
                }
                })
            },
            choseend:function(){
                let self = this;
                this.$vux.datetime.show({
                format:'YYYY-MM-DD HH:mm',
                yearRow:'{value}年',
                monthRow:'{value}月',
                dayRow:'{value}日',
                hourRow:'{value}时',
                minuteRow:'{value}分',
                value: '',
                confirmText:'确定',
                cancelText:'取消',
                onHide () {
                    const _this = this
                },
                onShow () {
                    const _this = this
                },
                onConfirm (value) {
                    console.log(value)
                    console.log(self.start)
                    self.end = value
                }
                })
            },
            getData(callback){
            	let self = this;
				this.$http({
					methods:'get',
					url:'/mfw/xiaoliwu/backend/Login/consumeList',
					params:{
						uid:this.uid,
						page:this.page,
						start_time:this.start,
						end_time:this.end
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
                    self.isSelect = true;
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
        },
    }
</script>

<style>
    .choseDate ._v-container>._v-content>.loading-layer {
        height: 200px;
    }
</style>
<style scoped lang='less'>
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
        box-sizing: border-box;
    }
    .main .chose {
        background-color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        height: 180px;
        width: 100%;
        box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
        z-index: 1000;
    }
    .main .chose .start,.main .chose .end {
        margin-left: 30/@r;
        height: 120/@r;
        line-height: 120/@r;
        border-bottom: 0.5px solid #E5E5E5;
    }
    .main .chose input {
        height: 100%;
        margin-left: 63/@r;
    }
    .main .chose .btn {
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 36/@r;
        color: #4F90FF;
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