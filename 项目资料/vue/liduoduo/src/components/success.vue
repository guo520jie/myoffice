<template>
    <div class="container">
        <div class="main">
            <div class="result">{{result}}</div>
            
            <div class="person-info" v-if="isShow">
                <div class="jifen"><span>{{jifen}}</span>积分</div>
                <div class="from">来自</div>
                <div class="img-box"><img :src="img" alt=""></div>
                <div class="name">{{name}}</div>
                <div class="tel">{{tel}}</div>
            </div>
            <div class="confirm" @click="btnsuccess"><p>完成</p></div>
        </div>
    </div>
</template>

<script>
var imgurl = require('../assets/logo.png')
    export default {
        created(){
            this.successInit()
            this.telreplace()
        },
        data(){
            return {
                isShow:true,
                result:'核销成功',
                jifen:'***',
                name:'***',
                tel:'***********',
                img:null
            }
        },
        computed:{
             qrCodeUser:function () {
                return this.$store.getters['getQrCodeUserInfo']
			}
        },
        methods:{
            // 替换手机号中间四位
            telreplace:function(){
                let tel = this.tel
                let telchange = tel.replace(tel.substring(3,7),'****')
                this.tel = telchange

            },
            successInit:function(){
                var info = this.qrCodeUser
                // console.log('1',info)
                this.name = info.nickName
                this.tel = info.mobile
                this.img = info.avatarUrl?info.avatarUrl:imgurl
                // console.log('33',this.$route.query)
                this.jifen = this.$route.query.score
            },
            btnsuccess:function(){
                this.$router.replace({
                    path:'/back'
                })
            }
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
        padding: 30/@r;
        box-sizing: border-box;
        position: relative;
    }
    .main .result {
        margin-top: 104/@r;
        text-align: center;
        font-size: 30/@r;
        color: #999;
    }
    .main .defeated {
        text-align: center;
        font-size: 40/@r;
        margin-top: 105/@r;
        font-weight: 600;
    }
    .main .jifen{
        text-align: center;
        margin-top: 80/@r;
        color: #333;
    }
    .main .jifen span {
        font-size: 80/@r;
        font-weight: 600;
        color: #000;
    }
    .main .from {
        text-align: center;
        margin-top: 164/@r;
        font-size: 30/@r;
        color: #999;
    }
    .main .img-box {
        width: 100%;
        margin: 42/@r 0;
    }
    .main .img-box img {
        display: block;
        width: 134/@r;
        height: 134/@r;
        margin: 0 auto;
    }
    .main .name {
        text-align: center;
        font-size: 38/@r;
        color: #333;
    }
    .main .tel {
        text-align: center;
        line-height: 50/@r;
        font-size: 30/@r;
    }
    .main .confirm {
        height: 70/@r;
        position: absolute;
        bottom: 120/@r;
        left: 50%;
        transform: translateX(-50%)
    }
    .main .confirm p {
        width: 360/@r;
        height: 70/@r;
        margin: 0 auto;
        border: 1px solid #4F90FF;
        box-sizing: border-box;
        text-align: center;
        line-height: 70/@r;
        border-radius: 5/@r;
        color: #4F90FF
    }
</style>