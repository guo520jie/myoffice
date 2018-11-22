/**
 * Created by HUCC on 2018/1/5.
 */
/*
;(function () {

  var nav = document.querySelector(".jd_nav");
  var ul = nav.querySelector("ul");
  var lis = ul.children;

  //1. 给ul注册3个触摸事件

  //1. 获取开始位置（y）
  var startY;
  var currentY = 0;//核心变量：记录每次滑动结束时的位置
  ul.addEventListener("touchstart", function (e) {
    startY = e.touches[0].clientY;
  });

  //1. 计算滑动的距离
  //2. 不需要过渡
  //3. 设置ul的translateY

  //4. 限定：滑动不能超出50px
  ul.addEventListener("touchmove", function (e) {
    var distance = e.touches[0].clientY - startY;

    removeTransiton();

    //滑动的位置
    var temp = currentY + distance;
    if(temp >= 50) {
      temp = 50;
    }

    if(temp <= nav.offsetHeight - ul.offsetHeight - 50) {
      temp = nav.offsetHeight - ul.offsetHeight - 50;
    }
    setTranslateY(temp);
  });

  //1. 记录下来滑动的距离
  //2. 弹回来
  ul.addEventListener("touchend", function (e) {
    var distance = e.changedTouches[0].clientY - startY;
    currentY += distance;
    console.log(currentY);
    if(currentY > 0) {
      currentY = 0;
      //并且使用动画跑回去
      addTransiton();
      setTranslateY(currentY);
    }

    if(currentY <= nav.offsetHeight - ul.offsetHeight) {
      currentY = nav.offsetHeight - ul.offsetHeight
      addTransiton();
      setTranslateY(currentY);
    }

  });


  function addTransiton() {
    ul.style.transition = "all .2s";
    ul.style.webkitTransition = "all .2s";
  }

  function removeTransiton() {
    ul.style.transition = "none";
    ul.style.webkitTransition = "none";
  }

  function setTranslateY(value) {
    ul.style.transform = "translateY(" + value + "px)";
  }

})();*/


//初始化iscroll控件
window.addEventListener("load", function () {
  new IScroll(".jd_nav", {
    scrollY:true,
    scrollX:false
  });


  //让右边也能滚动
  new IScroll(".jd_content");
});
