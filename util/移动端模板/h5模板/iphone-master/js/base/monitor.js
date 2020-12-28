//2020.4.2

//百度监测贴这里
//var _hmt = _hmt || [];
//(function() {
//var hm = document.createElement("script");
//hm.src = "https://hm.baidu.com/hm.js?42b71e30fab1dd283c8d6f451a4c011b";
//var s = document.getElementsByTagName("script")[0]; 
//s.parentNode.insertBefore(hm, s);
//})();

//ga监测贴这里
//(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
//ga('create', 'UA-55069627-11', 'auto');
//ga('send', 'pageview');

var imonitor = importMonitor();

function importMonitor() {
	var monitor = {};

	monitor.add = function(options) {
		if(options) {
			var defaults = {
				action: 'touchend',
				category: 'default',
				label: '',
				page:null
			};
			var opts = $.extend(defaults, options);
			if(opts.obj && opts.obj.length > 0) {
				opts.obj.each(function(i,n) {
					$(n).on(opts.action, {page:opts.page,action:opts.action,category:opts.category,label:opts.label+(i+1)}, event_bind);
				});
			} //end if
			else {
				opts.action = 'script'
				event_bind(null, opts);
			} //end else
		} //end if
	} //end func

	function event_bind(e, data) {
		if(e) event_handler(e.data);
		else event_handler(data);
	} //end func

	function event_handler(data) {
		if(data.page && data.page!=''){
			if(window._hmt) window._hmt.push(['_trackPageview', '/'+data.page]);
			if(window.ga) window.ga('send', 'pageview', '/'+data.page);
			console.log('虚拟PV：' + data.page);
		}else if(data.label && data.label!=''){
			if(window._hmt) window._hmt.push(['_trackEvent', data.category, data.action, data.label]);
			if(window.ga) window.ga('send', 'event', data.category, data.action, data.label);
			console.log('事件名称：' + data.label);
		}//end else
	} //end func

	return monitor;
} //end import