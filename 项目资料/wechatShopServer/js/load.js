;(function($){
	
	var web = "http://192.168.1.40:20301";
	//初始化API请求地址
	var api_url = {
		getUserInfo:web+"/auth/getCodeUser",//根据code
		reloadUserInfo:web+"/auth/reloadUser",//根据openid
		getBanner:web+'/banner/getBanner',
		getGoodsList:web+'/goods/getGoodsList',
		getGoodsInfo:web+"/goods/getGoodsInfo",
		getAddressList:web+'/user/getAddress',
		addUserAddress:web+'/user/addAddress',
		deleteUserAddress:web+'/user/deleteUserAddress',
		getUserAddress:web+"/user/getAddressInfo",
		updateUserAddress:web+"/user/updateUserAddress",
		awardShop:web+"/goods/award",
		getAward:web+"/goods/getAward",
		deleteAward:web+"/goods/deleteAward",
		userSign:web+"/sign/userSign",
		getMobileCode:web+"/user/getMobileCodeNum",
		updateUserMobile:web+"/user/updateUserMobile",
		updateUserBirthday:web+"/user/updateUserBirthday",
		getAwardStatus:web+"/goods/getAwardStatus",
		getAwardInfoNew:web+"/goods/getAwardInfoForId",
		getAuthUrl:web+"/auth/getCodeUrl",
		getOrderHeader:web+"/ImgList",
		getAddressInfoUrl:web+"/Area/getArea",
	};
	$.getApiUrl = function(){
		return api_url;
	}
	/*
	 * 设置tips的所在位置
	 */
	function setTipsAddress(class_name){
		$(class_name+" .tips_div").css("top", $(window).height() / 2).css("margin-top", -$(class_name+" .tips_div").innerHeight() / 2);
	}
	/*
	 * tips加载
	 */
	$.RocLoad = function(options,param,callback){
		param = $.extend({}, defaults, param || {});
		if(typeof(options)=='string'){
			switch(options){
				case 'show':
					showTips(param,callback);
				break;
				case 'hide':
					hideTips();
				break;
			}
		}
	};
	function showTips(param,callback){
		$(".tips_load").show();
		$(".tips_load .tips_div p").html(param.msg);
		setTipsAddress(".tips_load");
		if(param.time){
			setTimeout(function(){
				$(".tips_load").hide();
				if(callback){
					callback();
				}
			},param.time*1000);
		}
	};
	function hideTips(){
		$(".tips_load").hide();
	};
	var defaults = {
		msg:'正在加载',
		time:0
	};
	/*
	 * 签到tips
	 */
	$.signTips = function(msg,description){
		if(!description){
			description = '';
		}
		$(".tips_sign .sign_msg_title").html(msg);
		$(".tips_sign .sign_msg_content").html(description);
		$(".tips_sign").show();
		setTipsAddress(".tips_sign");
		$(".tips_sign .tips_close").unbind('click').click(function(){
			$(".tips_sign").hide();
		});
		$(".tips_sign .tips_btn button").unbind('click').click(function(){
			$(".tips_sign").hide();
		});
	};
	/*
	 * 信息tips
	 */
	$.msgTips = function(msg,description,callback,close_callback){
		if(!description){
			description = '';
		}
		$(".tips_msg .tips_title").html(msg);
		$(".tips_msg .tips_description").html(description);
		$(".tips_msg").show();
		setTipsAddress(".tips_msg");
		$(".tips_msg .tips_close").unbind('click').click(function(){
			if(close_callback){
				close_callback();
			}
			$(".tips_msg").hide();
		});
		$(".tips_msg .tips_btn button").unbind('click').click(function(){
			if(callback){
				callback();
			}
			$(".tips_msg").hide();
		});
	};
	/*
	 * 手机号tips
	 */
	$.userPhoneTips = function(callback){
		$(".input_user_phone").blur(function () {
	    	clearNoNum($(this));
		});
		$(".input_user_phone").keyup(function () {
		    clearNoNum($(this));
		});
		$(".input_phone_code").blur(function () {
	    	clearNoNum6($(this));
		});
		$(".input_phone_code").keyup(function () {
		    clearNoNum6($(this));
		});
		$(".tips_user_phone").show();
		setTipsAddress(".tips_user_phone");
		$(".tips_user_phone .tips_close").unbind('click').click(function(){
			$(".tips_user_phone").hide();
		});
	}
	/*
	 * 关注我们tips
	 */
	$.wechatTips = function(account){
		$(".tips_wechat").show();
		setTipsAddress(".tips_wechat");
		$(".tips_wechat .tips_close").unbind('click').click(function(){
			$(".tips_wechat").hide();
		});
	}
	//清除"数字"以外的字符
	var clearNoNum = function(obj){
	    obj.val(obj.val().replace(/[^\d]/g,"")); //清除"数字"以外的字符
	    obj.val(obj.val().replace(/^(\d\d\d\d\d\d\d\d\d\d\d).*$/,'$1'));//只能输入十一位数字
	}
	//清除"数字"以外的字符
	var clearNoNum6 = function(obj){
	    obj.val(obj.val().replace(/[^\d]/g,"")); //清除"数字"以外的字符
	    obj.val(obj.val().replace(/^(\d\d\d\d\d\d).*$/,'$1'));//只能输入十一位数字
	}
	/*
	 * 错误页面
	 */
	$.setErrorPage = function(param){
		param = $.extend({}, defaults, param || {});
		$.goShowPage('error');
		$(".error-body h1").html(param.msg);
	};
	/*
	 * 设置footer位置
	 */
	$.setFooter = function(page){
		var str = 'user_index';
		if(str.indexOf(page)>=0){
			console.log('add');
			$('.'+page+'-body .footer').css('bottom',0).css('position','absolute').css('width','9rem');
		}else{
			console.log('remove');
			$('.'+page+'-body .footer').removeAttr("style");
		}
	}
	var defaults_error_page = {
		msg:'缺少参数<br />禁止操作'
	};
	/*
	 * 路由
	 */
	$.setShowPage = function(callback){
		$.RocLoad('hide');
		$(window).bind('hashchange', function() {
			var hash = window.location.hash.substr(1);
			$.goShowPage(hash);
			callback(hash);
		});
		var hash = window.location.hash.substr(1);
		$.goShowPage(hash);
		callback(hash);
	};
	$.goShowPage = function(page_name){
		if(!page_name){
    		page_name = 'index';
    	}
		if(page_name=='order_list'){
			$.listenScroll();
		}
    	$(".index-body").removeClass("show");
    	$(".goods_info-body").removeClass("show");
    	$(".award_success-body").removeClass("show");
    	$(".order_info-body").removeClass("show");
    	$(".order_list-body").removeClass("show");
    	$(".error-body").removeClass("show");
    	$(".user_index-body").removeClass("show");
    	$(".index-body").addClass("hide");
    	$(".goods_info-body").addClass("hide");
    	$(".award_success-body").addClass("hide");
    	$(".order_info-body").addClass("hide");
    	$(".order_list-body").addClass("hide");
    	$(".error-body").addClass("hide");
    	$(".user_index-body").addClass("hide");
    	var class_name = "."+page_name+"-body";
    	$(class_name).removeClass("hide");
    	$(class_name).addClass("show");
    	window.location.hash = "#"+page_name;
//  	$.setFooter(page_name);
	};
	/*
	 * 首页设置body高度全屏
	 */
	$.setBodyMinHeight = function(){
		var document_height = $(document).height();
		var body_height = $("body").height();
		if(body_height<document_height){
			$("body").height(document_height);
		}
	}
	/*
	 * 页面滚动监听
	 */
	$.listenScroll = function(){
		orderListScroll();
	};
	function orderListScroll(){
		$(window).scroll(function(event){
			var height = $(".chose_goods_type").offset().top-$(document).scrollTop();
			if(height<=0){
				var class_str = $(".chose_goods_type").attr("class");
				if(class_str.indexOf("fixed-header")<0){
					addFixedHeader("chose_goods_type");
				}
				
				var fixed_top = $(".fixed-top").offset().top-$(document).scrollTop();
				if(fixed_top>=0){
					removeFixedHeader("chose_goods_type");
				}
			}
		});
	}
	//将元素设为头部悬浮
	function addFixedHeader(class_name){
		$("."+class_name).addClass("fixed-header");
		$("."+class_name).css('margin-top',0);
	}
	//取消元素的头部悬浮
	function removeFixedHeader(class_name){
		$("."+class_name).removeClass("fixed-header");
		$("."+class_name).css('margin-top','-0.1rem');
	}
	/*
	 * swiper
	 */
	$.newSwiper = function(class_name,data){
		new Swiper(class_name,data);
	}
	
	/*
	 * 获取get参数
	 */
	$.GetQueryString = function(name){
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if(r!=null)return  unescape(r[2]); return null;
	};
	//获取user信息
	$.getUser = function(init){
		var user = JSON.parse(sessionStorage.getItem("user"));
//		if(!user&&!init){//没有用户；跳转至授权页面
//			goAuth();return;
//		}
		return user;
	};
	//设置user信息
	$.setUser = function(user){
		sessionStorage.setItem("user",JSON.stringify(user));
	};
	//设置storge信息
	$.setStorge = function(key,value){
		var session = JSON.parse(sessionStorage.getItem("rocSession"));
		if(!session){
			session = new Object();
		}
		session[key] = value;
		sessionStorage.setItem("rocSession",JSON.stringify(session));
	};
	//获取storge信息
	$.getStorge = function(key){
		var session = JSON.parse(sessionStorage.getItem("rocSession"));
		if(!session){
			session = new Object();
		}
		return session[key];
	};
	/*
	 * 跳转至授权页面
	 */
	$.goAuth = function(account){
		if(!account){
			$.RocLoad('show',{msg:'缺少参数<br>无法授权'});
			return ;
		}
		$.RocLoad('show',{msg:'数据加载中'});
		var local_url = window.location.protocol+'//'+window.location.host+window.location.pathname;
		$.ajax({
			type:"get",
			url:api_url.getAuthUrl,
			async:false,
			data:{
				account:account,
				local_url:local_url
			},
			dataType:"json",
			success:function(data, textStatus){
				if(data.code==200){
					window.location.href = data.url;
				}else{
					$.setErrorPage({msg:data.msg});
				}

			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.setErrorPage({msg:textStatus});
			}
		});
	};
	//通过异步接口获取user信息（code模式）
	$.getAjaxUser = function(account,code,callback){
		var user = $.getUser();
		if(user){
			callback(user);
			return ;
		}
		$.ajax({
			type:"get",
			url:api_url.reloadUserInfo,
			async:true,
			data:{
				account:account,
				openid:'oygyPuIm-M6R_Mi1_IHWncWa2diQ'
			},
			dataType:"json",
			success:function(data, textStatus){
				if(data.code==200){
					$.setUser(data.data);
					callback(data.data);
				}else{
					$.goAuth(account);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.setErrorPage({msg:textStatus});
			}
		});
	};
	//异步获取user信息（非code模式）
	$.getAjaxReloadUser = function(account,callback){
		var user = $.getUser();
		$.ajax({
			type:"get",
			url:api_url.reloadUserInfo,
			async:true,
			data:{
				account:account,
				openid:user.openid
			},
			dataType:"json",
			success:function(data, textStatus){
				if(data.code==200){
					$.setUser(data.data);
					callback(data.data);
				}else{
					$.setErrorPage({msg:data.msg});
				}
				
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.setErrorPage({msg:textStatus});
			}
		});
	};
	//异步获取banner列表
	$.getAjaxBanner = function(account,callback){
		$.ajax({
			type:"get",
			url:api_url.getBanner,
			async:true,
			data:{
				account:account
			},
			dataType:"json",
			success:function(data, textStatus){
				if(data.code==200){
					$.setStorge('banner_list',data.data);
					callback(data.data);
				}else{
					$.setErrorPage({msg:data.msg});
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.setErrorPage({msg:textStatus});
			}
		});
	};
	//异步获取商品列表
	$.getAjaxGoods = function(account,callback,page,page_size){
		page = page?page:1;
		page_size = page_size?page_size:6;
		$.ajax({
			type:"get",
			url:api_url.getGoodsList,
			async:true,
			data:{
				account:account,
				page:page,
				page_size:page_size
			},
			dataType:"json",
			success:function(data, textStatus){
				if(data.code==200){
					$.setStorge('banner_list',data.data);
					callback(data.data);
				}else{
					$.setErrorPage({msg:data.msg});
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.setErrorPage({msg:textStatus});
			}
		});
	};
	//异步签到
	$.userSign = function(account,callback){
		$.RocLoad('show',{msg:'数据加载中'});
		var user = $.getUser();
		$.ajax({
			type:"get",
			url:api_url.userSign,
			data:{
				account:account,
				openid:user.openid
			},
			dataType:"json",
			success:function(data,textStatus){
				callback(data);
				$.RocLoad('hide');
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.RocLoad('hide');
				$.RocLoad('show',{msg:textStatus,time:3});
			}
		});
	};
	//进入商品详情页
	$.goodsInfoPage = function(){
		$(".index-body .detailBox .clearFix li").unbind('click').click(function(){
			var goods = $(this).attr("data-goods");
			$.setStorge('goods',goods);
			$.goShowPage('goods_info');
		});
	};
	//获取手机验证码
	$.getPhoneCode = function(account,callback){
		var user = $.getUser();
		var mobile = $('.tips_user_phone .input_user_phone').val();
		$.ajax({
			type:"get",
			url:api_url.getMobileCode,
			data:{
				account:account,
				openid:user.openid,
				mobile:mobile
			},
			dataType:"json",
			success:function(data, textStatus){
				callback(data);
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.RocLoad('show',{msg:textStatus,time:3});
			}
		});
	};
	$.get_phone_countdown = function(){
		var countdown = setInterval(function(){
			var second = $(".tips_user_phone .from_group_phone_code").attr("date-time");
			second = second-1;
			if(second<=0){
				clearInterval(countdown);
				$(".tips_user_phone .from_group_phone_code button").html('获取验证码');
				$(".tips_user_phone .from_group_phone_code").attr("date-time",second);
				$(".tips_user_phone .from_group_phone_code").attr("date-status","false");
				
				return;
			}
			$(".tips_user_phone .from_group_phone_code").attr("date-time",second);
			$(".tips_user_phone .from_group_phone_code button").html(second+"s后重发");
		},1000);
	};
	//设置用户手机号
	$.setUserPhone = function(account){
		var mobile = $('.tips_user_phone .input_user_phone').val();
		var code = $('.tips_user_phone .input_phone_code').val();
		var user = $.getUser();console.log(account,mobile,code,user);
		$.ajax({
			type:"get",
			url:api_url.updateUserMobile,
			data:{
				account:account,
				openid:user.openid,
				mobile:mobile,
				code:code
			},
			dataType:"json",
			success:function(data,textStatus){
				//重新加载用户信息
				$.getAjaxReloadUser(account,function(user){
					$(".index-body .userLeft img").attr('src',user.headimgurl);
					$(".index-body .userRight h1").html(user.nickname);
					$(".index-body .userRight p").html('积分：'+user.scores);
					$(".index-body .navBox").show();
					var mobile = '';
					if(user.is_vip){
						mobile = user.mobile;
					}
					$(".user_index-body .user_phone").html(mobile);
				});
				
				if(data.code==200){
					$.msgTips("注册成功","恭喜您已成功绑定手机号");
				}else{
					$.msgTips("注册失败",data.msg);
				}
				$(".tips_user_phone").hide();
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.setErrorPage({msg:textStatus});
			}
		});
	};
	//确定兑奖
	$.setAward = function(account,goods_id,callback){
		var user = $.getUser();
		$.ajax({
			type:"get",
			url:api_url.awardShop,
			data:{
				account:account,
				openid:user.openid,
				goods_id:goods_id,
				goods_num:$.getStorge('goods_num'),
				attr:$.getStorge('goods_attr'),
				remark:""
			},
			dataType:"json",
			success:function(data,textStatus){
				callback(data);
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.setErrorPage({msg:textStatus});
			}
		});
	};
	//获取订单列表
	$.getAjaxOrderList = function(account,status,callback){
		var user =$.getUser();
		$.ajax({
			type:"get",
			url:api_url.getAward,
			data:{
				account:account,
				openid:user.openid,
				status:status
			},
			dataType:"json",
			success:function(data,textStatus){
				callback(data);
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.setErrorPage({msg:textStatus});
			}
		});
	};
	//获取订单顶部logo
	$.getOrderHeader = function(callback){
		$.ajax({
			type:"get",
			url:api_url.getOrderHeader,
			dataType:"json",
			success:function(data,textStatus){
				callback(data);
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.setErrorPage({msg:textStatus});
			}
		});
	}
})(jQuery);