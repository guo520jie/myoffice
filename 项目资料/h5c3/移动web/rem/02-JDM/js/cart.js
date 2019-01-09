/**
 * Created by HUCC on 2018/1/7.
 */

//jd_checkbox选中不选中
;(function () {

  //1. 获取页面中所有的jd_checkbox
  var all = document.querySelectorAll(".jd_checkbox");

  //2. 注册点击事件
  /*
  all.forEach(function (e, i) {
    e.addEventListener("click", function () {
      //3. 切换checked
      e.classList.toggle("checked");
    });
  });
  */
  for(var i = 0; i < all.length; i++) {
    all[i].addEventListener("click", function () {
      this.classList.toggle("checked");
    });
  }

  //全选的功能
  var title = document.querySelector(".shopping_title .jd_checkbox");
  var contents = document.querySelectorAll(".shopping_content .jd_checkbox");
  title.addEventListener("click", function () {
    //思路：判断title是否有checked类，如果有，让contents所有人都加上checked
    //设置contents中所有人的checked类跟title一样即可。
    for(var i = 0; i < contents.length; i++) {
      if(title.classList.contains("checked")){
        contents[i].classList.add("checked");
      }else {
        contents[i].classList.remove("checked");
      }
    }
  });

})();


//垃圾桶功能
;(function () {


  //1. 找到所有的垃圾桶，注册点击事件
  var rubbishes = document.querySelectorAll(".rubbish");
  var mask = document.querySelector(".jd_mask");
  var cancel = document.querySelector(".jd_mask .cancel");
  var confirm = document.querySelector(".jd_mask .confirm");

  var title;//存储翻开那个盖子
  var id;//存储要删除的那个id
  //2. 翻开盖子，显示遮罩层
  for(var i = 0; i < rubbishes.length; i++) {
    rubbishes[i].addEventListener("click", function () {
      //显示遮罩层
      mask.style.display = "block";

      //获取自定义属性 data-id
      id = this.dataset.id;
      console.log(id);

      //翻盖子
      title = this.children[0];
      title.style.transform = "rotate(20deg)";
      title.style.transition = "all 0.5s";
      title.style.transformOrigin = "right bottom";
    })
  }


  //3. 点击取消，隐藏遮罩层，把盖子翻回去
  cancel.addEventListener("click", function () {
    mask.style.display = "none";
    title.style.transform = "rotate(0deg)";
  });

  //4. 点击确定按钮，删除当前盖子对应shopping_content
  confirm.addEventListener("click", function () {

    //通过把div找到
    var item = document.getElementById(id);
    //如何删除
    item.parentNode.removeChild(item);


    //隐藏遮罩
    mask.style.display = "none";
  });

})();