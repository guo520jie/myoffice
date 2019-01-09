<template>
    <div class="container">
        <div class="main">
            <div class="result">核销失败</div>
            <div class="defeated">改用户积分不足，无法核销</div>
            <div class="confirm" @click="btnsuccess"><p>完成</p></div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        methods:{
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
     .main .confirm {
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
        text-align: center;
        line-height: 70/@r;
        border-radius: 5/@r;
        color: #4F90FF
    }
</style>