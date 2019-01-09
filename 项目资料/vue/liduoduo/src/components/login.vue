<template>
    <div class="container">
        <div class="main">
            <div class="logo">
                <div class="img-box"><img src="../assets/logo.png" alt=""><p>礼哆哆商家后台</p></div>
            </div>
            <div class="login-box">
                <ul>
                    <li><span>账号：</span><input class="number" v-model="tel" type="email" placeholder="请输账号（QQ邮箱）"><i class="iconfont icon-guanbi" @click="changetel"></i></li>
                    <li><span>密码：</span><input :type="pwdType" v-model="psd" placeholder="请输入密码"><i class="iconfont" :class="[isClickTel?'icon-xianshimima':'icon-yincangdaan']" @click="showpsd"></i></li>
                </ul>
            </div>

            <div class="btn" @click="login">
                <img v-if="btnMask" src="../assets/btn_mask.png" alt="">
                登录
            </div>
            <div class="pasword" @click="maskshow">忘记密码？</div>
        </div>
        <!-- 忘记密码弹出框 -->
        
    </div>
</template>

<script>
    export default {
        created(){
           
        },
        updated(){
            this.btnMaskShow()
        },
        data(){
            return {
                pwdType:'password',//input类型
                maskData:'新密码已发至您的邮箱内，请您注意查收',//弹窗提示
                tel:'',//账号
                psd:'',//密码
                isClickTel:false,
                btnMask:true,
            }
        },
		computed:{
			uid:function () {
				return this.$store.getters['getUUID'];
			},
		},
        methods:{
            // 弹窗
            maskshow:function(){
            	if (this.tel){
					this.$http({
						methods:'get',
						url:'https://wechat.kayunzh.com/mfw/xiaoliwu/backend/Login/reset',
						params:{
							email:this.tel
						}
					}).then(res=>{
						// console.log(res.data.user)
						if(res.data.code===0){
							this.$vux.alert.show({
								title: '',
								content: this.maskData,
								buttonText:'知道了'
							})
						}else {
							alert(res.data.msg)
						}
					}).catch(res=>{
						console.log(res)
                    })
                }else {
					this.$vux.alert.show({
						title: '',
						content: '请先输入账号',
						buttonText:'知道了',
					})
                }
            },
            // 清除账号
            changetel:function(){
                // console.log(this.tel)
                this.tel = ''
            },
            // 显示密码
            showpsd:function(){
                // console.log(this.psd)
                this.isClickTel=!this.isClickTel;
                this.pwdType = this.pwdType=='password'?'text':'password'
            },

            // 判断是否能点击
            btnMaskShow:function(){
                if(this.tel!=''&&this.psd!=''){
                    this.btnMask = false;
                }
            },
            login:function(){
            	if (this.btnMask){
            		return
                }
                this.$http({
                    methods:'get',
                    url:'https://wechat.kayunzh.com/mfw/xiaoliwu/backend/Login/login',
                    params:{
                        email:this.tel,
                        password:this.psd,
                        uid:this.uid
                    }
                }).then(res=>{
                    // console.log(res.data.user)
                    if(res.data.code==0){
                        this.$router.replace({
                        path:'/back'
                    })
                    // console.log(this.$store.state.username)
                    }else {
                        alert(res.data.msg)
                    }
                })
                
            }
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
        padding:30/@r;
        box-sizing: border-box;
    }
    .main .logo {
       margin-top: 120/@r;
       margin-bottom: 95/@r;
    }
    .main .img-box img {
        display: block;
        width: 200/@r;
        height: 200/@r;
        margin: 0 auto;
    }
    .main .img-box p{
        text-align: center;
        font-size: 34/@r;
        margin-top: 19/@r;
    }
    .main .login-box ul li {
        width: 100%;
        height: 88/@r;
        line-height: 88/@r;
        border-bottom: 0.5px solid #eee;
        box-sizing: border-box;
        position: relative;
    }
    
    .main .login-box ul li i {
        position: absolute;
        top: 50%;
        right: 30/@r;
        transform: translateY(-50%);
    }
    .main .login-box ul li span {
        margin-right: 60/@r;
    }
     .main .login-box ul li input {
         height: 100%;
         font-size: 30/@r;
     }
     .main .login-box ul li .icon-guanbi{
         color: #bfbfbf;
     }
    .main .login-box ul li .icon-yincangdaan{
        color: #bfbfbf;
        font-size: 35/@r;
    }
    .main .login-box ul li .icon-xianshimima{
        font-size: 40/@r;
        color: #bfbfbf;
    }
    .main .btn{
        width: 100%;
        height: 88/@r;
        text-align: center;
        line-height: 88/@r;
        margin-top: 80/@r;
        color: #fff;
        background-color: #4F90FF;
        border-radius: 10/@r;
        position: relative;
    }
    .main .btn img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .main .pasword {
        margin-top: 220/@r;
        text-align: center;
        color: #576B95;
    }
    
    
</style>