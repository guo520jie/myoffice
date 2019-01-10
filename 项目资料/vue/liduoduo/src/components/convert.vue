<template>

    <div class="container">
        <div class="main">
            <div class="txt">{{txtmsg}}</div>

            <div class="person-info">
                <ul>
                    <li class="head-img"><span>头像</span><div><img :src="url" alt=""></div></li>
                    <li><p>昵称</p><p>{{name}}</p></li>
                    <li><p>手机号码</p><p>{{tel}}</p></li>
                </ul>
            </div>

            <div class="num">
                <input type="text" v-model="num" placeholder="请输入需要核销的积分数"  pattern="[0-9]*">
                <p>积分</p>
            </div>

            <div class="btn">
                <img v-if="btnMask" src="../assets/btn_mask.png" alt="">
                <div class="btn-success" @click="totalInit">确认核销</div>
            </div>

        </div>
    </div>
</template>

<script>
var imgurl = require('../assets/logo.png')
    export default {
        created(){
            let self = this;
			this.$store.dispatch('checkLogin',function (res) {
				if(res.data.code!==0){
					self.$router.replace({
						path:'/'
					})

				}
            });
            this.personInfo()
            this.telreplace()
            // console.log(this.qrCodeUser)
        },
        data(){
            return{
                txtmsg:'请仔细核对用户信息，确认无误后输入积分',
                name:'老中医',
                tel:'17566569565',
                num:'',
                url:'',
                btnMask:true,
            }
        },
        computed:{
			uid:function () {
				return this.$store.getters['getUUID'];
			},
            qrCode:function () {
                return this.$store.getters['getQrCode'];
			},
            qrCodeUser:function () {
                return this.$store.getters['getQrCodeUserInfo']
			}
		},
        watch:{
        	num:function (val, oldVal) {
        		this.num = val.replace(/\D/g,'');
        		if (this.num<1){
        			this.num = '';
                }
                if(this.num!==''){
					this.btnMask = false
                }else {
					this.btnMask = true
                }
			}
        },
        methods:{
            personInfo:function(){
                var info = this.qrCodeUser
                // console.log('1',info)
                this.name = info.nickName
                this.tel = info.mobile
                this.url = info.avatarUrl?info.avatarUrl:imgurl
            },
            totalInit:function(){
                let uid = this.uid
                this.$http({
                    methods:'get',
                    url:'/mfw/xiaoliwu/backend/Login/verification',
                    params:{
                        uid:uid,
                        code:this.qrCode,
                        score: this.num
                    }
                }).then(res=>{
                    if(res.data.code == 0){
                        console.log(res)
                        this.$router.replace({
                            path:'/success',
                            query:{
                                score:this.num
                            }
                        })
                    }else{
                    	this.$store.commit('setErrMsg',res.data.msg)
                        this.$router.replace({
                            path:'/defeated'
                        })
                    }
                })
            },
            telreplace:function(){
                let tel = this.tel
                let telchange = tel.replace(tel.substring(3,7),'****')
                this.tel = telchange
            },
        }
    }
</script>

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
    }
    .main .txt {
        height: 70/@r;
        line-height: 70/@r;
        text-align: center;
        font-size: 30/@r;
        color: #fff;
        background-color: #E64340
    }

    .main .person-info {
        width: 100%;
        height: 459/@r;
        padding: 30/@r;
        background-color: #EDEDF2;
        box-sizing: border-box;
    }
    .main .person-info ul {
        width: 100%;
        height: 100%;
        padding: 30/@r;
        box-sizing: border-box;
        background: -webkit-linear-gradient(left, rgba(94,191,255,1),rgba(76,135,255,1)); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, rgba(94,191,255,1),rgba(76,135,255,1)); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, rgba(94,191,255,1),rgba(76,135,255,1)); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, rgba(94,191,255,1),rgba(76,135,255,1))
    }
    .main .person-info ul li {
        margin-bottom: 48/@r;
        display: flex;
        justify-content: space-between;
        color: #fff;
    }
    main .person-info ul .head-img {
        height: 134/@r;
       
    }
    .main .person-info ul .head-img span{
        flex: 1;
        line-height: 134/@r;
    }
    .main .person-info ul .head-img div {
        flex: 1;
        text-align: right;
    }
     .main .person-info ul .head-img div img {
         width: 134/@r;
         height: 134/@r;
         display: inline-block;
     }

    .main .num {
        height: 88/@r;
        line-height: 88/@r;
        margin: 60/@r 30/@r;
        display: flex;
        box-sizing: border-box;
        border-bottom: 0.5px solid #E5E5E5;
    }
    .main .num input {
        flex: 8;
        font-size: 40/@r;
        font-weight: 600;
    }
    .main .num p {
        flex: 1;
    
    }
     .main .btn{
        width: 100%;
        height: 88/@r;
        text-align: center;
        line-height: 88/@r;
        margin: 80/@r auto;
        color: #fff;
        background-color: #4F90FF;
        border-radius: 10/@r;
        position: relative;
    }
    .main .btn .btn-success{
        width: 100%;
        height: 100%;
    }
    .main .btn img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>