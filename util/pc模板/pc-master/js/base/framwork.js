//----------------------------------------jquery.transit.js v0.9.12
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],b):"object"==typeof exports?module.exports=b(require("jquery")):b(a.jQuery)}(this,function(a){function d(a){var c,d,e,f;if(a in b.style)return a;for(c=["Moz","Webkit","O","ms"],d=a.charAt(0).toUpperCase()+a.substr(1),e=0;e<c.length;++e)if(f=c[e]+d,f in b.style)return f}function e(){return b.style[c.transform]="",b.style[c.transform]="rotateY(90deg)",""!==b.style[c.transform]}function j(a){return"string"==typeof a&&this.parse(a),this}function k(a,b,c){b===!0?a.queue(c):b?a.queue(b,c):a.each(function(){c.call(this)})}function l(b){var d=[];return a.each(b,function(b){b=a.camelCase(b),b=a.transit.propertyMap[b]||a.cssProps[b]||b,b=o(b),c[b]&&(b=o(c[b])),-1===a.inArray(b,d)&&d.push(b)}),d}function m(b,c,d,e){var g,h,f=l(b);return a.cssEase[d]&&(d=a.cssEase[d]),g=""+q(c)+" "+d,parseInt(e,10)>0&&(g+=" "+q(e)),h=[],a.each(f,function(a,b){h.push(b+" "+g)}),h.join(", ")}function n(b,d){d||(a.cssNumber[b]=!0),a.transit.propertyMap[b]=c.transform,a.cssHooks[b]={get:function(c){var d=a(c).css("transit:transform");return d.get(b)},set:function(c,d){var e=a(c).css("transit:transform");e.setFromString(b,d),a(c).css({"transit:transform":e})}}}function o(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function p(a,b){return"string"!=typeof a||a.match(/^[\-0-9\.]+$/)?""+a+b:a}function q(b){var c=b;return"string"!=typeof c||c.match(/^[\-0-9\.]+/)||(c=a.fx.speeds[c]||a.fx.speeds._default),p(c,"ms")}var b,c,f,g,h,i;a.transit={version:"0.9.12",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:!0,useTransitionEnd:!1},b=document.createElement("div"),c={},f=navigator.userAgent.toLowerCase().indexOf("chrome")>-1,c.transition=d("transition"),c.transitionDelay=d("transitionDelay"),c.transform=d("transform"),c.transformOrigin=d("transformOrigin"),c.filter=d("Filter"),c.transform3d=e(),g={transition:"transitionend",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"},h=c.transitionEnd=g[c.transition]||null;for(i in c)c.hasOwnProperty(i)&&"undefined"==typeof a.support[i]&&(a.support[i]=c[i]);return b=null,a.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeInCubic:"cubic-bezier(.550,.055,.675,.190)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"},a.cssHooks["transit:transform"]={get:function(b){return a(b).data("transform")||new j},set:function(b,d){var e=d;e instanceof j||(e=new j(e)),b.style[c.transform]="WebkitTransform"!==c.transform||f?e.toString():e.toString(!0),a(b).data("transform",e)}},a.cssHooks.transform={set:a.cssHooks["transit:transform"].set},a.cssHooks.filter={get:function(a){return a.style[c.filter]},set:function(a,b){a.style[c.filter]=b}},a.fn.jquery<"1.8"&&(a.cssHooks.transformOrigin={get:function(a){return a.style[c.transformOrigin]},set:function(a,b){a.style[c.transformOrigin]=b}},a.cssHooks.transition={get:function(a){return a.style[c.transition]},set:function(a,b){a.style[c.transition]=b}}),n("scale"),n("scaleX"),n("scaleY"),n("translate"),n("rotate"),n("rotateX"),n("rotateY"),n("rotate3d"),n("perspective"),n("skewX"),n("skewY"),n("x",!0),n("y",!0),j.prototype={setFromString:function(a,b){var c="string"==typeof b?b.split(","):b.constructor===Array?b:[b];c.unshift(a),j.prototype.set.apply(this,c)},set:function(a){var b=Array.prototype.slice.apply(arguments,[1]);this.setter[a]?this.setter[a].apply(this,b):this[a]=b.join(",")},get:function(a){return this.getter[a]?this.getter[a].apply(this):this[a]||0},setter:{rotate:function(a){this.rotate=p(a,"deg")},rotateX:function(a){this.rotateX=p(a,"deg")},rotateY:function(a){this.rotateY=p(a,"deg")},scale:function(a,b){void 0===b&&(b=a),this.scale=a+","+b},skewX:function(a){this.skewX=p(a,"deg")},skewY:function(a){this.skewY=p(a,"deg")},perspective:function(a){this.perspective=p(a,"px")},x:function(a){this.set("translate",a,null)},y:function(a){this.set("translate",null,a)},translate:function(a,b){void 0===this._translateX&&(this._translateX=0),void 0===this._translateY&&(this._translateY=0),null!==a&&void 0!==a&&(this._translateX=p(a,"px")),null!==b&&void 0!==b&&(this._translateY=p(b,"px")),this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var a=(this.scale||"1,1").split(",");return a[0]&&(a[0]=parseFloat(a[0])),a[1]&&(a[1]=parseFloat(a[1])),a[0]===a[1]?a[0]:a},rotate3d:function(){var b,a=(this.rotate3d||"0,0,0,0deg").split(",");for(b=0;3>=b;++b)a[b]&&(a[b]=parseFloat(a[b]));return a[3]&&(a[3]=p(a[3],"deg")),a}},parse:function(a){var b=this;a.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(a,c,d){b.setFromString(c,d)})},toString:function(a){var d,b=[];for(d in this)if(this.hasOwnProperty(d)){if(!c.transform3d&&("rotateX"===d||"rotateY"===d||"perspective"===d||"transformOrigin"===d))continue;"_"!==d[0]&&(a&&"scale"===d?b.push(d+"3d("+this[d]+",1)"):a&&"translate"===d?b.push(d+"3d("+this[d]+",0)"):b.push(d+"("+this[d]+")"))}return b.join(" ")}},a.fn.transition=a.fn.transit=function(b,d,e,f){var n,o,p,r,s,t,u,g=this,i=0,j=!0,l=a.extend(!0,{},b);return"function"==typeof d&&(f=d,d=void 0),"object"==typeof d&&(e=d.easing,i=d.delay||0,j="undefined"==typeof d.queue?!0:d.queue,f=d.complete,d=d.duration),"function"==typeof e&&(f=e,e=void 0),"undefined"!=typeof l.easing&&(e=l.easing,delete l.easing),"undefined"!=typeof l.duration&&(d=l.duration,delete l.duration),"undefined"!=typeof l.complete&&(f=l.complete,delete l.complete),"undefined"!=typeof l.queue&&(j=l.queue,delete l.queue),"undefined"!=typeof l.delay&&(i=l.delay,delete l.delay),"undefined"==typeof d&&(d=a.fx.speeds._default),"undefined"==typeof e&&(e=a.cssEase._default),d=q(d),n=m(l,d,e,i),o=a.transit.enabled&&c.transition,p=o?parseInt(d,10)+parseInt(i,10):0,0===p?(r=function(a){g.css(l),f&&f.apply(g),a&&a()},k(g,j,r),g):(s={},t=function(b){var d=!1,e=function(){d&&g.unbind(h,e),p>0&&g.each(function(){this.style[c.transition]=s[this]||null}),"function"==typeof f&&f.apply(g),"function"==typeof b&&b()};p>0&&h&&a.transit.useTransitionEnd?(d=!0,g.bind(h,e)):window.setTimeout(e,p),g.each(function(){p>0&&(this.style[c.transition]=n),a(this).css(l)})},u=function(a){this.offsetWidth=this.offsetWidth,t(a)},k(g,j,u),this)},a.transit.getTransitionValue=m,a});

//----------------------------------------PxLoader.js v1.1.2
!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.PxLoader=b()}):"object"==typeof module&&module.exports?module.exports=b():a.PxLoader=b()}(this,function(){function a(a){a=a||{},this.settings=a,null==a.statusInterval&&(a.statusInterval=5e3),null==a.loggingDelay&&(a.loggingDelay=2e4),null==a.noProgressTimeout&&(a.noProgressTimeout=1/0);var c,d=[],e=[],f=[],g=Date.now(),h={QUEUED:0,WAITING:1,LOADED:2,ERROR:3,TIMEOUT:4},i=function(a){return null==a?[]:Array.isArray(a)?a:[a]};this.add=function(a){a.tags=new b(a.tags),null==a.priority&&(a.priority=1/0),d.push({resource:a,status:h.QUEUED})},this.addProgressListener=function(a,c){f.push({callback:a,tags:new b(c)})},this.addCompletionListener=function(a,c){e.push({tags:new b(c),callback:function(b){b.completedCount===b.totalCount&&a(b)}})};var j=function(a){a=i(a);var b=function(b){for(var c=b.resource,d=1/0,e=0;e<c.tags.length;e++)for(var f=0;f<Math.min(a.length,d)&&!(c.tags.all[e]===a[f]&&f<d&&(d=f,0===d))&&0!==d;f++);return d};return function(a,c){var d=b(a),e=b(c);return d<e?-1:d>e?1:a.priority<c.priority?-1:a.priority>c.priority?1:0}};this.start=function(a){c=Date.now();var b=j(a);d.sort(b);for(var e=0,f=d.length;e<f;e++){var g=d[e];g.status=h.WAITING,g.resource.start(this)}setTimeout(k,100)};var k=function(){for(var b=!1,c=Date.now()-g,e=c>=a.noProgressTimeout,f=c>=a.loggingDelay,i=0,j=d.length;i<j;i++){var l=d[i];l.status===h.WAITING&&(l.resource.checkStatus&&l.resource.checkStatus(),l.status===h.WAITING&&(e?l.resource.onTimeout():b=!0))}f&&b&&n(),b&&setTimeout(k,a.statusInterval)};this.isBusy=function(){for(var a=0,b=d.length;a<b;a++)if(d[a].status===h.QUEUED||d[a].status===h.WAITING)return!0;return!1};var l=function(a,b){var c,i,j,k,l,n=null;for(c=0,i=d.length;c<i;c++)if(d[c].resource===a){n=d[c];break}if(null!=n&&n.status===h.WAITING)for(n.status=b,g=Date.now(),j=f.concat(e),c=0,i=j.length;c<i;c++)k=j[c],l=0===k.tags.length||a.tags.intersects(k.tags),l&&m(n,k)};this.onLoad=function(a){l(a,h.LOADED)},this.onError=function(a){l(a,h.ERROR)},this.onTimeout=function(a){l(a,h.TIMEOUT)};var m=function(a,b){var c,e,f,g,i=0,j=0;for(c=0,e=d.length;c<e;c++)f=d[c],g=!1,g=0===b.tags.length||f.resource.tags.intersects(b.tags),g&&(j++,f.status!==h.LOADED&&f.status!==h.ERROR&&f.status!==h.TIMEOUT||i++);b.callback({resource:a.resource,loaded:a.status===h.LOADED,error:a.status===h.ERROR,timeout:a.status===h.TIMEOUT,completedCount:i,totalCount:j})},n=this.log=function(a){if(window.console){var b=Math.round((Date.now()-c)/1e3);window.console.log("PxLoader elapsed: "+b+" sec");for(var e=0,f=d.length;e<f;e++){var g=d[e];if(a||g.status===h.WAITING){var i="PxLoader: #"+e+" "+g.resource.getName();switch(g.status){case h.QUEUED:i+=" (Not Started)";break;case h.WAITING:i+=" (Waiting)";break;case h.LOADED:i+=" (Loaded)";break;case h.ERROR:i+=" (Error)";break;case h.TIMEOUT:i+=" (Timeout)"}g.resource.tags.length>0&&(i+=" Tags: ["+g.resource.tags.all.join(",")+"]"),window.console.log(i)}}}}}function b(a){if(this.all=[],this.first=null,this.length=0,this.lookup={},a){if(Array.isArray(a))this.all=a.slice(0);else if("object"==typeof a)for(var b in a)a.hasOwnProperty(b)&&this.all.push(b);else this.all.push(a);this.length=this.all.length,this.length>0&&(this.first=this.all[0]);for(var c=0;c<this.length;c++)this.lookup[this.all[c]]=!0}}return b.prototype.intersects=function(a){if(0===this.length||0===a.length)return!1;if(1===this.length&&1===a.length)return this.first===a.first;if(a.length<this.length)return a.intersects(this);for(var b in this.lookup)if(a.lookup[b])return!0;return!1},a}),function(a,b){"function"==typeof define&&define.amd?define(["pxloader"],function(c){return a.PxLoaderImage=b(c)}):"object"==typeof module&&module.exports?module.exports=b(require("pxloader")):a.PxLoaderImage=b(a.PxLoader)}(this,function(a){function b(a,b,c,d){d=d||{};var e,f=this,g=null;e=this.img=new Image,d.origin&&(e.crossOrigin=d.origin),this.tags=b,this.priority=c;var h=function(){"complete"===f.img.readyState&&i()},i=function(){g.onLoad(f),l()},j=function(){g.onError(f),l()},k=function(){g.onTimeout(f),l()},l=function(){f.off("load",i),f.off("readystatechange",h),f.off("error",j)};this.start=function(b){g=b,f.on("load",i),f.on("readystatechange",h),f.on("error",j),f.img.src=a},this.checkStatus=function(){h()},this.onTimeout=function(){f.img.complete?i():k()},this.getName=function(){return a},this.on=function(a,b){f.img.addEventListener(a,b,!1)},this.off=function(a,b){f.img.removeEventListener(a,b,!1)}}return a.prototype.addImage=function(a,c,d,e){var f=new b(a,c,d,e);return this.add(f),f.img},b}),function(a,b){"function"==typeof define&&define.amd?define(["pxloader"],function(c){return a.PxLoaderSound=b(c)}):"object"==typeof module&&module.exports?module.exports=b(require("pxloader")):a.PxLoaderSound=b(a.PxLoader)}(this,function(a){function b(a,b,c,d,e){var f=this,g=null,h=navigator.userAgent.match(/(ipad|iphone|ipod)/i),i=navigator.userAgent.match(/android/i);this.useGlobalHTML5Audio=h||i,this.tags=c,this.priority=d,this.sound=soundManager.createSound({id:a,url:b,autoLoad:!1,onload:function(){g.onLoad(f)},onsuspend:function(){g.onTimeout(f)},whileloading:function(){var a=this.bytesLoaded,b=this.bytesTotal;a>0&&a===b&&g.onLoad(f)}}),this.start=function(a){g=a,this.useGlobalHTML5Audio?g.onTimeout(f):this.sound.load()},this.checkStatus=function(){switch(f.sound.readyState){case 0:break;case 1:break;case 2:g.onError(f);break;case 3:g.onLoad(f)}},this.onTimeout=function(){g.onTimeout(f)},this.getName=function(){return b}}return a.prototype.addSound=function(a,c,d,e,f){var g=new b(a,c,d,e,f);return this.add(g),g.sound},b}),function(a,b){"function"==typeof define&&define.amd?define(["pxloader"],function(c){return a.PxLoaderVideo=b(c)}):"object"==typeof module&&module.exports?module.exports=b(require("pxloader")):a.PxLoaderVideo=b(a.PxLoader)}(this,function(a){function b(a,b,c,d){d=d||{};var e,f=this,g=null;this.readyEventName="canplaythrough",e=this.video=document.createElement("video"),d.origin&&(e.crossOrigin=d.origin),e.preload="auto",this.tags=b,this.priority=c;var h=function(){4===f.video.readyState&&i()},i=function(){g.onLoad(f),l()},j=function(){g.onError(f),l()},k=function(){g.onTimeout(f),l()},l=function(){f.off("load",i),f.unbind(f.readyEventName,h),f.unbind("error",j),f.video.src=""};this.start=function(b){g=b,f.bind("load",i),f.bind(f.readyEventName,h),f.bind("error",j),f.bind("suspend",i),f.video.src=a,f.video.load()},this.checkStatus=function(){h()},this.onTimeout=function(){4!==f.video.readyState?i():k()},this.getName=function(){return a},this.bind=function(a,b){f.video.addEventListener(a,b,!1)},this.unbind=function(a,b){f.video.removeEventListener(a,b,!1)}}return a.prototype.addVideo=function(a,c,d,e){var f=new b(a,c,d,e);return this.add(f),f.video},b}),function(a,b){"function"==typeof define&&define.amd?define(["pxloader"],function(c){return a.PxLoaderData=b(c)}):"object"==typeof module&&module.exports?module.exports=b(require("pxloader")):a.PxLoaderData=b(a.PxLoader)}(this,function(a){function b(a,b,c,d){d=d||{};var e=this,f=null;this.tags=b,this.priority=c,this.xhr=new XMLHttpRequest;var g=function(){4===e.xhr.readyState&&(200===e.xhr.status?h():i())},h=function(){f.onLoad(e),k()},i=function(){f.onError(e),k()},j=function(){f.onTimeout(e),k()},k=function(){e.unbind("readystatechange",g),e.unbind("error",i)};this.start=function(b){f=b,e.bind("readystatechange",g),e.bind("error",i),e.xhr.open("GET",a,!0),e.xhr.send(null),e.xhr.responseType=d.responseType?d.responseType:""},this.checkStatus=function(){g()},this.onTimeout=function(){4===e.xhr.readyState?200===e.xhr.status?h():i():j()},this.getName=function(){return a},this.bind=function(a,b){e.xhr.addEventListener(a,b,!1)},this.unbind=function(a,b){e.xhr.removeEventListener(a,b,!1)}}return a.prototype.addData=function(a,c,d,e){var f=new b(a,c,d,e);return this.add(f),f.xhr},b}),function(a,b){"function"==typeof define&&define.amd?define(["pxloader"],function(c){return a.PxLoaderAudio=b(c)}):"object"==typeof module&&module.exports?module.exports=b(require("pxloader")):a.PxLoaderAudio=b(a.PxLoader)}(this,function(a){function b(a,b,c,d){d=d||{};var e,f=this,g=null;this.readyEventName="canplaythrough",e=this.audio=document.createElement("audio"),d.origin&&(e.crossOrigin=d.origin),e.preload="auto",this.tags=b,this.priority=c;var h=function(){4===f.audio.readyState&&i()},i=function(){g.onLoad(f),l()},j=function(){g.onError(f),l()},k=function(){g.onTimeout(f),l()},l=function(){f.unbind("load",i),f.unbind(f.readyEventName,h),f.unbind("error",j),f.audio.src=""};this.start=function(b){g=b,f.bind("load",i),f.bind(f.readyEventName,h),f.bind("error",j),f.bind("suspend",i),f.audio.src=a,f.audio.load()},this.checkStatus=function(){h()},this.onTimeout=function(){4!==f.audio.readyState?i():k()},this.getName=function(){return a},this.bind=function(a,b){f.audio.addEventListener(a,b,!1)},this.unbind=function(a,b){f.audio.removeEventListener(a,b,!1)}}return a.prototype.addAudio=function(a,c,d,e){var f=new b(a,c,d,e);return this.add(f),f.audio},b});

//-----------------------------------mouse_event.js
!function(){$.event.special.mouse_event={setup:function(){function e(e){$(this).trigger("mouse_event").trigger("mouse_down","touchstart"==e.originalEvent.type?{x:e.originalEvent.touches[0].clientX,y:e.originalEvent.touches[0].clientY}:{x:e.originalEvent.clientX,y:e.originalEvent.clientY})}function n(e){$(this).trigger("mouse_event").trigger("mouse_move","touchmove"==e.originalEvent.type?{x:e.originalEvent.changedTouches[0].clientX,y:e.originalEvent.changedTouches[0].clientY}:{x:e.originalEvent.clientX,y:e.originalEvent.clientY})}function t(e){$(this).trigger("mouse_event").trigger("mouse_up","touchend"==e.originalEvent.type?{x:e.originalEvent.changedTouches[0].clientX,y:e.originalEvent.changedTouches[0].clientY}:{x:e.originalEvent.clientX,y:e.originalEvent.clientY})}var o=($(this),window.DocumentTouch&&document instanceof window.DocumentTouch||"ontouchstart"in window);$(this).on(o?"touchstart":"mousedown",e).on(o?"touchmove":"mousemove",n).on(o?"touchend":"mouseup",t)}},$.each({mouse_down:"mouse_event",mouse_move:"mouse_event",mouse_up:"mouse_event"},function(e,n){$.event.special[e]={setup:function(){$(this).on(n,$.noop)}}})}();

//-----------------------------------jquery.mousewheel.js
/* Version: 3.1.3*/
(function(factory){if(typeof define==="function"&&define.amd){define(["jquery"],factory)}else{if(typeof exports==="object"){module.exports=factory}else{factory(jQuery)}}}(function($){var toFix=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"];var toBind="onwheel" in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"];var lowestDelta,lowestDeltaXY;if($.event.fixHooks){for(var i=toFix.length;i;){$.event.fixHooks[toFix[--i]]=$.event.mouseHooks}}$.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var i=toBind.length;i;){this.addEventListener(toBind[--i],handler,false)}}else{this.onmousewheel=handler}},teardown:function(){if(this.removeEventListener){for(var i=toBind.length;i;){this.removeEventListener(toBind[--i],handler,false)}}else{this.onmousewheel=null}}};$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel")},unmousewheel:function(fn){return this.unbind("mousewheel",fn)}});function handler(event){var orgEvent=event||window.event,args=[].slice.call(arguments,1),delta=0,deltaX=0,deltaY=0,absDelta=0,absDeltaXY=0,fn;event=$.event.fix(orgEvent);event.type="mousewheel";if(orgEvent.wheelDelta){delta=orgEvent.wheelDelta}if(orgEvent.detail){delta=orgEvent.detail*-1}if(orgEvent.deltaY){deltaY=orgEvent.deltaY*-1;delta=deltaY}if(orgEvent.deltaX){deltaX=orgEvent.deltaX;delta=deltaX*-1}if(orgEvent.wheelDeltaY!==undefined){deltaY=orgEvent.wheelDeltaY}if(orgEvent.wheelDeltaX!==undefined){deltaX=orgEvent.wheelDeltaX*-1}absDelta=Math.abs(delta);if(!lowestDelta||absDelta<lowestDelta){lowestDelta=absDelta}absDeltaXY=Math.max(Math.abs(deltaY),Math.abs(deltaX));if(!lowestDeltaXY||absDeltaXY<lowestDeltaXY){lowestDeltaXY=absDeltaXY}fn=delta>0?"floor":"ceil";delta=Math[fn](delta/lowestDelta);deltaX=Math[fn](deltaX/lowestDeltaXY);deltaY=Math[fn](deltaY/lowestDeltaXY);args.unshift(event,delta,deltaX,deltaY);return($.event.dispatch||$.event.handle).apply(this,args)}}));

//-----------------------------------jquery.swipe.js
(function(){var supportTouch=((window.DocumentTouch&&document instanceof window.DocumentTouch)||"ontouchstart" in window),scrollEvent="touchmove scroll",touchStartEvent=supportTouch?"touchstart":"mousedown",touchStopEvent=supportTouch?"touchend":"mouseup",touchMoveEvent=supportTouch?"touchmove":"mousemove";$.event.special.swipe={setup:function(){var thisObject=this;var $this=$(thisObject);$this.bind(touchStartEvent,function(event){var data=event.originalEvent.touches?event.originalEvent.touches[0]:event,start={time:(new Date).getTime(),coords:[data.pageX,data.pageY],origin:$(event.target)},stop;function moveHandler(event){if(!start){return}var data=event.originalEvent.touches?event.originalEvent.touches[0]:event;stop={time:(new Date).getTime(),coords:[data.pageX,data.pageY]};if(Math.abs(start.coords[1]-stop.coords[1])>10){event.preventDefault()}}$this.bind(touchMoveEvent,moveHandler).one(touchStopEvent,function(event){$this.unbind(touchMoveEvent,moveHandler);if(start&&stop){if(stop.time-start.time<1000){if(Math.abs(start.coords[1]-stop.coords[1])>30&&Math.abs(start.coords[0]-stop.coords[0])<75){start.origin.trigger("swipe").trigger(start.coords[1]>stop.coords[1]?"swipeup":"swipedown")}else{if(Math.abs(start.coords[0]-stop.coords[0])>30&&Math.abs(start.coords[1]-stop.coords[1])<75){start.origin.trigger("swipe").trigger(start.coords[0]>stop.coords[0]?"swipeleft":"swiperight")}}}}start=stop=undefined})})}};$.each({swipeleft:"swipe",swiperight:"swipe",swipedown:"swipe",swipeup:"swipe"},function(event,sourceEvent){$.event.special[event]={setup:function(){$(this).bind(sourceEvent,$.noop)}}})})();

//-----------------------------------jquery.orientation.js
(function(e,t,n){typeof define=="function"&&define.amd?define(["jquery"],function(r){return n(r,e,t),r.mobile}):n(e.jQuery,e,t)})(this,document,function(e,t,n,r){(function(e,n){e.extend(e.support,{orientation:"orientation"in t&&"onorientationchange"in t})})(e),function(e){e.event.special.throttledresize={setup:function(){e(this).bind("resize",n)},teardown:function(){e(this).unbind("resize",n)}};var t=250,n=function(){s=(new Date).getTime(),o=s-r,o>=t?(r=s,e(this).trigger("throttledresize")):(i&&clearTimeout(i),i=setTimeout(n,t-o))},r=0,i,s,o}(e),function(e,t){function p(){var e=s();e!==o&&(o=e,r.trigger(i))}var r=e(t),i="orientationchange",s,o,u,a,f={0:!0,180:!0},l,c,h;if(e.support.orientation){l=t.innerWidth||r.width(),c=t.innerHeight||r.height(),h=50,u=l>c&&l-c>h,a=f[t.orientation];if(u&&a||!u&&!a)f={"-90":!0,90:!0}}e.event.special.orientationchange=e.extend({},e.event.special.orientationchange,{setup:function(){if(e.support.orientation&&!e.event.special.orientationchange.disabled)return!1;o=s(),r.bind("throttledresize",p)},teardown:function(){if(e.support.orientation&&!e.event.special.orientationchange.disabled)return!1;r.unbind("throttledresize",p)},add:function(e){var t=e.handler;e.handler=function(e){return e.orientation=s(),t.apply(this,arguments)}}}),e.event.special.orientationchange.orientation=s=function(){var r=!0,i=n.documentElement;return e.support.orientation?r=f[t.orientation]:r=i&&i.clientWidth/i.clientHeight<1.1,r?"portrait":"landscape"},e.fn[i]=function(e){return e?this.bind(i,e):this.trigger(i)},e.attrFn&&(e.attrFn[i]=!0)}(e,this)});

//-----------------------------------jquery.special.load.for.ie8.js
$.event.special.load={add:function(hollaback){if(this.nodeType===1&&this.tagName.toLowerCase()==="img"&&this.src!==""){if(this.complete||this.readyState===4){hollaback.handler.apply(this)}else{if(this.readyState==="uninitialized"&&this.src.indexOf("data:")===0){$(this).trigger("error")}}}}};

//----------------------------------------com.js
"use strict";function importCom(){function e(e,t,n,o){t&&$.isPlainObject(t)&&(t=JSON.stringify(t)),$.post("./http/httpPost.php",{api_url:e,post_data:t,action:o},function(e){n&&n(e)},"json")}function t(e,t){t=t||0;var n=e.split("<br/>");if(t<=0||n.length<=t)return e;for(var o="",r=0;r<t;r++)o+=n[r],r<t-1&&(o+="<br/>");return o}function n(e,t){var n=Math.ceil(e.length/t);if(1==n)return e;for(var o="",r=0;r<n;r++)o+=0==r?e.substr(0,t)+"<br/>":r<n-1?e.substr(r*t,t)+"<br/>":e.substr(r*t);return o}function o(e){cancelAnimationFrame(e.timer),e.now=0,e.start=(new Date).getTime(),e.timer=null}function r(e,t,n,o){function r(){n?a.now++:a.now=(new Date).getTime()-a.start;var c=n?a.now==t:a.now>=t;c&&(a.now=0,a.start=(new Date).getTime(),e()),(o||!o&&!c)&&(a.timer=requestAnimationFrame(r))}var a={now:0,start:(new Date).getTime(),timer:null};return r(),a}function a(e){var t=$(this).data("copy"),n=$('<textarea readonly="readonly"></textarea>').html(t).css({position:"absolute",left:0,top:0,width:1,height:1,visible:"hidden"}).appendTo("body");n[0].select(),n[0].setSelectionRange(0,n[0].value.length),c.console("copy content:"+n.val()),document.execCommand("Copy"),n.remove(),n=null,e.data.callback&&e.data.callback()}var c={};return c.console=function(e,t){if(t=t||"log",window.console)switch(t){case"log":window.console.log(e);break;case"info":window.console.info(e);break;case"warn":window.console.warn(e);break;case"error":window.console.error(e);break;default:window.console.log(e)}},c.alert=function(e,t){var n=$('<div class="alertBox"><div><p class="text"></p><p class="btn"><a class="close">CONFIRM</a></p></div></div>').appendTo($("body"));n.find(".text").html(e),n.show(),n.find("a.close").click(function(e){n.remove(),t&&t()})},c.fadeIn=function(e,t,n){e&&(t=t||500,e.show().css({opacity:0}).transition({opacity:1},t,function(){n&&n($(this))}))},c.fadeOut=function(e,t,n){e&&(t=t||500,e.transition({opacity:0},t,function(){$(this).hide().css({opacity:1}),n&&n($(this))}))},c.mouseSelectOff=function(){document.onselectstart=function(){return!1},document.unselectable="on",$("body").css({"-moz-user-select":"none","-webkit-user-select":"none","-ms-user-select":"none","user-select":"none"})},c.mouseSelectOn=function(){document.onselectstart=function(){return!0},document.unselectable="off",$("body").css({"-moz-user-select":"auto","-webkit-user-select":"auto","-ms-user-select":"auto","user-select":"auto"})},c.popOn=function(e,t){function n(t){r.closeBtn.length>0&&"button"==r.closeType?r.closeBtn.off("click",n):e.off("click",n),r.fade?e.fadeOut(r.fade,function(){r.remove&&e.remove()}):r.remove?e.remove():e.hide(),e.off("close",n),r.onClose&&r.onClose(e)}if(e&&e.length>0){var o={closeType:"button",closeBtn:e.find("a.close"),remove:!1,fade:0},r=$.extend(o,t);r.text&&e.find(".text").html(r.text),r.fade>0?e.fadeIn(r.fade):e.show(),r.closeBtn.length>0&&"button"==r.closeType?r.closeBtn.one("click",n):e.one("click",n),e.on("close",n)}},c.popOff=function(e){e&&e.length>0&&e.trigger("close")},c.getQueryString=function(e){if(e&&""!=e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(t);return null!=n?decodeURIComponent(n[2]):null}return null},c.getQueryInt=function(e){e=null!=e?e:1;var t=window.location.pathname.split("/"),n=t[t.length-1],o=n.split(".");return parseInt(o[0].substr(o[0].length-e))},c.imageLoad=function(e,t){if(e&&""!=e){var n=new PxLoader;if("string"===$.type(e)&&""!=e)n.addImage(e);else if("array"===$.type(e)&&e.length>0)for(var o=0;o<e.length;o++)n.addImage(e[o]);n.addCompletionListener(function(){c.console("images load complete"),n=null,t&&t(e)}),n.start()}},c.objectPrint=function(e){if(e){c.console("-----------------------------------------------------------------------------");var t="";for(var n in e)t+=n+":"+e[n]+"  ";c.console(t),c.console("-----------------------------------------------------------------------------")}},c.checkStr=function(e,t){if(e&&""!=e){switch(t=t||0){case 0:var n=new RegExp(/^1[3-9]\d{9}$/);break;case 1:var n=new RegExp(/^\d{6}$/);break;case 2:var n=new RegExp(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/);break;case 3:var n=new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/);break;case 4:var n=new RegExp(/^\d+$/);break;case 5:var n=new RegExp(/^[a-zA-Z\u0391-\uFFE5]*[\w\u0391-\uFFE5]*$/);break;case 6:var n=new RegExp(/^[0-9a-zA-Z_]+$/);break;case 7:var n=new RegExp(/^[\u0391-\uFFE5]+$/);break;case 8:var n=new RegExp(/^[a-zA-Z\u0391-\uFFE5]+$/)}return!!n.exec($.trim(e))}return!1},c.post=function(t,n,o){t&&""!=t&&e(t,n,o,"post")},c.get=function(t,n,o){t&&""!=t&&e(t,n,o,"get")},c.shake=function(e,t){if(e&&e.length>0){var n={rx:5,ry:5,delay:33,now:0,max:5,restore:!0},o=$.extend(n,t),r=imath.randomRange(-o.rx,o.rx),a=imath.randomRange(-o.ry,o.ry);e.css({x:r,y:a}),o.now++,o.now>o.max?(o.restore&&e.css({x:0,y:0}),o.onComplete&&o.onComplete()):setTimeout(c.shake,o.delay,e,o)}},c.textareaGet=function(e,n){n=n||0;var o=e.val();return""==o?"":t(o.replaceAll("\n","<br/>"),n)},c.textareaSet=function(e,t){""==t?e.val(""):e.val(t.replaceAll("<br/>","\n"))},c.textareaLock=function(e){function o(e){i=requestAnimationFrame(a)}function r(o){cancelAnimationFrame(i);var r=c.textareaGet(e,l);if(-1!=r.indexOf("<br/>")){for(var a=r.split("<br/>"),u="",f=0;f<a.length;f++)u+=n(a[f],s),f<a.length-1&&(u+="<br/>");u=t(u,l);var d=u.replaceAll("<br/>","\n");e.val(d)}}function a(){var t=c.textareaGet(e,l);-1==t.indexOf("<br/>")?e.attr({maxlength:u}):e.attr({maxlength:u+2*(t.split("<br/>").length-1)})}if(e&&e.length>0){var i,l=parseInt(e.attr("rows"))||0,s=parseInt(e.attr("cols"))||0,u=parseInt(e.attr("maxlength"))||0;u=0==u?l*s:u,l>0&&s>0&&u>0&&e.on("focus",o).on("blur",r)}},c.textareaUnlock=function(e){e.off()},c.textToMulti=function(e,t){if(""!=e&&t>1){if(-1==e.indexOf("\n")&&e.length>t){for(var n="",o=Math.ceil(e.length/t),r=0;r<o;r++)n+=r<o-1?e.substr(r*t,t)+"\n":e.substr(r*t);return n}return e}return null},c.url=function(e,t){var n=-1;for(var o in t)n++,e+=0==n?"?":"&",e+=o+"="+t[o];return e},c.setTimeout=function(e,t,n){if(n=n||0,t>0&&e)return r(e,t,n,!1)},c.clearTimeout=function(e){e&&e.timer&&o(e)},c.setInterval=function(e,t,n){if(n=n||0,t>0&&e)return r(e,t,n,!0)},c.clearInterval=function(e){e&&e.timer&&o(e)},c.canvas_send=function(e,t,n,o,r){if(e){if(n=n||"test",o=o||"jpg",r=r||.8,"png"==o)var a=e.toDataURL("image/png");else var a=e.toDataURL("image/jpeg",r);this.base64_send(a,t,n)}},c.base64_send=function(e,t,n){e&&(n=n||"test",$.post("http://tool.be-xx.com/cdn/base64",{data:e,key:n},function(e){0==e.errcode?t&&t(e.result):c.console("errmsg:"+e.errmsg)},"json"))},c.base64_get=function(e,t,n){e&&(n=n||"test",$.post("http://tool.be-xx.com/image/base64",{link:e,key:n},function(e){t&&t(e)},"text"))},c.qrcode=function(e,t){var n={size:200,color:"#000000",bg:"#ffffff",border:0,error:0,logo:!1},o=$.extend(n,t);if(e&&""!=e){return"http://tool.be-xx.com/image/qrcode?txt="+e+"&size="+o.size+"&color="+o.color+"&bg="+o.bg+"&border="+o.border+"&error="+o.error+"&logo="+o.logo}return null},c.barcode=function(e,t){var n={width:400,height:200,color:"#000000",bg:"#ffffff",pure:!0},o=$.extend(n,t);if(e&&""!=e){return"http://tool.be-xx.com/image/barcode?txt="+e+"&width="+o.width+"&height="+o.height+"&color="+o.color+"&bg="+o.bg+"&pure="+o.pure}return null},c.clipboard=function(e,t,n,o){var r=!!document.queryCommandSupported;c.console("support:"+r),r?e.length>0&&""!=t&&e.attr({"data-copy":t}).on("click",{callback:n},a):(c.console("浏览器不支持复制文本到剪贴板"),o&&o())},c}var icom=importCom();String.prototype.replaceAll=function(e,t){return this.replace(new RegExp(e,"gm"),t)};

//----------------------------------------math.js
function importMath(){var a={};return a.randomRange=function(a,b){var c;return c=Math.floor(Math.random()*(b-a+1))+a},a.randomColor=function(){var a="0123456789abcdef",b="#";for(j=0;6>j;j++)b+=a.charAt(Math.random()*a.length);return b},a.randomSort=function(a){a&&a.length>1&&a.sort(function(){return.5-Math.random()})},a.randomPlus=function(){return Math.random()<.5?-1:1},a.autoSize=function(a,b,c){var d,e;return c=1===c||0===c?1===c?"cover":"contain":c||"cover",d=[],e=a[0]/a[1],d[0]=b[0],d[1]=Math.round(d[0]/e),"height"==c?(d[1]=b[1],d[0]=Math.round(d[1]*e)):"contain"==c?d[1]>b[1]&&(d[1]=b[1],d[0]=Math.round(d[1]*e)):"cover"==c?d[1]<b[1]&&(d[1]=b[1],d[0]=Math.round(d[1]*e)):"full"==c&&(d=[b[0],b[1]]),d},a.ease=function(a,b,c,d){c=c||10,d=d||.1;var e=b-a;return Math.abs(e)>d?e/c+a:b},a.toRadian=function(a){return a*Math.PI/180},a.toDegree=function(a){return 180*(a/Math.PI)},a.getDis=function(a,b){var c=b[0]-a[0],d=b[1]-a[1];return Math.sqrt(Math.pow(Math.abs(c),2)+Math.pow(Math.abs(d),2))},a.getDeg=function(a,b){var c,d,e;return a[0]==b[0]&&a[1]==b[1]?c=0:(d=b[1]-a[1],e=b[0]-a[0],c=180*Math.atan(d/e)/Math.PI,0>e?c=180+c:e>=0&&0>d&&(c=360+c)),c},a.hitTest=function(a,b,c,d){var e,f,g,h,i,j;return c=null!=c?c:1,d=null!=d?d:1,a&&b?(e=[a.offset().left+.5*a.outerWidth()*c,a.offset().top+.5*a.outerHeight()*d],f=[b.offset().left+.5*b.outerWidth()*c,b.offset().top+.5*b.outerHeight()*d],g=Math.abs(f[0]-e[0]),h=Math.abs(f[1]-e[1]),i=.5*(a.outerWidth()+b.outerWidth())*c,j=.5*(a.outerHeight()+b.outerHeight())*d,i>=g&&j>=h?!0:void 0):!1},a.hitObject=function(a,b){var c,d,e,f,g,h;return a&&b?(c=[a.data().x+.5*a.outerWidth(),a.data().y+.5*a.outerHeight()],d=[b.data().x+.5*b.outerWidth(),b.data().y+.5*b.outerHeight()],e=Math.abs(d[0]-c[0]),f=Math.abs(d[1]-c[1]),g=.5*(a.outerWidth()+b.outerWidth()),h=.5*(a.outerHeight()+b.outerHeight()),g>=e&&h>=f?!0:void 0):!1},a.hitPoint=function(a,b,c,d){if(c=null!=c?c:1,d=null!=d?d:1,a&&b){var e=[b.offset().left,b.offset().left+b.outerWidth()*c,b.offset().top,b.offset().top+b.outerHeight()*d];return a[0]>=e[0]&&a[0]<=e[1]&&a[1]>=e[2]&&a[1]<=e[3]?!0:!1}return!1},a.arrayToInt=function(a){var c,b=0;for(c=0;c<a.length;c++)b+=a[c]*Math.pow(10,a.length-1-c);return b},a.deepClone=function(a){function b(a){var e,d="array"==c(a)?[]:{};for(e in a)d[e]="object"!=c(a[e])&&"array"!=c(a[e])?a[e]:b(a[e]);return d}function c(a){return"object"==typeof a?Array==a.constructor?"array":"object":null}return b(a)},a.objectLength=function(a){return Object.keys(a).length},a.formatNumber=function(a){return a=a.toString(),a.length<=3?a:this.formatNumber(a.substr(0,a.length-3))+","+a.substr(a.length-3)},a.float=function(a,b){var c,d;return b=b||2,a=a.toString(),-1==a.indexOf(".")?a:(c=a.split("."),d=c[0]+"."+c[1].substr(0,b),Number(d))},a.colorToRgb=function(a){if(a.match(/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i)){var b=a.slice(a.indexOf("#")+1),c=3===b.length,d=c?b.charAt(0)+b.charAt(0):b.substring(0,2),e=c?b.charAt(1)+b.charAt(1):b.substring(2,4),f=c?b.charAt(2)+b.charAt(2):b.substring(4,6);return[parseInt(d,16),parseInt(e,16),parseInt(f,16)]}return"rgba(0,0,0,255)"},a}var imath=importMath();Array.prototype.contains=function(a){for(var b=this.length;b--;)if(this[b]===a)return!0;return!1},Array.prototype.remove=function(a){var b=this.indexOf(a);-1!=b&&this.splice(b,1)},Array.prototype.append=function(a){for(var b=0,c=a.length;c>b;b++)this.push(a[b]);return this};

//-----------------------------------写入loadBox
document.write('<div id="loadBox"><span></span></div>');