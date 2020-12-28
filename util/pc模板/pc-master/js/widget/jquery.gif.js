//2014.12.9
(function($) {	
	$.fn.extend({
		gifOn: function(option) {	
			var _this=$(this);
			var _src,_num,_now,_file,_sp;
			var _timer;
			if(option){;
				_num=option.num!=null?option.num:1;
				_now=option.now!=null?option.now:0;
				_sp=option.speed!=null?option.speed:100;
			}//end if
			else{
				_num=1;
				_sp=100;
			}//end else
			init();
			
			function init(){
				_src=_this.attr('src');
				if(_src && _src!=""){
					_file=_src.split('.');
					_this.on('off',_this_off);
					sequence();
				}//end if
			}//end func
			
			function _this_off(e,_stop){
				clearTimeout(_timer);
				if(value) _this.attr({src:_src});
				_this.off('off',_this_off);
			}//end func
			
			function sequence(){
				_now++;
				_now=_now>_num?1:_now;
				_this.attr({src:_file[0]+_now+'.'+_file[1]});
				_timer=setTimeout(sequence,_sp);
			}//end func	
			
		},//end fn
		gifOff: function(value) {
			value=value!=null?value:false;
			$(this).trigger('off',[value]);
		}//end fn
	});//end extend	
})(jQuery);//闭包