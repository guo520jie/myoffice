//2016.3.23
(function($) {
	$.fn.extend({
		scrC: function(option) {
			var supportTouch = ((window.DocumentTouch && document instanceof window.DocumentTouch) || 'ontouchstart' in window);
			var _this=$(this);
			var boxMask,boxCont,boxThis,boxBtnL,boxBtnR,boxMax,boxDis,boxTimer,boxDir;
			var boxHor,boxAuto,boxSpeed,boxDelay;
			var _start,_complete;
			if(option){
				boxDelay=option.delay!=null?option.delay:5;
				boxSpeed=option.speed!=null?option.speed:1;
				boxHor=option.hor!=null?option.hor:true;//是否水平方向滚动
				boxAuto=option.auto!=null?option.auto:true;
			}//end if
			else{
				boxDelay=5;
				boxSpeed=1;
				boxHor=true;//是否水平方向滚动
				boxAuto=true;
			}//end else			
			init();
			function init(){	
				boxMask=_this.children(".boxMask");
				boxCont=boxMask.children();
				boxThis=boxCont.children();
				boxBtnL=_this.children(".boxBtnL");
				if(boxHor) boxBtnL.css({top:(Math.floor(_this.height()-boxBtnL.height())/2)});
				else boxBtnL.css({left:(Math.floor(_this.width()-boxBtnL.width())/2)});
				boxBtnR=_this.children(".boxBtnR");
				if(boxHor) boxBtnR.css({top:(Math.floor(_this.height()-boxBtnR.height())/2)});
				else boxBtnR.css({left:(Math.floor(_this.width()-boxBtnR.width())/2)});
				boxMax=boxThis.length;//一共有几张图
				boxDir=-1;			
				boxDisFunc();
				_this.on("prev",prevFunc).on("next",nextFunc).on("stop",stopFunc).on("play",playFunc);
				if(supportTouch){
					if(boxHor) boxCont.one('swipeleft',swipeleft_handler).one('swiperight',swiperight_handler);
					else boxCont.one('swipeup',swipeleft_handler).one('swipedown',swiperight_handler);
				}//end if
				else boxThis.on('mouseenter',box_mouseenter).on('mouseleave',box_mouseleave);
				if(boxBtnL.length>0) boxBtnL.on('click',boxBtnL_click).on('mouseenter',box_mouseenter).on('mouseleave',box_mouseleave);
				if(boxBtnR.length>0) boxBtnR.on('click',boxBtnR_click).on('mouseenter',box_mouseenter).on('mouseleave',box_mouseleave);
				timerFunc();
			}//end func
			
			//---------------touch swipe 事件
			function swipeleft_handler(e){
				e.preventDefault();
				boxBtnR_click();
			}//end func
			function swiperight_handler(e){
				e.preventDefault();
				boxBtnL_click();
			}//end func
			
			//----------------自定义事件
			function stopFunc(e){
				clearInterval(boxTimer);
			}//end func
			function playFunc(e){
				timerFunc();
			}//end func
			function prevFunc(e){
				boxDir=1;
				boxRollFunc();
			}//end func
			function nextFunc(e){
				boxDir=-1;
				boxRollFunc();
			}//end func
			function boxBtnL_click(e){
				boxDir=1;
				boxRollFunc();
			}//end func
			function boxBtnR_click(e){
				boxDir=-1;
				boxRollFunc();
			}//end func	
			function box_mouseenter(e){
				clearInterval(boxTimer);
			}//end func
			function box_mouseleave(e){
				timerFunc();
			}//end func
			function timerFunc(){
				if(boxAuto){
					clearInterval(boxTimer);
					boxTimer=setInterval(boxRollFunc,boxDelay*1000);
				}//end if
			}//end func				
			function boxRollFunc(){
				if(!boxCont.hasClass("moving")){
					boxCont.addClass('moving');
					if(supportTouch){
						if(boxHor) boxCont.off('swipeleft',swipeleft_handler).off('swiperight',swiperight_handler);
						else boxCont.off('swipeup',swipeleft_handler).off('swipedown',swiperight_handler);
					}//end if
					boxDisFunc();
					if(boxDis>0){	
						boxThis=boxCont.children();
						if(boxHor){
							if(boxDir==-1) TweenLite.to(boxCont,boxSpeed, {x:-boxThis.first().outerWidth(true), ease:Power1.easeInOut,onComplete:function(){
								boxThis.last().after(boxThis.first());
								TweenLite.set(boxCont,{x:0});
								boxMotionComplete();
							}});
							else {
								boxThis.first().before(boxThis.last());
								boxThis=boxCont.children();
								TweenLite.set(boxCont,{x:-boxThis.first().outerWidth(true)});
								TweenLite.to(boxCont,boxSpeed, {x:0, ease:Power1.easeInOut,onComplete:boxMotionComplete});
							}//end else if
						}//end if(boxHor)
						else{
							if(boxDir==-1) TweenLite.to(boxCont,boxSpeed, {y:-boxThis.first().outerHeight(true), ease:Power1.easeInOut,onComplete:function(){
								boxThis.last().after(boxThis.first());
								TweenLite.set(boxCont,{y:0});
								boxMotionComplete();
							}});
							else {
								boxThis.first().before(boxThis.last());
								boxThis=boxCont.children();
								TweenLite.set(boxCont,{y:-boxThis.first().outerHeight(true)});
								TweenLite.to(boxCont,boxSpeed, {y:0, ease:Power1.easeInOut,onComplete:boxMotionComplete});
							}//end else if
						}//end if(!boxHor)
					}//end if boxDis>0
				}//end if(!boxCont.hasClass("moving") && boxDis>0)
			}//end func
			function boxMotionComplete(){
				boxCont.removeClass('moving');
				if(supportTouch){
					if(boxHor) boxCont.one('swipeleft',swipeleft_handler).one('swiperight',swiperight_handler);
					else boxCont.one('swipeup',swipeleft_handler).one('swipedown',swiperight_handler);
				}//end if
			}//end if
			function boxDisFunc(){
				var boxContWd=0;
				if(boxHor){
					boxThis.each(function(i,n){
						boxContWd+=$(n).outerWidth(true);
					});	
					boxCont.width(boxContWd);
					boxDis=boxCont.width()-boxMask.width();
				}else{
					boxThis.width(boxMask.width());
					boxDis=boxCont.height()-boxMask.height();
				}//end else
			}//end func
		},//end fn
		scrPrev: function() {
			$(this).trigger('prev');
		},//end fn
		scrNext: function() {
			$(this).trigger('next');
		},//end fn
		scrStop: function() {
			$(this).trigger('stop');
		},//end fn
		scrPlay: function() {
			$(this).trigger('play');
		}//end fn
	});//end extend
})(jQuery);//闭包