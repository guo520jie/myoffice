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
