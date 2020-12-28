//2013.10.9
(function($) {
	$.fn.extend({
		share: function(option) {
			var _this=$(this);
			var imgHtml=["",""];
			var _url,_txt,_img;
			if(option){
				_url=option.url||window.location.href;
				_txt=option.text||"";
				_img=option.image;
				_txt=encodeURIComponent(_txt);
				_url=encodeURIComponent(_url);
				init();
			}//end if
			function init(){	
				if(_img)imgHtml=["&pic=" + _img,"&pics=" + _img,"&togImg=true&images=" + _img];
				_this.children("a.s_sina").attr({"href":'http://service.weibo.com/share/share.php?url=' + _url + '&title=' + _txt  + imgHtml[0]});
				_this.children("a.s_qq_t").attr({"href":'http://share.v.t.qq.com/index.php?c=share&a=index&url=' + _url + '&title=' + _txt + imgHtml[0]});
				_this.children("a.s_163").attr({"href":'http://t.163.com/article/user/checkLogin.do?link=' + _url + '&info=' + _txt+ _url + imgHtml[2]});
				_this.children("a.s_sohu").attr({"href":'http://t.sohu.com/third/post.jsp?url=' + _url + '&title=' + _txt + imgHtml[0]});
				_this.children("a.s_qq").attr({"href":'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + _url + '&title='+_txt + imgHtml[1]});
				_this.children("a.s_renren").attr({"href":'http://widget.renren.com/dialog/share?resourceUrl=' + _url + "&description=" + _txt + imgHtml[0]});
				_this.children("a.s_kaixin").attr({"href":'http://www.kaixin001.com/rest/records.php?starid=&aid=&style=11&url=' + _url + '&content=' + _txt + imgHtml[0]});
				_this.children("a.s_douban").attr({"href":'http://www.douban.com/recommend/?url=' + _url + '&title=' + _txt});
				
				var weixin=_this.children("a.s_weixin");
				if(weixin.length>0){
					weixin.click(function(e) {
						$("#popWeixin").popOn();
						var qrcodeBox=$("#qrcode").empty();
                        var ie=!+[1,];
						var url=decodeURIComponent(_url);
						if(ie){
							qrcodeBox.qrcode({
								render	: "table",
								text	: url
							});	
						}//end if
						else{
							qrcodeBox.qrcode({
								render	: "canvas",
								text	: url
							});	
						}//end else
                    });
				}//end if
					
			}//end func		
		}//end fn
	});//end extend
})(jQuery);//闭包