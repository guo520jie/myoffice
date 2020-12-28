//2020.12.15
var icom = importCom();
function importCom() {
	var com = {};

	//初始化
	com.init = function(callback) {
		var articleBox=$('article');
		var html=$('html');
		if(ibase.debug) VConsole_dected();
		if(ibase.dir == 'portrait'){
			lock_dected();
		}//edn if
		else{
			html_resize();
			$(window).on('resize', window_orientation);
			lock_dected();
		} //end else
		if(os.weixin) wx.ready(fontSize_handler);// 设置网页字体为默认大小
		
		function fontSize_handler() {
		   // 设置网页字体为默认大小
		   WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
		   // 重写设置网页字体大小的事件
		   WeixinJSBridge.on('menu:setfont', function() {
			   WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
		   });
		}//edn func
		
		function VConsole_dected(){
			if(window.VConsole) new VConsole();
			else requestAnimationFrame(VConsole_dected);
		}//edn func
		
		function lock_dected() {
			if(ibase.lock) requestAnimationFrame(lock_dected);
			else if(callback) callback();
		} //edn func

		function window_orientation(e) {
			if(os.ios) for(var i=0; i<3; i++) setTimeout(html_resize, i*150);
			else html_resize();
		} //edn event
		
		function html_resize() {
			var dir=ibase.getOrient(true);
			console.log('html resize direction:'+dir);
			if(dir == 'portrait') {
				articleBox.css({
					width: window.innerHeight,
					height: window.innerWidth,
					rotate: 90,
					left: window.innerWidth
				});
			} //end if
			else{
				articleBox.css({
					width: window.innerWidth,
					height: window.innerHeight,
					rotate: 0,
					left: 0
				});
			}//end if
		} //edn func
		
	} //edn func
	
	//解锁屏幕滑动
	com.screenScrollEnable = function() {
		var article=$('article');
		var html=$('html');
		if(ibase.dir=='portrait'){
			article.css({'overflow-y': 'auto', height:'auto'}).off('touchmove', noScroll);
		}//edn if
		else article.off('touchmove', noScroll);
	} //end func
	
	//锁定屏幕滑动
	com.screenScrollUnable = function() {
		var article=$('article');
		if(ibase.dir=='portrait'){
			article.css({ 'overflow-y': 'hidden', height:'100%'}).on('touchmove', noScroll);
		}//edn if
		else article.on('touchmove', noScroll);
	} //end func
	
	function noScroll(e) {
		e.preventDefault();
	} //end func

	//取代jquery的fadeIn
	com.fadeIn = function(obj, dur=500, callback) {
		if(obj && obj.length > 0) {
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
	com.fadeOut = function(obj, dur=500, callback) {
		if(obj && obj.length > 0) {
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
	
	//打开弹窗，会自动寻找a.close对象绑定关闭事件，并在关闭时执行回调
	com.popOn = function(obj, options) {
		if(obj && obj.length > 0) {
			var defaults = {
				closeEvent: 'click',
				closeType: 'button',
				closeBtn: obj.find('a.close'),
				onClose:function(){},
				remove: false
			};
			var opts = $.extend(defaults, options);
			if(opts.text) obj.find('.text').html(opts.text);
			if(opts.fade) com.fadeIn(obj, opts.fade);
			else obj.show();
			if(opts.closeBtn.length > 0 && opts.closeType == 'button') opts.closeBtn.one(opts.closeEvent, obj_close);
			else obj.one(opts.closeEvent, obj_close);
			obj.on('close', obj_close);
		} //end if
		function obj_close(e) {
			if(opts.closeBtn.length > 0 && opts.closeType == 'button') opts.closeBtn.off(opts.closeEvent, obj_close);
			else obj.off(opts.closeEvent, obj_close);
			if(opts.fade) com.fadeOut(obj, opts.fade, function() {
				if(opts.remove) obj.remove();
			});
			else if(opts.remove) obj.remove();
			else obj.hide();
			obj.off('close', obj_close);
			opts.onClose(obj);
		} //end func
	} //end func
	
	//关闭使用popOn方法打开的弹窗
	com.popOff = function(obj) {
		if(obj && obj.length > 0) obj.trigger('close');
	} //end func

	//取代系统alert
	com.alert = function(text='', callback) {
		if(text != '') {
			var box = $('<aside class="alertBox"><div><p class="text"></p><p class="btn"><a href="javascript:;" class="close">确定</a></p></div></aside>').appendTo(ibase.dir == 'landscape' ? 'article' : 'body');
			com.popOn(box, {
				text: text,
				onClose: callback,
				remove: true,
				closeEvent: 'click'
			});
		} //end if
	} //end func
	
	//带有“取消”和“确认”按钮的对话框
	com.confirm = function(text='', callbackConfirm, callbackCancel, btnCancelText='取消', btnConfirmText='确认') {
		if(text != '') {
			var box = $('<aside class="confirmBox"><div><p class="text">'+text+'</p><p class="btn"><a href="javascript:;" class="cancel">'+btnCancelText+'</a><a href="javascript:;" class="confirm">'+btnConfirmText+'</a></p></div></aside>').appendTo(ibase.dir == 'landscape' ? 'article' : 'body');
			var btn=box.find('a');
			btn.one('click',function(e){
				if($(this).index()==0 && callbackCancel) callbackCancel();
				else if($(this).index()==1 && callbackConfirm) callbackConfirm();
				btn.off();
				box.remove();
			})
		} //end if
	} //end func

	//获得http url参数
	com.getQueryString = function(name='') {
		if(window.location.search!='' && name != ''){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return decodeURIComponent(r[2]);
			return null;
		}//end if
		else return null;
	} //end func
	
	//获得字符串里指定键值的数值
	com.getString = function (str='',name='') {
		if(str!='' &&str.indexOf('?')!=-1  && name != '') {
			var search=str.split('?')[1];
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = search.match(reg);
			if(r != null) return r[2];
			return null;
		} //end if
		else return null;
	} //end func
	
	//获取路径
	com.getPath = function(path='') {
		if(path != '') return path.substr(0, path.lastIndexOf('/') + 1);
		else return false;
	} //edn func

	//载入图片函数
	com.imageLoad = function(src='', callback) {
		if(src!='') {
			var loader = new PxLoader();
			if($.type(src) === "string" && src != '') loader.addImage(src);
			else if($.type(src) === "array" && src.length > 0) {
				for(var i = 0; i < src.length; i++) loader.addImage(src[i]);
			} //end else
			loader.addCompletionListener(function() {
				loader = null;
				if(callback) callback(src);
			});
			loader.start();
		} //end if
	} //end func	

	//常用正则
	com.checkStr = function(str='', type=0) {
		if(str != '') {
			switch(type) {
				case 0:
					var reg = new RegExp(/^1[2-9]\d{9}$/); //手机号码验证
					break;
				case 1:
					var reg = new RegExp(/^\d{6}$/); //6位验证码验证
					break;	
				case 2:
					var reg = new RegExp(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/); //匹配EMAIL
					break;
				case 3:
					var reg = new RegExp(/^[1-9][0-9]\d{16}[0-9Xx]$/); //身份证验证
					break;
				case 4:
					var reg = new RegExp(/^\d+$/); //是否为0-9的数字
					break;
				case 5:
					var reg = new RegExp(/^[a-zA-Z\u0391-\uFFE5]*[\w\u0391-\uFFE5]*$/); //不能以数字或符号开头
					break;
				case 6:
					var reg = new RegExp(/^[0-9a-zA-Z_]+$/); //匹配由数字、26个英文字母或者下划线组成的字符串
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

	//解决ios下input、textarea无法自动失去焦点的问题
	com.keyboard = function(input=$('input,textarea,[contenteditable="true"]')) {
		var body=$('body');
		var before=0;
		var timer;
		if(input.length > 0) {
			if(os.ios) input.on('focus', input_focus).on('blur', input_blur);
			else body.height(body[0].clientHeight);
		} //end if
		function input_focus(e) {
			body.off('touchend', body_blur).one('touchend', body_blur);
			clearTimeout(timer);
			before=$(window).scrollTop();
		} //edn func
		function input_blur(e) {
			clearTimeout(timer);
			timer=setTimeout(function(){
				$(window).scrollTop(before);
			},200);
		} //edn func
		function body_blur(e) {
			var inputOther=false;
			input.each(function(i,n){
				if(e.target == n){
					inputOther=true;
					return false;
				}//edn if
			});
			if(!inputOther) input.blur();
		} //edn func
	} //end func
	
	com.iosResize=function(e){
		for(var i=0; i<6; i++) setTimeout(function(){
			$(window).scrollTop(0);
		},i*500);
	}//edn func
	
	//解决ios下select无法自动失去焦点的问题
	com.select = function(select=$('select')) {
		if(select.length > 0) {
			if(os.ios) {
				select.on('focus', function(e) {
					$(document).one('touchend', ios_select);
				});
			} //end if
		} //end if

		function ios_select(e) {
			if(e.target != select[0]) select.blur();
		} //edn func

	} //end func

	//获取textarea里的回车和空格
	com.textareaGet = function(textarea=$('textarea'), row=0) {
		if(textarea.length > 0){
			var str1 = textarea.val();
			if(str1 == '') return '';
			else {
				var str2 = str1.replaceAll("\n", "<br/>");
				return row_cut(str2, row);
			} //end else
		}//end if
	} //edn func

	//输入textarea里的回车和空格
	com.textareaSet = function(textarea=$('textarea'), str='') {
		if(textarea.length > 0){
			if(str == '') textarea.val('');
			else textarea.val(str.replaceAll("<br/>", "\n"));
		}//end if
	} //edn func

	//限制textarea输入文字的行数
	com.textareaLock = function(textarea=$('textarea')) {
		if(textarea.length > 0) {
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

	function row_cut(str='', row=1) {
		if(str!=''){
			var str2 = str.split('<br/>');
			if(str2.length <= row) return str;
			else {
				var str3 = '';
				for(var i = 0; i < row; i++) {
					str3 += str2[i];
					if(i < row - 1) str3 += '<br/>';
				} //edn for
				return str3;
			} //end else
		}else{
			return str;
		}//end else
	} //end func

	function col_break(str='', col=1) {
		if(str!=''){
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
		}else{
			return str;
		}//end else
	} //end func

	function col_cut(str='', col=1) {
		if(str.length > col) return str.substr(0, col);
		else return str;
	} //end func

	//限制textarea输入文字的行数
	com.textareaUnlock = function(textarea=$('textarea')) {
		if(textarea.length > 0) textarea.off();
	} //edn func
	
	//切割单行文字成几行
	com.textToMulti = function(str='',col=1,type='\n') {
		if(str!='' && col>1){
			if(str.indexOf(type) == -1 && str.length>col) {
				var str1='';
				var line=Math.ceil(str.length/col);
				for(var i = 0; i < line; i++) {
					if(i < line - 1) str1 += str.substr(i * col, col) + type;
					else str1 += str.substr(i * col);
				} //edn for
				return str1;
			} //end if
			else return str;
		}//edn if
		else return null;
	} //edn func
	
	//拼带参数的url链接
	com.url = function(url='', para='') {
		if(url!=''  && para!=''){
			var now = -1;
			for(var key in para) {
				now++;
				if(now == 0) url += '?';
				else url += '&';
				url += key + '=' + para[key]
			} //end for
			return url;
		}else{
			return url;
		}//end else
	}; //end func

	//以帧为单位的setTimeout
	com.setTimeout = function(callback, frame=0) {
		if(frame > 0 && callback) return setTimer(callback, frame, false);
	} //edn func

	com.clearTimeout = function(timer) {
		if(timer && timer.timer) clearTimer(timer);
	} //edn func
	
	//以帧为单位的setInterval
	com.setInterval = function(callback, frame=0) {
		if(frame > 0 && callback) return setTimer(callback, frame, true);
	} //edn func

	com.clearInterval = function(timer) {
		if(timer && timer.timer) clearTimer(timer);
	} //edn func

	function clearTimer(timer) {
		cancelAnimationFrame(timer.timer);
		timer=null;
	} //edn func

	function setTimer(callback, frame=0, interval=false) {
		var timer = {
			now: 0,
			timer: null
		};
		timer_handler();
		return timer;

		function timer_handler() {
			timer.now++;
			var timeup=timer.now == frame;
			if(timeup) {
				timer.now = 0;
				callback();
			} //end if
			if(interval || (!interval && !timeup)) timer.timer = requestAnimationFrame(timer_handler);
		} //end func

	} //edn func
	
	//将canvas转成存在cdn服务器上的远程图片地址
	com.canvas_send = function(canvas, callback, secretkey='test', type='jpg', compress=0.95) {
		if(canvas) {
			if(type == 'png') var base64 = canvas.toDataURL('image/png');
			else var base64 = canvas.toDataURL('image/jpeg', compress);
			this.base64_send(base64, callback, secretkey);
		} //edn if
	} //end func
	
	//将base64数据格式转成存在cdn服务器上的远程图片地址
	com.base64_send = function(base64='', callback, secretkey='test') {
		if(base64!='') {
			$.post('//tool.h5-x.com/cdn/base64', {
				data: base64,
				key: secretkey
			}, function(resp) {
				if(resp.errcode==0){
					if(callback) callback(resp.result);
				}//edn if
				else{
					console.log('errmsg:'+resp.errmsg);
				}//edn else
			},'json');
		} //edn if
	} //end func
	
	//将跨域的远程图片地址转成base64数据格式，解决图片跨域问题
	com.base64_get = function(link='', callback) {
		if(link!='') {
			$.post('//tool.h5-x.com/image/base64', {
				link: link
			}, function(resp) {
				if(callback) callback(resp);
			},'text');
		} //edn if
	} //end func
	
	//将字符串转成二维码，返回线上图片地址
	com.qrcode = function(txt='',options) {
		var defaults = {size:200,color:'000000',bg:'ffffff',border:0,error:0};
		var data = $.extend(defaults, options);
		if(txt!=''){
			var src='//tool.h5-x.com/image/qrcode?txt='+txt+'&size='+data.size+'&color='+data.color+'&bg='+data.bg+'&border='+data.border+'&error='+data.error+(data.logo?'&logo='+data.logo:'');
			return src;
		}//edn if
		else return null;
	} //end func
	
	//用qrcode.js将字符串转成二维码
	com.qrcodeJS = function(txt='',options) {
		var defaults = {size:200,color:'#000000',bg:'#ffffff'};
		var data = $.extend(defaults, options);
		if(txt!=''){
			var qr=new QRCode({
				text: txt,
				width: data.size,
				height: data.size,
				colorDark : data.color,
				colorLight : data.bg,
				correctLevel : QRCode.CorrectLevel.L
			});
			return qr.getCode();
		}//edn if
		else return null;
	} //end func
	
	//将字符串转成条形码，返回base64数据格式
	com.barcode = function(txt='',options) {
		var defaults = {width:400,height:200,color:'000000',bg:'ffffff',pure:true};
		var data = $.extend(defaults, options);
		if(txt!=''){
			var src='//tool.h5-x.com/image/barcode?txt='+txt+'&width='+data.width+'&height='+data.height+'&color='+data.color+'&bg='+data.bg+'&pure='+data.pure;
			return src;
		}//edn if
		else return null;
	} //end func
	
	//一键复制字符串到剪贴板
	com.clipboard=function(box,val,onComplete,onError){
		var support = !!document.queryCommandSupported;
		console.log('support:'+support);
		if(support){
			if(box.length>0 && val!=''){
				box.attr({'data-copy':val}).on('click',{callback:onComplete},copyText);
			}//edn if
		}//edn if
		else{
			console.log('浏览器不支持复制文本到剪贴板');
			if(onError) onError();
		}//end else
	}//edn func
	
	function copyText(e){
		var val=$(this).data('copy');
		var input=$('<textarea readonly="readonly"></textarea>').html(val).css({position:'absolute',left:0,top:0,width:1,height:1,visible:'hidden'}).appendTo('body');
		input[0].select();
		input[0].setSelectionRange(0, input[0].value.length);
		console.log('copy content:'+input.val())
		document.execCommand('Copy');
		input.remove();
		input=null;
		if(e.data.callback) e.data.callback();
	}//edn func
	
	//显示页面渲染fps
	com.fpsShow=function(space=30){
		var shell=$('<div id="fpsShow"></div>').appendTo(ibase.dir == 'landscape' ? 'article' : 'body');
		requestAnimationFrame(function(){
			fps_dected(new Date().getTime(),-1);
		});
		
		function fps_dected(last,count){
			var now=new Date().getTime();
			var fps=Math.round(1000/(now-last));
			fps=fps>60?60:fps;
			count++;
			if(count%space==0){
				if(fps>=40) var classname='fpsFast';
				else if(fps>=20) var classname='fpsNormal';
				else var classname='fpsSlow';
				shell.removeClass().addClass(classname).html('fps:'+fps);
			}//edn if
			requestAnimationFrame(function(){
				fps_dected(now,count);
			});
		}//edn func
		
	}//edn func
	
	//出血方案
	com.bleed=function(shell=$('.articleBleed'),maxSize=[936,1218]){
		var article=$('article');
		var isResized=false;
		if(shell.length>0){
			var article=$('article');
			shell_resize();
			$(window).on('resize',shell_resize);
		}//edn if
		function shell_resize(e){
			com.setTimeout(resize_handler,5);
		}//edn func
		function resize_handler(){
			if(window.innerWidth<window.innerHeight && !isResized){
				isResized=true;
				article.css({height:window.innerHeight});
				var windowScale = window.innerWidth / 750;
				var scale=window.innerHeight/windowScale/maxSize[1];
				ibase.bleedScale=scale;
				shell.css({
					transformOrigin:'50% 0',
					scale:scale
				});
			}//edn func
		}//edn func
	}//edn fun
	
	return com;

} //end import

String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}

/**
 * 扩展一个可以指定时间输出格式的 Date 的方法
 * 年(y)可以用 1-4 个占位符、月(M)、日(d)、季度(q)可以用 1-2 个占位符
 * 小时(h)、分(m)、秒(s)、毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @param  fmt  | 格式化表达式
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
