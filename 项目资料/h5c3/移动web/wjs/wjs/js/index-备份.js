/**
 * Created by HUCC on 2018/1/6.
 */
$(function () {

  var $item = $(".wjs_banner .carousel .item");
  var $img = $item.find("img");

  //根据屏幕的大小，给轮播图中所有的item添加或者移除item_pc这个类。
  $(window).on("resize", function () {
    //获取屏幕的大小
    var screenWidth = $(window).width();  //window.innerWidth
    var isMobile = screenWidth > 640 ? false : true;//是手机或者是pc
    if(isMobile) {
      //说明是手机,需要移动item_pc这个类
      $item.removeClass("item_pc");
    }else {
      $item.addClass("item_pc");
    }


    //修改每张图片的src地址
    $img.each(function () {

      //判断是手机还是pc
      if(isMobile) {
        //是手机，把自己 data-msrc 设置自己的src
        //jquery也可以操作自定义属性
        // data(name, value): 设置自定义属性
        // data(name)
        $(this).attr("src", $(this).data("msrc") );
      }else {
        $(this).attr("src", $(this).data("psrc"));
      }

    });


  }).trigger("resize");

});