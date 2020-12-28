//2014.10.21
(function($) {	
	$.fn.extend({
		fadeOn: function(option) {		
			var _this=$(this);
			var _shell,_box,_timer,_now,_max;
			var boxBtn,boxBtnThis,boxBtnL,boxBtnR;
			var _delay,_sp;
			if(option){
				_delay=option.delay!=null?option.delay:5000;//滚动间隔
				_sp=option.speed!=null?option.speed:1000;//滚动速度，数字越小越流畅
			}//end if
			else{
				_delay=5000;
				_sp=1000;
			}//end else
			_delay+=_sp;
			init();
			
			function init(){
				_shell=_this.children("ul");
				_box=_shell.children();
				_box.first().show().siblings().hide();
				_now=0;
				_max=_box.length-1;
				boxBtnL=_this.children(".boxBtnL");
				boxBtnR=_this.children(".boxBtnR");
				boxBtn=_this.children("a.boxBtn");
				if(boxBtn.length>0){
					for(var i=0; i<_box.length;i++){
						var btn=$('<span></span>').appendTo(boxBtn);
						btn.on('click',btn_click).on('mouseenter',box_mouseenter).on('mouseleave',box_mouseleave);
					}//end for
					boxBtnThis=boxBtn.children();
					boxBtnChange();
				}//end if
				if(boxBtnL.length>0) boxBtnL.on('click',boxBtnL_click);
				if(boxBtnR.length>0) boxBtnR.on('click',boxBtnR_click);
				_this.on("goto",gotoFunc).on('mouseenter',box_mouseenter).on('mouseleave',box_mouseleave);	
				_timerFunc();							
			}//end func
			
			function gotoFunc(e,value){
				value=value>_max?_max:value;
				value=value<0?0:value;
				boxGoto(value);
			}//end func
			
			function boxBtnL_click(e){
				if(boxTar<0){
					boxDir=1;
					boxRollFunc();
				}//end if
			}//end func
			
			function boxBtnR_click(e){
				var now=_now++;
				now=now>_max-1?0:now;
				boxGoto(now);
			}//end func	
			
			function btn_click(e){	 
				var now=$(this).index();
				boxGoto(now);
			}//end func
			
			function boxGoto(id){
				if(id!=_now){
					var last=_box.eq(_now);
					last.stop(true,true);
					_now=id; 
					var now=_box.eq(_now);
					now.appendTo(_shell);
					now.fadeIn(_sp,function(){
						last.hide();
					});
					boxBtnChange();
					_timerFunc();
				}//end if
			}//end func
			
			function box_mouseenter(){
				clearInterval(_timer);
			}//end func
			
			function box_mouseleave(){
				_timerFunc();
			}//end func
			
			function _timerFunc(){
				clearInterval(_timer);
				_timer=setInterval(boxFadeFunc,_delay);
			}//end timer
			
			function boxFadeFunc(){
				var last=_box.eq(_now);
				_now++;
				_now=_now>_max?0:_now;
				var now=_box.eq(_now);
				now.appendTo(_shell);
				now.fadeIn(_sp,function(){
					last.hide();
				});
				boxBtnChange();
			}//end func
			
			function boxBtnChange(){
				if(boxBtn.length>0) boxBtnThis.removeClass().eq(_now).addClass("active");
			}//end func
			
		},//end fn
		fadeGoto: function(value) {
			if(value)$(this).trigger('goto',[value]);
		}//end fn		
	});//end extend
})(jQuery);//闭包