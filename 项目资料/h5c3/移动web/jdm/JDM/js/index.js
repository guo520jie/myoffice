/**
 * Created by HUCC on 2018/1/2.
 */
//1. 动态修改header的背景颜色
//() [] // 如果前面的语句没有使用分号结束，会报错的。
//var num = 11;
////把语句转换成表达式
//
//;(function () {
//
//})();
//
//;(function(){}())
//!function (){}()
//+function (){
//  console.log("Heheh")
//}()


//动态修改header的背景颜色
//思路：
//1. 给window注册滚动事件
//2. 获取scrollTop值，透明度随着scrollTop值的增加在增加，当scrollTop到达600，透明度就定死0.9
//匿名函数自调用，  sandbox：沙箱
;(function () {

  var header = document.querySelector(".jd_header");

  window.addEventListener("scroll", function () {

    //用js方式:
    // 1. 对于现代浏览器来说：window.pageYOffset/pageXOffset
    // 2. ie的获取方式：document.documentElement.scrollTop
    // 3. document.body.scrollTop
    //jq方式：$(window).scrollTop();
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    //console.log(scrollTop);
    var opacity = 0;
    if (scrollTop > 600) {
      opacity = 0.9;
    } else {
      //需要按照比例计算opacity
      opacity = scrollTop / 600 * 0.9;
    }
    //设置给header
    header.style.backgroundColor = "rgba(222, 24, 27, " + opacity + ")";
  });
})();


//功能2：动态的设置ul的宽度
;(function () {
  var ul = document.querySelector(".seckill_c ul");
  //获取ul下所有的li标签
  var lis = ul.querySelectorAll("li");

  //获取li的宽度
  //jq:怎么拿宽度：
  // width()只能宽度
  // innerWidth() 宽度+ padding
  // outerWidth() 宽度 + padding + border
  // outerWidth(true) 宽度 + padding + border + margin
  var liWidth = lis[0].offsetWidth;

  //计算宽度
  ul.style.width = lis.length * liWidth + "px";

})();


//3倒计时功能
//1. 需要一个秒杀的时间（后面的时间）  需要当前时间
//2. 两个时间相减，得到毫秒值
//3. 转换成小时部分
//4. 转换成分钟
//5. 换成秒钟


//1. time<=0  需要让time=0,而且需要清除定时器
;(function () {

  var spans = document.querySelectorAll(".seckill_time>span:nth-child(odd)");
  //不推荐：这不是标准写法，在安卓机没问题，但是在ios手机上，识别
  var secTime = new Date(2018, 0, 3, 12, 0, 0);

  setTime();

  var timer = setInterval(setTime, 1000);

  function setTime() {
    var nowTime = new Date();
    //2018年1月3日 12：00：00

    var time = parseInt((secTime - nowTime) / 1000);
    //如果time是小于等于0的时候，需要清除定时器
    if (time <= 0) {
      time = 0;
      clearInterval(timer);
    }

    //转换成小时部分  1 = 3600
    var hours = parseInt(time / 3600);
    //转换成分钟, 不足60的那部分
    var minutes = parseInt(time / 60) % 60;
    //转换成秒钟，不足60的把部分
    var seconds = time % 60;

    //设置到spans中
    spans[0].innerText = addZero(hours);
    spans[1].innerText = addZero(minutes);
    spans[2].innerText = addZero(seconds);
  }


  function addZero(n) {
    return n < 10 ? '0' + n : n;
  }

})();


//功能4. 京东快报轮播
//1. 开启一个定时器，每隔2秒钟切换一次文字
//2. ul每次移动一个li的高度 translateY 负值
//3. 当ul的过渡结束后，瞬间换到第一个li的位置
;(function () {

  var ul = document.querySelector(".jd_news .info ul");
  var lis = ul.children;
  var liHeight = lis[0].offsetHeight;

  var index = 0;
  setInterval(function () {

    if (index >= lis.length - 1) {
      //让index等于0
      index = 0;
      //移除过渡
      ul.style.transition = "none";
      ul.style.webkitTransition = "none";
      //设置ul的translateY 为0
      ul.style.transform = "translateY(0px)";
      ul.style.webkitTransform = "translateY(0px)";
    }


    //repaint reflow
    ul.offsetWidth;

    index++;
    //让ul有动画
    ul.style.transition = "all .5s";
    ul.style.webkitTransition = "all .5s";
    //让ul往上跑
    ul.style.transform = "translateY(-" + index * liHeight + "px)";
    ul.style.webkitTransform = "translateY(-" + index * liHeight + "px)";

  }, 1000);

  //当ul的过渡结束后，需要判断index的值，如果发现是最后一个li了，需要瞬间切换到第一个
  /*ul.addEventListener("transitionend", function () {
   console.log(index);
   if (index >= lis.length - 1) {
   //让index等于0
   index = 0;
   //移除过渡
   ul.style.transition = "none";
   ul.style.webkitTransition = "none";
   //设置ul的translateY 为0
   ul.style.transform = "translateY(0px)";
   ul.style.webkitTransform = "translateY(0px)";
   }
   })*/

})();


//功能5：bannner轮播图
;(function () {

  //1. 找对象
  var banner = document.querySelector(".jd_banner");
  var imgUl = banner.querySelector(".imgUl");
  var imgs = imgUl.querySelectorAll("li");
  var pointUl = banner.querySelector(".pointUl");
  var points = pointUl.querySelectorAll("li");

  var width = banner.offsetWidth;

  var index = 1;//因此第0张是假图片
  //2. 让图片往左跑
  var timer = setInterval(function () {
    //2.1 index++
    index++;
    //2.2 给imgUl加过渡
    addTransition();
    //2.3. 设置imgUl的translateX 负值
    setTranslate(- index * width);
  }, 1000);

  //3.在imgUl的过渡结束事件中，判断index，如果是最后一张，需要瞬间换到第一张
  imgUl.addEventListener("transitionend", function () {

    //3.1
    //右滑的判断
    if (index >= imgs.length - 1) {
      index = 1;
    }
    //左滑的判断
    if (index <= 0) {
      index = imgs.length - 2;
    }
    //3.2 移除过渡
    removeTransition();
    //3.3 瞬间变回来
    setTranslate(-index * width);

    //因为在过渡结束的时候，我们对index做了判断，当inde操作范围的时候，我们修正index的值。
    //过渡结束的时候，去修改小圆点：、让index-1对应的小圆点亮起来
    //先移除所有的小圆点的now类，给index-1的小圆点加上now类
    for (var i = 0; i < points.length; i++) {
      points[i].classList.remove("now");
    }
    points[index - 1].classList.add("now");

  });


  //4. 给imgUl注册3个滑动相关的事件， 注意：ul没高度


  //开始滑动：
  //1. 清除定时器
  //2. 获取手指开始滑动的位置
  //3. 记录开始滑动的时间
  var startX;
  var startTime;
  imgUl.addEventListener("touchstart", function (e) {
    //清除定时器
    clearInterval(timer);
    //记录开始位置
    startX = e.touches[0].clientX;

    //记录开始滑动的时间
    startTime = new Date();
  });

  //1. 获取到move时手指的位置，计算出来滑动的距离
  //2. 移除imgUl的动画
  //3. 设置imgUl的位置
  imgUl.addEventListener("touchmove", function (e) {
    //获取滑动的距离
    var distance = e.touches[0].clientX - startX;
    //移除过渡
    removeTransition();
    //设置imgUl的位置
    setTranslate(-index * width + distance);

  })

  //1. 获取到end时的位置，计算出来滑动的距离
  //2. 根据滑动的距离判断，如果距离超过1/3,就去上一屏或者下一屏
  //   如果没有超过，吸附回来。
  //3. 重新开启定时器
  imgUl.addEventListener("touchend", function (e) {
    //计算滑动的距离
    var distance = e.changedTouches[0].clientX - startX;
    //计算滑动的时间
    var time = new Date() - startTime;

    //判断是否滑动成功，距离超过了1/3屏, 或者是时间小于300ms的情况，30也算成功
    //console.log(time);
    if(Math.abs(distance) > width/3 || time <= 200 && Math.abs(distance) > 30) {
      //滑动成功了
      if(distance > 0) {
        //上一屏
        index--;
      }
      if(distance < 0){
        //下一屏
        index++;
      }
    }

    //添加过渡
    addTransition();
    //设置位置
    setTranslate(-index * width);

    //重新开启定时器
    timer = setInterval(function () {
      //2.1 index++
      index++;
      //2.2 给imgUl加过渡
      addTransition();
      //2.3. 设置imgUl的translateX 负值
      setTranslate(- index * width);
    }, 1000);

  });




  //给window注册resieze事件，修改width的值
  window.addEventListener("resize", function () {
    clearInterval(timer);
    width = banner.offsetWidth;
    //width发生了改变，但是此时ul的translateX并没改变
    removeTransition();
    setTranslate(-index * width);
    timer = setInterval(function () {
      //2.1 index++
      index++;
      //2.2 给imgUl加过渡
      addTransition();
      //2.3. 设置imgUl的translateX 负值
      setTranslate(- index * width);
    }, 1000);
  });


  //添加过渡
  function addTransition() {
    imgUl.style.transition = "all .2s";
    imgUl.style.webkitTransition = "all .2s";
  }
  //移除过渡
  function removeTransition() {
    imgUl.style.transition = "none";
    imgUl.style.webkitTransition = "none";
  }
  //设置translate
  function setTranslate(value) {
    imgUl.style.transform = "translateX(" + value + "px)";
    imgUl.style.webkitTransform = "translateX(" + value + "px)";
  }

})();