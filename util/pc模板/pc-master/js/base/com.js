//2018.10.27
var icom=importCom();

function importCom(){
	var com={};
	
	com.console=function(msg,type){
		type=type||'log';
		if(window.console){
			switch(type){
				case 'log':
					window.console.log(msg);
				break;
				case 'info':
					window.console.info(msg);
				break;
				case 'warn':
					window.console.warn(msg);
				break;
				case 'error':
					window.console.error(msg);
				break;
				default:
					window.console.log(msg);
				break;
			}//end switch
		}//end if
	}//end func
	
	com.alert=function(text,callback){
		var box=$('<div class="alertBox"><div><p class="text"></p><p class="btn"><a class="close">确认</a></p></div></div>').appendTo($('body'));
		box.find('.text').html(text);
		box.show();
		box.find('a.close').click(function(e) {
           box.remove();
		   if(callback) callback();
        });
	}//end func
	
	//取代jquery的fadeIn
	com.fadeIn = function(obj, dur, callback) {
		if(obj) {
			dur = dur || 500;
			obj.show().css({
				opacity: 0
			}).transition({
				opacity: 1
			}, dur, function() {
				if(callback) callback($(this));
			});
		} //end if
	} //end func

	//取代jquery的fadeOut
	com.fadeOut = function(obj, dur, callback) {
		if(obj) {
			dur = dur || 500;
			obj.transition({
				opacity: 0
			}, dur, function() {
				$(this).hide().css({
					opacity: 1
				});
				if(callback) callback($(this));
			});
		} //end if
	} //end func
	
	com.mouseSelectOff=function(){
		document.onselectstart = function () { return false; };	//阻止ie选取
		document.unselectable= "on";//阻止OPERA选取
		$('body').css({"-moz-user-select":"none","-webkit-user-select":"none","-ms-user-select":"none","user-select":"none"});
	}//end func
	
	com.mouseSelectOn=function(){
		document.onselectstart = function () { return true; };//允许ie选取
		document.unselectable= "off";//允许OPERA选取
		$('body').css({"-moz-user-select":"auto","-webkit-user-select":"auto","-ms-user-select":"auto","user-select":"auto"});
	}//end func	
	
	com.popOn=function(obj,options){
		if(obj && obj.length>0){
			var defaults = {closeType:'button',closeBtn:obj.find('a.close'),remove:false,fade:0};
			var opts = $.extend(defaults,options);
			if(opts.text) obj.find('.text').html(opts.text);
			if(opts.fade>0) obj.fadeIn(opts.fade);
			else obj.show();
			if(opts.closeBtn.length>0 && opts.closeType=='button') opts.closeBtn.one('click',obj_close);
			else obj.one('click',obj_close);
			obj.on('close',obj_close);
		}//end if
		function obj_close(e){
			if(opts.closeBtn.length>0 && opts.closeType=='button') opts.closeBtn.off('click',obj_close);
			else obj.off('click',obj_close);
			if(opts.fade) obj.fadeOut(opts.fade,function(){
				if(opts.remove) obj.remove();
			});
			else if(opts.remove) obj.remove();
			else obj.hide();
			obj.off('close',obj_close);
			if(opts.onClose) opts.onClose(obj);
		}//end func
	}//end func
	
	com.popOff=function(obj){
		if(obj && obj.length>0) obj.trigger('close');
	}//end func
	
	
	//获得http url参数
	com.getQueryString=function(name) {
		if(name && name!=''){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return decodeURIComponent(r[2]); return null;
		}//end if
		else return null;
	}//end func
	
	//获得http url文件名末尾的数字
	com.getQueryInt=function(len){
		len=len!=null?len:1;
		var path=window.location.pathname.split('/');
		var file=path[path.length-1];
		var str=file.split('.');
		return parseInt(str[0].substr(str[0].length-len));
	}//end func
	
	//载入图片函数
	com.imageLoad=function(src,callback){
		if(src && src!=''){
			var loader = new PxLoader();
			if($.type(src) === "string" && src!='') loader.addImage(src);
			else if($.type(src) === "array" && src.length>0){
				for(var i=0; i<src.length; i++){
					loader.addImage(src[i]);
				}//end for
			}//end else
			loader.addCompletionListener(function() {
				com.console('images load complete');
				loader=null;
				if(callback) callback(src);
			});			
			loader.start();	
		}//end if
	}//end func	
	
	//打印object数据
	com.objectPrint=function(data){
		if(data){
			com.console("-----------------------------------------------------------------------------");
			var info="";
			for(var i in data) info+=i+":"+data[i]+"  "
			com.console(info);
			com.console("-----------------------------------------------------------------------------");
		}//end if
	}//end func
	
	//常用正则
	com.checkStr = function(str, type) {
		if(str && str != '') {
			type = type || 0;
			switch(type) {
				case 0:
					var reg = new RegExp(/^1[3-9]\d{9}$/); //手机号码验证
					break;
				case 1:
					var reg = new RegExp(/^[1-9]\d{5}$/); //邮政编码验证
					break;
				case 2:
					var reg = new RegExp(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/); //匹配EMAIL
					break;
				case 3:
					var reg = new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/); //匹配身份证
					break;
				case 4:
					var reg = new RegExp(/^\d+$/); //是否为0-9的数字
					break;
				case 5:
					var reg = new RegExp(/^[a-zA-Z\u0391-\uFFE5]*[\w\u0391-\uFFE5]*$/); //不能以数字或符号开头
					break;
				case 6:
					var reg = new RegExp(/^\w+$/); //匹配由数字、26个英文字母或者下划线组成的字符串
					break;
				case 7:
					var reg = new RegExp(/^[\u0391-\uFFE5]+$/); //匹配中文
					break;
				case 8:
					var reg = new RegExp(/^[a-zA-Z\u0391-\uFFE5]+$/); //不能包含数字和符号
					break;
			} //end switch
			if(reg.exec($.trim(str))) return true;
			else return false;
		} //end if
		else return false;
	} //end func
	
	//使用post方法进行php中间件通讯
	com.post = function(url, data, callback) {
		if(url && url != '') post_handler(url, data, callback, 'post');
	} //end func

	//使用get方法进行php中间件通讯
	com.get = function(url, data, callback) {
		if(url && url != '') post_handler(url, data, callback, 'get');
	} //end func

	function post_handler(url, data, callback, action) {
		if(data && $.isPlainObject(data)) data = JSON.stringify(data);
		$.post("./http/httpPost.php", {
			api_url: url,
			post_data: data,
			action: action
		}, function(resp) {
			if(callback) callback(resp);
		}, "json");
	} //edn func
	
	//物体抖动
	com.shake = function(box, options) {
		if(box && box.length > 0) {
			var defaults = {
				rx: 5,
				ry: 5,
				delay: 33,
				now: 0,
				max: 5,
				restore: true
			};
			var opts = $.extend(defaults, options);
			var x = imath.randomRange(-opts.rx, opts.rx);
			var y = imath.randomRange(-opts.ry, opts.ry);
			box.css({
				x: x,
				y: y
			});
			opts.now++;
			if(opts.now > opts.max) {
				if(opts.restore) box.css({
					x: 0,
					y: 0
				});
				if(opts.onComplete) opts.onComplete();
			} //end if
			else setTimeout(com.shake, opts.delay, box, opts);
		} //end if
	} //end func
	
	//获取textarea里的回车和空格
	com.textareaGet = function(textarea, row) {
		row = row || 0;
		var str1 = textarea.val();
		if(str1 == '') return '';
		else {
			var str2 = str1.replaceAll("\n", "<br/>");
			return row_cut(str2, row);
		} //end else
	} //edn func

	//输入textarea里的回车和空格
	com.textareaSet = function(textarea, str) {
		if(str == '') textarea.val('');
		else textarea.val(str.replaceAll("<br/>", "\n"));
	} //edn func

	//限制textarea输入文字的行数
	com.textareaLock = function(textarea) {
		if(textarea && textarea.length > 0) {
			var timer;
			var row = parseInt(textarea.attr('rows')) || 0;
			var col = parseInt(textarea.attr('cols')) || 0;
			var max = parseInt(textarea.attr('maxlength')) || 0;
			max = max == 0 ? row * col : max;
			if(row > 0 && col > 0 && max > 0) textarea.on('focus', textarea_focus).on('blur', textarea_blur);
		} //end if

		function textarea_focus(e) {
			timer = requestAnimationFrame(textarea_lock);
		} //edn func

		function textarea_blur(e) {
			cancelAnimationFrame(timer);
			var first = com.textareaGet(textarea, row);
			if(first.indexOf('<br/>') != -1) {
				var str2 = first.split('<br/>');
				var str3 = '';
				for(var i = 0; i < str2.length; i++) {
					str3 += col_break(str2[i], col);
					if(i < str2.length - 1) str3 += '<br/>';
				} //end for
				str3 = row_cut(str3, row);
				var final = str3.replaceAll("<br/>", "\n");
				textarea.val(final);
			} //end if
		} //edn func

		function textarea_lock() {
			var first = com.textareaGet(textarea, row);
			if(first.indexOf('<br/>') == -1) textarea.attr({
				maxlength: max
			});
			else textarea.attr({
				maxlength: max + (first.split('<br/>').length - 1) * 2
			});
		} //edn func
	} //edn func

	function row_cut(str, row) {
		row = row || 0;
		var str2 = str.split('<br/>');
		if(row <= 0 || str2.length <= row) return str;
		else {
			var str3 = '';
			for(var i = 0; i < row; i++) {
				str3 += str2[i];
				if(i < row - 1) str3 += '<br/>';
			} //edn for
			return str3;
		} //end else
	} //end func

	function col_break(str, col) {
		var line = Math.ceil(str.length / col);
		if(line == 1) return str;
		else {
			var str1 = '';
			for(var i = 0; i < line; i++) {
				if(i == 0) str1 += str.substr(0, col) + '<br/>';
				else if(i < line - 1) str1 += str.substr(i * col, col) + '<br/>';
				else str1 += str.substr(i * col);
			} //edn for
			return str1;
		} //end else
	} //end func

	function col_cut(str, col) {
		if(str.length > col) return str.substr(0, col);
		else return str;
	} //end func

	//限制textarea输入文字的行数
	com.textareaUnlock = function(textarea) {
		textarea.off();
	} //edn func
	
	//切割单行文字成几行
	com.textToMulti = function(str,col) {
		if(str!='' && col>1){
			if(str.indexOf('\n') == -1 && str.length>col) {
				var str1='';
				var line=Math.ceil(str.length/col);
				for(var i = 0; i < line; i++) {
					if(i < line - 1) str1 += str.substr(i * col, col) + '\n';
					else str1 += str.substr(i * col);
				} //edn for
				return str1;
			} //end if
			else return str;
		}//edn if
		else return null;
	} //edn func
	

	com.url = function(url, para) {
		var now = -1;
		for(var key in para) {
			now++;
			if(now == 0) url += '?';
			else url += '&';
			url += key + '=' + para[key]
		} //end for
		return url;
	}; //end func

	com.setTimeout = function(callback, frame, type) {
		type = type || 0;
		if(frame > 0 && callback) return setTimer(callback, frame, type, false);
	} //edn func

	com.clearTimeout = function(timer) {
		if(timer && timer.timer) clearTimer(timer);
	} //edn func

	com.setInterval = function(callback, frame, type) {
		type = type || 0;
		if(frame > 0 && callback) return setTimer(callback, frame, type, true);
	} //edn func

	com.clearInterval = function(timer) {
		if(timer && timer.timer) clearTimer(timer);
	} //edn func

	function clearTimer(timer) {
		cancelAnimationFrame(timer.timer);
		timer.now = 0;
		timer.start = new Date().getTime();
		timer.timer = null;
	} //edn func

	function setTimer(callback, frame, type, interval) {
		var timer = {
			now: 0,
			start: new Date().getTime(),
			timer: null
		};
		timer_handler();
		return timer;

		function timer_handler() {
			if(type) timer.now++;
			else timer.now = new Date().getTime() - timer.start;
			var timeup = type ? timer.now == frame : timer.now >= frame;
			if(timeup) {
				timer.now = 0;
				timer.start = new Date().getTime();
				callback();
			} //end if
			if(interval || (!interval && !timeup)) timer.timer = requestAnimationFrame(timer_handler);
		} //end func

	} //edn func

	com.canvas_send = function(canvas, callback, secretkey, type, compress) {
		if(canvas) {
			secretkey = secretkey || 'test';
			type = type || 'jpg';
			compress = compress || 0.8;
			if(type == 'png') var base64 = canvas.toDataURL('image/png');
			else var base64 = canvas.toDataURL('image/jpeg', compress);
			this.base64_send(base64, callback, secretkey);
		} //edn if
	} //end func

	com.base64_send = function(base64, callback, secretkey) {
		if(base64) {
			secretkey = secretkey || 'test';
			$.post('http://tool.be-xx.com/cdn/base64', {
				data: base64,
				key: secretkey
			}, function(resp) {
				if(resp.errcode==0){
					if(callback) callback(resp.result);
				}//edn if
				else{
					com.console('errmsg:'+resp.errmsg);
				}//edn else
			},'json');
		} //edn if
	} //end func
	
	com.base64_get = function(link, callback, secretkey) {
		if(link) {
			secretkey = secretkey || 'test';
			$.post('http://tool.be-xx.com/image/base64', {
				link: link,
				key: secretkey
			}, function(resp) {
				if(callback) callback(resp);
			},'text');
		} //edn if
	} //end func
	
	com.qrcode = function(txt,options) {
		var defaults = {size:200,color:'#000000',bg:'#ffffff',border:0,error:0,logo:false};
		var data = $.extend(defaults, options);
		if(txt && txt!=''){
			var src='http://tool.be-xx.com/image/qrcode?txt='+txt+'&size='+data.size+'&color='+data.color+'&bg='+data.bg+'&border='+data.border+'&error='+data.error+'&logo='+data.logo;
			return src;
		}//edn if
		else return null;
	} //end func
	
	com.barcode = function(txt,options) {
		var defaults = {width:400,height:200,color:'#000000',bg:'#ffffff',pure:true};
		var data = $.extend(defaults, options);
		if(txt && txt!=''){
			var src='http://tool.be-xx.com/image/barcode?txt='+txt+'&width='+data.width+'&height='+data.height+'&color='+data.color+'&bg='+data.bg+'&pure='+data.pure;
			return src;
		}//edn if
		else return null;
	} //end func
	
	com.clipboard=function(box,val,onComplete,onError){
		var support = !!document.queryCommandSupported;
		com.console('support:'+support);
		if(support){
			if(box.length>0 && val!=''){
				box.attr({'data-copy':val}).on('click',{callback:onComplete},copyText);
			}//edn if
		}//edn if
		else{
			com.console('浏览器不支持复制文本到剪贴板');
			if(onError) onError();
		}//end else
	}//edn func
	
	function copyText(e){
		var val=$(this).data('copy');
		var input=$('<textarea readonly="readonly"></textarea>').html(val).css({position:'absolute',left:0,top:0,width:1,height:1,visible:'hidden'}).appendTo('body');
		input[0].select();
		input[0].setSelectionRange(0, input[0].value.length);
		com.console('copy content:'+input.val())
		document.execCommand('Copy');
		input.remove();
		input=null;
		if(e.data.callback) e.data.callback();
	}//edn func
	
	return com;
}//end import

String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}