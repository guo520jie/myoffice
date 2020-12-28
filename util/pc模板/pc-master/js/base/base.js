//平台检测，判断浏览器、操作系统环境
var os=detectOS();
function detectOS() {
	var	userAgent=navigator.userAgent;
	var os = {};
	os.userAgent=userAgent;
	os.android = userAgent.match(/(Android)\s+([\d.]+)/) || userAgent.match(/Silk-Accelerated/) ? true : false;
	os.ipad = userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false;
	os.iphone = !os.ipad && userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false;
	os.ios = os.ipad || os.iphone;
	os.wp=userAgent.match(/Windows Phone/) || userAgent.match(/IEMobile/) ? true : false;
	os.safari = os.ios && userAgent.match(/Safari/) ? true : false;
	os.chrome = userAgent.match(/Chrome/) ? true : false;
	os.firefox = userAgent.match(/Firefox/) ? true : false;
	os.ie = document.documentMode;
	os.edge = userAgent.match(/Edge/) ? true : false;
	os.pc = !(os.android || os.ios || os.wp);
	os.html5 = (window.addEventListener && !document.all) || (window.addEventListener && document.documentMode >=9);
	os.html5Mode = (window.addEventListener && !document.all) || (window.addEventListener && document.documentMode >=10);
	os.webkit=userAgent.match(/applewebkit/i) && !os.edge ? true : false;
	os.supportsTouch = ((window.DocumentTouch && document instanceof window.DocumentTouch) || 'ontouchstart' in window);
	return os;
}//end func
if(window.console) window.console.log('html5:'+os.html5);
if(window.console) window.console.log('html5Mode:'+os.html5Mode);
if(window.console) window.console.log('webkit:'+os.webkit);
if(window.console) window.console.log('supportTouch:'+os.supportTouch);

//-----------------------------------base
var ibase = importBase();
function importBase() {
	var base = {}

	base.load = function(f, shell, callback, nocache) {
		nocache = nocache != null ? nocache : true;
		var file = get_filetype(f, nocache);
		if(file.type == "css")  this.loadCss(file.src, shell, callback);
		else if(file.type == "js") this.loadJs(file.src, shell, callback);
	} //end func
	
	base.loadCss=function(src,shell,callback){
		shell = shell || 'head';
		var fileref = document.createElement('link');
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", src);
		document.querySelector(shell).appendChild(fileref);
		if(callback) loadCalback(fileref,callback);
	}//edn func
	
	base.loadJs=function(src,shell,callback){
		shell = shell || 'body';
		var fileref = document.createElement('script');
		fileref.setAttribute("type", "text/javascript");
		fileref.setAttribute("src", src);
		document.querySelector(shell).appendChild(fileref);
		if(callback) loadCalback(fileref,callback);
	}//edn func
	
	function loadCalback(fileref,callback){
		if (fileref.readyState) {
	      	fileref.onreadystatechange = function () {
		        if (fileref.readyState == "loaded" || fileref.readyState == "complete") {
		        	fileref.onreadystatechange = null;
		        	callback();
		        }//edn if
	      	};
	    }//edn if
	    else fileref.onload = callback;
	}//edn func

	base.creatNode = function(nodeName, idName, className, innerHTML, wrapNode) {
		nodeName = nodeName || 'div';
		className = className || '';
		idName = idName || '';
		innerHTML = innerHTML || '';
		wrapNode = wrapNode || document.querySelector('body');
		var newNode = document.createElement(nodeName);
		if(className != '') newNode.className = className;
		if(idName != '') newNode.id = idName;
		if(innerHTML != '') newNode.innerHTML = innerHTML;
		wrapNode.appendChild(newNode);
	} //end func

	base.getUrl = function(url) {
		var hmsr = icom.getQueryString('hmsr');
		hmsr = hmsr || '';
		var utm_source = icom.getQueryString('utm_source');
		utm_source = utm_source || '';
		if(url && url != '') {
			url += (hmsr != '' ? (url.indexOf('?') == -1 ? '?' : '&') + 'hmsr=' + hmsr : '') + (utm_source != '' ? '&utm_source=' + utm_source : '');
			location.href = url;
		} //end if
	} //edn func

	function get_filetype(f, nocache) {
		nocache = nocache != null ? nocache : true;
		var tmp = f.split('.');
		var type = tmp[tmp.length - 1];
		var src = f + (nocache ? '?v=' + Math.random() : '');
		return {
			type: type,
			src: src
		};
	} //end func

	return base;
} //end func