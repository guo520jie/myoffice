/**
 * Created by HUCC on 2018/1/6.
 */

//轮播图的功能
$(function () {

  var $carousel = $(".wjs_banner .carousel");
  var $img = $carousel.find("img");

  $(window).on("resize", function () {

    //1. 获取屏幕的宽度
    var screenWidth = $(window).width();

    $img.each(function () {

      if (screenWidth >= 640) {
        //获取出来psrc，设置给src
        $(this).attr("src", $(this).data("psrc"));
      } else {
        $(this).attr("src", $(this).data("msrc"));
      }

    });


  }).trigger("resize");


  //给carousel注册touchstart touchmove touchend事件
  //记录初始滑动位置
  var startX;
  $carousel.on("touchstart", function (e) {
    //e.originalEvent:原始事件对象
    startX = e.originalEvent.touches[0].clientX;
  });

  //获取滑动的距离, 距离超过100px ,判断上一屏，或者是下一屏
  $carousel.on("touchend", function (e) {
    var distance = e.originalEvent.changedTouches[0].clientX - startX;
    if(Math.abs(distance) >= 100) {
      if(distance > 0) {
        $carousel.carousel("prev");
      }

      if(distance < 0) {
        $carousel.carousel("next");
      }
    }
  });

});


//产品区块功能
$(function () {
  var $nav = $(".wjs_product .nav");//计算它的宽度
  var $li = $nav.find("li");
  var width = 0;

  $li.each(function () {

    //width():  仅仅获取的是宽度
    //innerWidth();padidng + width
    //outerWidth(false) padding + border + width
    //outerWidth(true): padding + border + margin + width
    width += $(this).outerWidth(true);
  });

  $nav.css("width", width);


  //初始化iscroll
  new  IScroll(".nav_wrapper", {
    scrollX:true,//开启水平区域滚动
    scrollY:false//关闭垂直区域滚动
  });
});