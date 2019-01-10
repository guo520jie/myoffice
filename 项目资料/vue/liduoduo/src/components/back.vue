<template>
    <div class="container">
        <div class="main">
            <div class="head">
                <div class="exit" @click="exitLogin"><img src="../assets/exit.png" alt=""></div>
                <div class="head-person">
                    <div class="img-box"><img :src="user.avatarUrl" alt=""></div>
                    <div class="admin-name">
                        <p class="admin">管理员</p>
                        <p class="name">{{user.username}}</p>
                    </div>
                </div>
                <div class="attention">
                    <div class="font-box"><i class="iconfont icon-gantanhao-copy"></i></div>
                    <ul :class="{marquee:animate}">
                        <li v-for="(item,index) in msgList" :key="index">
                            <span>{{item.msg}}</span>
                        </li>
                    </ul>
                </div>
                <!-- 菜单 -->
                <div class="menu">
                    <div class="del" @click="scanCode"><img src="../assets/menu1.png" alt=""></div>
                    <div class="find" @click="goQuery"><img src="../assets/menu2.png" alt=""></div>
                    <div class="add" @click="maskshow"><img src="../assets/menu3.png" alt=""></div>
                    <div class="more">
                        <p>更多功能<br>敬请期待</p>
                    </div>
                </div>
            </div>
            <div class="service" @click="serviceShow"><span>客服热线联系方式 ></span></div>
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
          var timer = setInterval(this.showMarquee, 2000);
          this.personInfo()
        },
        data(){
            return{
                loginImg: null,
                name: '',
                animate:false,
                msgList:[
                    {msg:'商家核销用户游戏积分请点击积分核销'},
                    {msg:'游戏积分核销记录请点击核销查询'},
                    {msg:'点击生成二维码并扫描即可开始游戏'}
                ],
                maskData:'功能未激活，若需要激活此功能，请与我们联系。（电话：15026756127）'
            }
        },
        computed:{
			uid:function () {
				return this.$store.getters['getUUID'];
			},
        	user:function () {
                return this.$store.getters['getAdminUserInfo']
			}
        },
        methods:{
            exitLogin:function(){
                localStorage.clear()
                this.$router.replace({path:'/'})
            },
            personInfo:function(){
                this.name = this.$store.state.username
                this.loginImg = this.$store.state.userImg ? this.$store.state.userImg : imgurl
            },
            showMarquee:function(){
                // console.log(this.name)
                this.animate = true;
                setTimeout(()=>{
                    this.msgList.push(this.msgList[0])
                    this.msgList.shift()
                    this.animate = false
                },500)
            },
             maskshow:function(){
                this.$vux.alert.show({
                title: '',
                content: this.maskData,
                buttonText:'确定',
                })
            },
            serviceShow:function(){
                this.$vux.confirm.show({
                    title:'客服联系方式',
                    content: '<div style="text-align:left;margin-left:28px;margin-top:30px;"><p style="margin-bottom:15px;">微信：15026756127</p> <p style="margin-bottom:15px;">Q Q： 2180647457</p> <p style="margin-bottom:15px;">座机：021-56775190</p> <p style="margin-bottom:15px;">手机：15026756127</p> <p style="margin-bottom:15px;">邮箱：2180647457@qq.com</p></div>',
                    confirmText:'知道了',
                    showCancelButton: false
                })
            },
            getQrcodeInfo:function (code) {
            	let self = this;
				this.$http({
					methods:'get',
					url:'/mfw/xiaoliwu/backend/Login/showCodeInfo',
					params:{
						uid:this.uid,
						code:code
					}
				}).then(res=>{
					console.log(res)
					if(res.data.code === 0){
						self.$store.commit('setQrCodeUserInfo',res.data.data)
						this.$router.push({
							path:'/convert'
						})
					}else {
						self.$vux.alert.show({
							title: '',
							content: res.data.msg,
							buttonText:'知道了'
						})
					}
				})
			},
			scanCode:function(){
				// this.$store.commit('setQrCode','e1dddec9');
				// this.getQrcodeInfo('e1dddec9');
				// return
				let self = this;
				if(this.isWeixn()){
					this.$vux.loading.show({
						text:'加载中'
					});
					setTimeout(function () {
						self.$vux.loading.hide();
					},1500);
					// this.$wechat.ready(()=>{
					self.$wechat.scanQRCode({
						needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
						scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
						success: function (res) {
							self.$vux.loading.hide();
							var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
							if (result){
								self.$store.commit('setQrCode',result);
								self.getQrcodeInfo(result)
							}else {
								self.$vux.alert.show({
									content:'未识别的兑换码'
								})
							}

						}
					});
					// })
				}else {
					this.$vux.alert.show({
						content:'请在微信中打开'
					})
				}

			},
			goQuery:function () {
                this.$router.push({path:'/query'})
            },
            isWeixn:function(){
                var ua = navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i)=="micromessenger") {
                    return true;
                } else {
                    return false;
                }
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
        background-color: #EFEFF4;
    }
    .main {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        position: relative;
    }
    .main .head {
        width: 100%;
        height: 465/@r;
        padding:30/@r;
        box-sizing: border-box;
        position: relative;
        background: -webkit-linear-gradient(0deg,rgba(94,191,255,1),rgba(76,135,255,1)); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(0deg,rgba(94,191,255,1),rgba(76,135,255,1)); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(0deg,rgba(94,191,255,1),rgba(76,135,255,1)); /* Firefox 3.6 - 15 */
        background:linear-gradient(0deg,rgba(94,191,255,1),rgba(76,135,255,1));
    }
    .main .head .exit {
        width: 84/@r;
        height: 84/@r;
        position: absolute;
        top: 30/@r;
        right: 30/@r;
    }
    .main .head .exit img {
        width: 100%;
        height: 100%;
    }
    .main .head .head-person {
        width: 100%;
        display: flex;
    }
    .main .head .head-person .img-box {
        flex: 1.2
    }
    .main .head .head-person .img-box img {
        width: 135/@r;
        height: 135/@r;
        display: block;
    }
    .main .head .head-person .admin-name {
        flex: 3.8;
        margin-left: 30/@r;
        color: #fff;
    }
    .main .head .head-person .admin-name .admin {
        font-size: 36/@r;
        margin: 10/@r 0 24/@r 0;
    }
    .main .head .attention {
        margin-top: 80/@r;
        color: #FFF000;
        line-height: 60/@r;
        height: 60/@r;
        overflow: hidden;
        display: flex;
    }
    .main .head .attention .font-box {
        flex: 1;
        height: 60/@r;
        line-height: 60/@r;
    }
    .main .head .attention .font-box i{
        font-size: 40/@r;
    }
     .main .head .attention ul{
         flex: 12;
         display: block;
     }
    .main .head .attention .marquee {
       transition: all 0.5s;
       margin-top: -60/@r;
    }
    .main .head .attention li {
        height: 60/@r;
        line-height: 60/@r;
    }
    // 菜单

    .main .head .menu {
        width: 600/@r;
        height: 584/@r;
        position: absolute;
        top: 350/@r;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-wrap:wrap;
        justify-content:space-between;
        align-content:space-between;
        background-color: #F8F8F8;
    }
    .main .head .menu div {
        width: 49%;
        height: 49%;
        background-color: #fff;
    }
    .main .head .menu div img {
        width: 171/@r;
        height: 155/@r;
        margin-top: 33px;
        margin-left: 33px;
    }
    .main .head .menu .more {
        background-color: #F8F8F8;
    }
    .main .head .menu .more p {
        margin-top: 45px;
        margin-left: 38px;
        color: #c9c9c9;
    }
    .main .service {
        width: 100%;
        text-align: center;
        position: absolute;;
        bottom: 140/@r;
        left: 0;
        color: #576B95;
    }

</style>