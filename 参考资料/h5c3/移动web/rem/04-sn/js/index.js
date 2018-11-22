/**
 * Created by HUCC on 2018/1/9.
 */
//初始化轮播图
var mySwiper = new Swiper('.swiper-container',{
  //设置小圆点的初始化
  pagination: {
    el: '.swiper-pagination',
  },
  //开启循环播放
  loop:true,
  //开启自动播放
  autoplay: {
    //配置切换时间
    delay:1000,
    //配置手动滑了以后，继续自动播放
    disableOnInteraction:false
  },

  //切换效果
  effect:"slide"
});