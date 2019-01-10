<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
	  let self = this;
	  this.$store.dispatch('checkLogin',function (res) {
		  if(res.data.code===0){
			  self.$router.replace({
				  path:'/back'
			  })

		  }else {
			  self.$router.replace({
				  path:'/'
			  })
		  }
	  });
	  this.scan();
  },
  data(){
    return{
    }
  },
  computed:{
	  uid:function () {
		  return this.$store.getters['getUUID'];
	  },
  },
  methods:{
	  init:function(data){
		  //通过config接口注入权限验证配置
		  this.$wechat.config({
			  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			  appId: data.app_id, // 必填，公众号的唯一标识
			  timestamp: data.timestamp, // 必填，生成签名的时间戳
			  nonceStr: data.nonceStr, // 必填，生成签名的随机串
			  signature: data.signature,// 必填，签名，见附录1
			  jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
		  });
		  //通过ready接口处理成功验证

	  },
	  scan:function(){
		  this.$http({
			  methods:'get',
			  url:'/gongzhonghao/Jssdk',
			  params:{
				  // 代码需要上传服务器，否则返回为0
				  url:location.href.split('#')[0],
			  }
		  }).then(res=>{
			  // console.log(res.data.data)
			  this.init(res.data.data)
			  // this.scanCode(res.data)
		  })
	  },

  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html,body {
  height: 100%;
}
input {
  background:none;  
	outline:none;  
	border:0px;
}
ul {
  list-style: none;
}
input::-webkit-input-placeholder{
  font-size: 16px;
  font-weight: 400;
} 
input:-moz-placeholder{
  font-size: 16px;
  font-weight: 400;
}  
input::-moz-placeholder{
  font-size: 16px;
  font-weight: 400;
} 
input:-ms-input-placeholder{
  font-size: 16px;
  font-weight: 400;
}  
/* vux样式修改 */
.weui-dialog__btn_primary {
      color: #347FFF;
    }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center;
  color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
