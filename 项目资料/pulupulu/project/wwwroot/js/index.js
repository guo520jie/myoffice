
window.onload = function(){
    // console.log('44444')
    $('.mask').hide()
}

function animate(){
    $('.page1 .header').fadeIn(1000)
    $('.title').animate({height:"65px"},500,'swing')
    $('.animate_fir').animate({"margin-top":'0'},1000,'swing')

    $('.opty_hiddle').fadeIn(1000)
    $('.animate_t').animate({"margin-bottom":'0'},1000,'swing')
    $('.animate_m').animate({"margin-top":'0'},1000,'swing')
    $('.animate_b').animate({"margin-top":'0'},1000,'swing')
}

animate()
// 动画
$(function () {
    $('#dowebok').fullpage({
        loopHorizontal: false,
        // 滚动前的回调
        onLeave: function (anchorLink, index,direction ) {

            // 底部固定导航
                $('.p2_foot').show()
                if(index==1){
                    $('.p2_foot').hide()
                }
            
            // console.log(direction)
            // 动画
            if(direction=="down"&&index==3){
                $('.p1m_content ul').delay(500).fadeIn()
                 $('.s3_top').delay(500).animate({"margin-top":'0'},1000,'swing')
            }

            if(direction=="down"&&index==4){
                $('.p4m_content ul').delay(500).fadeIn()
                $('.p4m_content li').delay(500).animate({"margin-top":'0'},1000,'swing')
            }

            if(direction=="down"&&index==5){
                $('.last1_content').delay(500).fadeIn()
                $('.last1_content .tit_detial').delay(500).animate({"margin-top":'0'},1000,'swing')
                $('.last1_content li').delay(500).animate({"margin-top":'0'},1000,'swing')
            }

            if(direction=="down"){
                $('.s2_hidden').delay(500).fadeIn()
                $('.s2_top').delay(500).animate({"margin-top":'0'},1000,'swing')

                // $('.s3_top').delay(500).animate({"margin-top":'0'},1000,'swing')
            

            // 底部导航
            $('.s_nav').eq(index-2).find('li').eq(0).addClass('now').siblings().removeClass('now');
            $('.s_nav').eq(index-2).find('.icon_left').hide()
            }
            // 导航栏
            $('.title li').eq(index - 1).addClass('active').siblings().removeClass('active');

            // var posa = 0.1666*(index-1)*100+"%"
            // console.log(posa)
            // $('.s_icon').css('left',posa)
            // 头部top值的切换 index是从1开始的
            if (index !== 1) {
                $('.title').css("top", 0)
            } else {
                // console.log(index)
                $('.title').css("top", 80)
                
            }

        },
        // 水平滚动前的回调
        onSlideLeave: function (anchorLink, index, slideIndex, direction) {
            if(index == 5){
                index = 4
            }
            // console.log(slideIndex)
            if (direction == "right") {
                console.log('111',index)
                $('.s_nav').eq(index - 2).find('li').eq(slideIndex + 1).addClass('now').siblings().removeClass(
                    'now')
                    
            } else {
            console.log(111, index)
                $('.s_nav').eq(index - 2).find('li').eq(slideIndex - 1).addClass('now').siblings().removeClass(
                    'now')        
            }

             // 左右箭头
             var li_num = $('.s_nav').eq(index-2).find('li').length;
            console.log(slideIndex)
            if(slideIndex == li_num-2&&direction == "right"){
                $('.s_nav .icon_right').hide()
                // $('.s_nav .icon_left').show()
            }else if(slideIndex == 1&&direction == "left"){
                $('.s_nav .icon_left').hide()
            }else{
                $('.s_nav .icon_right').show()
                $('.s_nav .icon_left').show()
            }

            // 动画
            if(index==2&&slideIndex==0&&direction == "right"){
                $('.s3_content ul').delay(500).fadeIn()
                $('.s3_content li').delay(500).animate({"margin-left":'0'},1000,'swing')
            }
            if(index==2&&slideIndex==1&&direction == "right"){
                $('.s4_content ul').delay(500).fadeIn()
                $('.s4_content li').delay(500).animate({"margin-left":'0'},1000,'swing')
            }
            if(index==2&&slideIndex==2&&direction == "right"){
                $('.s5_content ul').delay(500).fadeIn()
                $('.s5_content li').delay(500).animate({"margin-left":'0'},1000,'swing')
            }
            if(index==2&&slideIndex==3&&direction == "right"){
                $('.s6_content ul').delay(500).fadeIn()
                $('.s6_content li').delay(500).animate({"margin-left":'0'},1000,'swing')
            }
            if(index==2&&slideIndex==4&&direction == "right"){
                $('.s7_content ul').delay(500).fadeIn()
                $('.s7_content li').delay(500).animate({"margin-left":'0'},1000,'swing')
            }
            // page3动画

            if(index==3&&slideIndex==0&&direction == "right"){
                $('.p2m_content .ul_box').delay(500).fadeIn()
                $('.p2m_content ul').delay(500).animate({"margin-left":'0'},1000,'swing')
               
            }

            if(index==3&&slideIndex==1&&direction == "right"){
                $('.p3m_content .ul_box').delay(500).fadeIn()
                $('.p3m_content ul').delay(500).animate({"margin-left":'0'},1000,'swing')
               
            }


            // page5动画
            if(index==4&&slideIndex==0&&direction == "right"){
                
                $('.last2_content').delay(500).fadeIn()
                $('.last2_content').children().delay(500).animate({"margin-left":'0'},1000,'swing')
            }
            if(index==4&&slideIndex==1&&direction == "right"){
                
                $('.last3_content').delay(500).fadeIn()
                $('.last3_content').children().delay(500).animate({"margin-left":'0'},1000,'swing')
            }
            if(index==4&&slideIndex==2&&direction == "right"){
                
                $('.last4_content').delay(500).fadeIn()
                $('.last4_content').children().delay(500).animate({"margin-left":'0'},1000,'swing')
            }

        },
     
    });
});


// page4
$('.p4m_content li').on('click',function(){
    $(this).find('.tit_content').addClass('con_now')
    $(this).siblings().find('.tit_content').removeClass('con_now')
    $(this).find('.tit_img').addClass('tit_now')
    $(this).siblings().find('.tit_img').removeClass('tit_now')

    $(this).find('span').addClass('act_now').text('-')
    $(this).siblings().find('span').removeClass('act_now').text('+')

    $(this).find('.A1_content').addClass('A1_now')
    $(this).siblings().find('.A1_content').removeClass('A1_now')
})
