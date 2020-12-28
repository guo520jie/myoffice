//2017.12.27
(function($) {
	$.fn.extend({
		scrbar: function(options) {	
			var $this=$(this);
			var html5=(window.addEventListener && !document.all) || (window.addEventListener && document.documentMode >=9);
			var supportTouch = ((window.DocumentTouch && document instanceof window.DocumentTouch) || 'ontouchstart' in window);
			var $cont,$panel,$child,$back,$backHt=0,$ford,$fordHt=0,$zone,$hand,$lineT,$lineB,$tar,$can;
			var $sizeCont=0,$sizeThis=0,$sizeTimer,$btnTimer;
			var defaults = {speed:20};
			var opts = $.extend(defaults, options);
			var posLast=[];
			var $paused=false;
			init();	
			
			function init(){
				$tar=0;
				$cont=$this.children(".cont");
				$child=$cont.children();
				$panel=$this.children(".panel");
				$back=$panel.children(".back");
				$ford=$panel.children(".ford");
				$zone=$panel.children(".zone");
				$hand=$zone.children();
				if(supportTouch){
					if($back.length>0) $back.remove();
					if($ford.length>0) $ford.remove();
				}//end if
				else{
					if($back.length>0) $backHt=$back.height();
					if($ford.length>0) $fordHt=$ford.height();
				}//edn else
				$this.on("off",this_off).on("goto",goto_handler).on("pause",pause_handler).on("resume",resume_handler).on("top",top_handler).on("bottom",bottom_handler).on("refresh",size_handler);
				$this.on('mousewheel',$this_mousewheel);
				resume_handler();
			}//end func
			
			function this_off(e){
				$this.off();
				pause_handler();
			}//end func
			
			function resume_handler(e){
				$paused=false;
				if(supportTouch){
					$zone.on("touchstart",$zone_touchstart).on("touchmove",$zone_touchmove);
					$cont.on("touchstart",$cont_touchstart).on("touchmove",$cont_touchmove);
				}//end if
				else{
					$zone.on('mousedown',$zone_mousedown);
					$(document).on('mouseup',$this_mouseup);
					if($back.length>0) $back.on('mousedown',back_mousedown);
					if($ford.length>0) $ford.on('mousedown',ford_mousedown);
				}//end else
				size_handler();
			}//end func
			
			function pause_handler(e){
				$paused=true;
				if(supportTouch){
					$zone.off("touchstart",$zone_touchstart).off("touchmove",$zone_touchmove);
					$cont.off("touchstart",$cont_touchstart).off("touchmove",$cont_touchmove);
				}//end if
				else{
					$zone.off('mousedown',$zone_mousedown);
					$(document).off('mouseup',$this_mouseup);
					if($back.length>0) $back.off('mousedown',back_mousedown);
					if($ford.length>0) $ford.off('mousedown',ford_mousedown);
				}//end else
				clearTimeout($sizeTimer);
				clearInterval($btnTimer);
			}//end func
			
			function top_handler(e){
				$tar=$lineT;
				scrollFunc();
			}//edn func
			
			function bottom_handler(e){
				$tar=$lineB;
				scrollFunc();
			}//edn func
			
			//-------------------------------高宽度侦测及初始化
			function size_handler(){
				if($sizeCont!=$cont.outerHeight() || $sizeThis!=$this.outerHeight()){
					$sizeCont=$cont.outerHeight();
					$sizeThis=$this.outerHeight();
					$zone.css({height:$sizeThis-$backHt-$fordHt});
					$hand.css({height:$sizeThis/$sizeCont*$zone.height()});
					$lineT=$hand.height()/2;
					$lineB=$zone.height()-$hand.height()/2;
					if($sizeCont<=$sizeThis){
						$can=false;
						$panel.hide();
					}//end if
					else{
						$can=true;
						$panel.show();
//						goto_handler(null,0);
					}//end else
				}//end if
			}//end func
			
			//-------------------------------自定义事件
			function goto_handler(e,pos){
				console.log('pos:'+pos);
				icom.clearTimeout($sizeTimer);
				size_handler();
				$tar=pos/($sizeCont-$sizeThis)*($zone.height()-$hand.height())+$lineT;
				console.log('$tar:'+$tar);
				scrollFunc();
			}//end func
			
			//-----------------TOUCH事件
			function $cont_touchstart(e){
				if($can){
					posLast=[event.touches[0].clientX,event.touches[0].clientY];
				}//end if
			}//end func
			
			function $cont_touchmove(e){
				e.preventDefault();
				if($can){
					$tar-=event.changedTouches[0].clientY-posLast[1];
					scrollFunc();
					posLast=[event.changedTouches[0].clientX,event.changedTouches[0].clientY];
				}//end if
			}//end func
			
			function $zone_touchstart(e){
				e.preventDefault();
				if($can){
					posLast=[event.touches[0].clientX,event.touches[0].clientY];
					$tar=event.touches[0].clientY+$(window).scrollTop()-$zone.offset().top;
					scrollFunc();
				}//end if
			}//end func
			
			function $zone_touchmove(e){
				e.preventDefault();
				if($can){
					$tar+=event.changedTouches[0].clientY-posLast[1];
					scrollFunc();
					posLast=[event.changedTouches[0].clientX,event.changedTouches[0].clientY];
				}//end if
			}//end func
			
			//-------------------------------鼠标事件
			function $this_mousewheel(e,delta){
				e.preventDefault();
				e.stopImmediatePropagation();
				if($can && !$paused){
					delta=delta/Math.abs(delta)*opts.speed;
					$tar-=delta;
					scrollFunc();
				}//edn if
			}//end func
			
			function $zone_mousedown(e){
				$(document).on('mousemove',$this_mousemove);
				$tar=e.pageY-$zone.offset().top;
				scrollFunc();
				mouseSelectOff();
			}//end func
			function $this_mousemove(e){
				$tar=e.pageY-$zone.offset().top;
				scrollFunc();
				mouseSelectOff();
			}//end func
			
			function $this_mouseup(e){
				$(document).off('mousemove',$this_mousemove);
				clearInterval($btnTimer);
				mouseSelectOn();
			}//end func
			
			function back_mousedown(e){
				clearInterval($btnTimer);
				$btnTimer=setInterval(function(){
					$tar-=opts.speed;
					scrollFunc();
				},50);
				mouseSelectOff();
			}//end func
			
			function ford_mousedown(e){
				clearInterval($btnTimer);
				$btnTimer=setInterval(function(){
					$tar+=opts.speed;
					scrollFunc();
				},50);
				mouseSelectOff();
			}//end func
			
			function mouseSelectOff(){
				document.onselectstart = function () { return false; };	//防止ie选取
				document.unselectable= "on";//防止OPERA选取
				$this.css({"-moz-user-select":"none","-webkit-user-select":"none","-ms-user-select":"none","user-select":"none"});//禁止FIREFOX、chrome、ie9选取
			}//end func
			
			function mouseSelectOn(){
				document.onselectstart = function () { return true; };//允许IE选取
				document.unselectable= "off";//允许OPERA选取
				$this.css({"-moz-user-select":"auto","-webkit-user-select":"auto","-ms-user-select":"auto","user-select":"auto"});//允许FIREFOX、chrome、ie9选取
			}//end func	
			
			//-------------------------------运动计算部分	 
			function scrollFunc(){
				$tar=$tar>$lineB?$lineB:$tar;
				$tar=$tar<$lineT?$lineT:$tar;
				var pos=-($tar-$lineT)/($zone.height()-$hand.height())*($sizeCont-$sizeThis);
				$hand.css({top:$tar-$lineT});
				if(html5) $cont.css({y:pos});	
				else $cont.css({top:pos});
				if($tar==$lineT && opts.onTop) opts.onTop();
				else if($tar==$lineB && opts.onBottom) opts.onBottom();
			}//end func	
			
		},//end fn
		scrbarGoto: function(pos) {
			if(pos && pos>=0) $(this).triggerHandler('goto',[pos]);
		},//end fn
		scrbarPause: function() {
			$(this).triggerHandler('pause');
		},//end fn
		scrbarTop: function() {
			$(this).triggerHandler('top');
		},//end fn
		scrbarBottom: function() {
			$(this).triggerHandler('bottom');
		},//end fn
		scrbarResume: function() {
			$(this).triggerHandler('resume');
		},//end fn
		scrbarRefresh: function() {
			i$(this).triggerHandler('refresh');
		},//end fn
		scrbarOff: function() {
			$(this).triggerHandler('off');
		}//end fn
	});//end extend
})(jQuery);//闭包