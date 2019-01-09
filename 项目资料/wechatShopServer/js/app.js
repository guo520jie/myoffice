$(document).ready(function(){
	
	/*
	 * 首页设置body最小高度全屏
	 */
	$.setBodyMinHeight();
	
	/*
	 * 初始化获取参数
	 */
	var web = "http://wechat.cloud-cy.com:20301";
	var account = $.GetQueryString("account");
	var code = $.GetQueryString("code");
	if(!account){
		return $.setErrorPage({msg:"缺少参数<br />禁止操作"});
	}
	var title = '';
	var desc = '快乐享不停，积分兑好礼啦！';
	var logo = '';
	switch(account){
		case '7a4bf9ba2bd774068ad50351fb898076'://卡比布
			$(".six_logo_chose").attr('src','img/logo/kabibu.png');
			$(".qr_img").attr('src','img/qr/kabibu.jpg');
			$(".wechat_name").html('2.搜索微信号：卡比布');
			$(document).attr("title","卡比布积分商城");
			title = "卡比布积分商城";
			desc = '快乐享不停，积分兑好礼啦！';
			logo = 'img/logo/kabibu.png';
		break;
		case '7a4bf9ba2bd774068ad50351fbcappp'://咔布
			$(".six_logo_chose").attr('src','img/logo/kabu.png');
			$(".qr_img").attr('src','img/qr/kabu.jpg');
			$(".wechat_name").html('2.搜索微信号：咔布');
			$(document).attr("title","咔布积分商城");
			title = "咔布积分商城";
			desc = '快乐享不停，积分兑好礼啦！';
			logo = 'img/logo/kabu.png';
		break;
		case '7a4bf9ba2bd774068ad50351fb89clothe'://卡氏
			$(".six_logo_chose").attr('src','img/logo/kashi.png');
			$(".qr_img").attr('src','img/qr/kashi.jpg');
			$(".wechat_name").html('2.搜索微信号：卡氏');
			$(document).attr("title","卡氏积分商城");
			title = "卡氏积分商城";
			desc = '快乐享不停，积分兑好礼啦！';
			logo = 'img/logo/kashi.png';
		break;
		case '3bd7ef30b1a12dc749b97afc951coach'://佧奇
			$(".six_logo_chose").attr('src','img/logo/kaqi.png');
			$(".qr_img").attr('src','img/qr/kaqi.jpg');
			$(".wechat_name").html('2.搜索微信号：佧奇');
			$(document).attr("title","佧奇积分商城");
			title = "佧奇积分商城";
			desc = '快乐享不停，积分兑好礼啦！';
			logo = 'img/logo/kaqi.png';
		break;
		case '97afc9517a4ef30bf4instead'://婴之道
			$(".six_logo_chose").attr('src','img/logo/yingzhidao.png');
			$(".qr_img").attr('src','img/qr/yingzhidao.jpg');
			$(".wechat_name").html('2.搜索微信号：婴之道');
			$(document).attr("title","婴之道积分商城");
			title = "婴之道积分商城";
			desc = '快乐享不停，积分兑好礼啦！';
			logo = 'img/logo/yingzhidao.png';
		break;
		case '7ef30b1a12dc749b97afc95kacc'://KACC
			$(".six_logo_chose").attr('src','img/logo/kacc.png');
			$(".qr_img").attr('src','img/qr/kacc.jpg');
			$(".wechat_name").html('2.搜索微信号：KACC');
			$(document).attr("title","KACC积分商城");
			title = "KACC积分商城";
			desc = '快乐享不停，积分兑好礼啦！';
			logo = 'img/logo/kacc.png';
		break;
		
	}
	if(!code){
		// return $.goAuth(account);
	}
	$('.wechat_btn').click(function(){
		$.wechatTips(account);
	});
	var setUserPhone = function(){
		$.userPhoneTips();
		//获取验证码
		$(".tips_user_phone .btn_get_phone_code").unbind('click').click(function(){
			var bool = $(".tips_user_phone .from_group_phone_code").attr("date-status");
			console.log(bool,bool=="true");
			if(bool=="true"){
				return false;
			}
			console.log(bool,bool=="true");
			$.getPhoneCode(account,function(data){
				if(data.code!=200){
					$(".tips_user_phone .from_error").show();
					$(".tips_user_phone .from_error p").html(data.msg);
				}else{
					$(".tips_user_phone .from_error").hide();
					var time = 60;
					$(".tips_user_phone .from_group_phone_code button").html(time+'s后重发');
					$(".tips_user_phone .from_group_phone_code").attr("date-time",time);
					$(".tips_user_phone .from_group_phone_code").attr("date-status","true");
					$.get_phone_countdown();
//					$(".tips_user_phone .input_phone_code").val(data.mobile_code);
				}
			});
		});
		//提交
		$(".tips_user_phone .tips_btn button").click(function(){
			$.setUserPhone(account);
		});
	};
	var isNullObject = function(object){
		var item;  
	    for (item in object){
	    	return false;
	    }
	    return true;
	}
	var route_index = function(){
		//ajax异步加载用户信息
		$.getAjaxUser(account,code,function(user){
			$(".index-body .userLeft img").attr('src',user.headimgurl);
			$(".index-body .userRight h1").html(user.nickname);
			$(".index-body .userRight p").html('积分：'+user.scores);
			$(".index-body .navBox").show();
		});
		//异步加载banner列表
		$.getAjaxBanner(account,function(banner_list){
			var html_wrapper = '<div class="swiper-wrapper" id="banner">';
			var html_pagination = '<div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">';
			$.each(banner_list, function(key,value) {
				html_wrapper += '<div class="swiper-slide"><div class="adv_content"><a href="';
				if(value.is_link){
					html_wrapper += value.link_url;
				}else{
					html_wrapper += 'javascript:';
				}
				html_wrapper += '"><img src="'+value.img_url+'"></a></div></div>';
				
				html_pagination += '<span class="swiper-pagination-bullet';
				if(key==0){
					html_pagination += ' swiper-pagination-bullet-active';
				}
				html_pagination += '"></span>';
			});
			html_wrapper += '</div>';
			html_pagination += '</div>';
			$(".index-body .banner_index .swiper-container").html(html_wrapper+html_pagination);
			$.newSwiper('.banner_index .swiper-container',{
				loop: true,
			    autoplay: 3000,
				// 如果需要分页器
			    pagination: '.swiper-pagination',
			    paginationClickable :true,
		   });
		});
		var page = 1;
		var page_size = 6;
		var loading = true;  //状态标记
		//异步加载goods列表
		$.getAjaxGoods(account,function(goods){
			if(goods.length>=page_size){
				page++;
				loading = false;
				$(".index-body .load-div").html('<i class="img-loading"></i><span class="span-loading">正在加载</span>');
			}else{
				$(".index-body .load-div").html('<span class="span-loading">已经到底了</span>');
			}
			var html = '';
			$.each(goods, function(key,value) {
				html += '<li data-goods=\''+JSON.stringify(value)+'\'><img src="'+value.thumb+'" /><h1 class="fontsize-24">'+value.name+'</h1><p class="fontsize-24"><span class="color color-orange fontsize-36">'+value.vip_scores+'</span>积分<span class="decoration">'+value.standard_scores+'积分</span></p></li>';
			});
			$(".index-body .detailBox .clearFix").html(html);
			$.goodsInfoPage();
		},page,page_size);
		$(window).unbind('scroll').scroll(function() {
			if ($(document).scrollTop() >= $(document).height() - $(window).height()-20) {
				if(loading) return;
				loading = true;
				//异步加载goods列表
				$.getAjaxGoods(account,function(goods){
					if(goods.length>=page_size){
						page++;
						loading = false;
						$(".index-body .load-div").html('<i class="img-loading"></i><span class="span-loading">正在加载</span>');
					}else{
						$(".index-body .load-div").html('<span class="span-loading">已经到底了</span>');
					}
					var html = '';
					$.each(goods, function(key,value) {
						html += '<li data-goods=\''+JSON.stringify(value)+'\'><img src="'+value.thumb+'" /><h1 class="fontsize-24">'+value.name+'</h1><p class="fontsize-24"><span class="color color-orange fontsize-36">'+value.vip_scores+'</span>积分<span class="decoration">'+value.standard_scores+'积分</span></p></li>';
					});
					$(".index-body .detailBox .clearFix").append(html);
					$.goodsInfoPage();
				},page,page_size);
				
			}
		});
		//签到
		$(".index-body .sign_btn").unbind('click').click(function(){
			$.userSign(account,function(data){
				if(data.code==200){
					//ajax异步加载用户信息
					$.getAjaxReloadUser(account,function(user){
						$(".index-body .userLeft img").attr('src',user.headimgurl);
						$(".index-body .userRight h1").html(user.nickname);
						$(".index-body .userRight p").html('积分：'+user.scores);
						$(".index-body .navBox").show();
					});
					$.signTips('恭喜您，获得'+data.data.get_points+'积分','')
				}else{
					$.msgTips("今天已签到",'明天再来吧！');
				}
			});
		});
		//订单列表
		$(".index-body .order_list_btn").unbind('click').click(function(){
			$.goShowPage('order_list');
		});
	};
	var route_goods_info = function(){
		var goods = $.getStorge('goods');
		$.RocLoad('show',{msg:'数据加载中'});
		if(goods){
			goods = JSON.parse($.getStorge('goods'));
			$(".goods_info-body .fixed_attr").hide();
			$.setStorge('goods_attr','');$.setStorge('goods_num',1);
			var html_wrapper = '<div class="swiper-wrapper" id="banner">';
			var html_pagination = '<div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">';
			if(!goods.goods_slider){
				goods.goods_slider = [{url:goods.thumb}];
			}
			$.each(goods.goods_slider, function(key,value) {
				html_wrapper += '<div class="swiper-slide"><div class="adv_content"><a href="javascript:"><img src="'+value.url+'"></a></div></div>';
				
				html_pagination += '<span class="swiper-pagination-bullet';
				if(key==0){
					html_pagination += ' swiper-pagination-bullet-active';
				}
				html_pagination += '"></span>';
			});
			
			html_wrapper += '</div>';
			html_pagination += '</div>';
			$(".goods_info-body .banner_goods_info .swiper-container").html(html_wrapper+html_pagination);
			$.newSwiper('.banner_goods_info .swiper-container',{
				loop: true,
			    autoplay: 3000,
				// 如果需要分页器
			    pagination: '.swiper-pagination',
			    paginationClickable :true,
		    });
			$(".goods_info-body .goods_header h1 b").html(goods.name);
			$(".goods_info-body .goods_header p .color-orange").html(goods.vip_scores);
			$(".goods_info-body .goods_header p .decoration").html(goods.standard_scores+'积分');
			$(".goods_info-body .goods_content_div").html(goods.content);
			$(".goods_info-body .goods_content_div img").css('width','100%');
			$(".goods_info-body .goods_content_div img").attr('width','100%');
//			var content_img = $(".goods_info-body .goods_content_div img");
//			$.each(content_img, function(key,value) {
//				$(".goods_info-body .goods_content_div img").css('width','100%');
//				$(".goods_info-body .goods_content_div img").attr('width','100%');
//			});
			$(".goods_info-body .attr_header .attr_header_logo").attr('src',goods.thumb);
			$(".goods_info-body .attr_header p .color-orange").html(goods.vip_scores);
			$(".goods_info-body .attr_header p .decoration").html(goods.standard_scores+'积分');
			
			if(goods.goods_attr){
				var goods_attr = JSON.parse(goods.goods_attr);
				var goods_attr_html = '';
				$.each(goods_attr, function(key,value) {
					goods_attr_html += '<div class="attr_text"><p class="attr_title fontsize-26">'+key+'</p>';
					$.each(value, function(k,v) {
						goods_attr_html += '<button class="fontsize-26 float">'+v+'</button>';
					});
					goods_attr_html += '</div>';
				});
				$(".goods_info-body .attr_content").html(goods_attr_html);
			}else{
				$(".goods_info-body .attr_content").html('');
			}
			$.RocLoad('hide');
			
			
			$(".goods_info-body .fixed_btn").unbind('click').click(function(){
				var display = $(".goods_info-body .fixed_attr").css('display');
				if(display=='none'){
					$(".goods_info-body .fixed_attr").show();
				}else{
					var attr_string = $.getStorge('goods_attr');
					var goods_num = $.getStorge('goods_num');
					var user = $.getUser();
					if(!user.is_vip){
						setUserPhone();
						return false;
					}
					if(goods.goods_attr&&!isNullObject(goods.goods_attr)&&attr_string==""){
						$.msgTips("请选择商品属性");
						return false;
					}
					if(goods_num*goods.vip_scores>user.scores){
						$.msgTips('兑换失败','对不起，您的积分不足；请获取积分后再来兑换哦');
						return false;
					}
					$.msgTips('温馨提示','是否确定兑换该奖品，兑换成功后将无法取消订单哦！',function(){
						$.setAward(account,goods.id,function(data){
							if(data.code==200){
								$.setStorge("award_success",JSON.stringify(data.data));
								$.setStorge('award_success_msg_num',1);
								$.goShowPage('award_success');
								//ajax异步加载用户信息
								$.getAjaxReloadUser(account,function(user){
									$(".index-body .userLeft img").attr('src',user.headimgurl);
									$(".index-body .userRight h1").html(user.nickname);
									$(".index-body .userRight p").html('积分：'+user.scores);
								});
							}else{
								$.msgTips("活动未开始",data.msg);
							}
						});
					});
					
				}
			});
			$(".goods_info-body .fixed_attr .attr_close").unbind('click').click(function(){
				$(".goods_info-body .fixed_attr").hide();
			});
			$(".goods_info-body .attr_content button").unbind("click").click(function(){
				$(this).parent().children('.btn-orange').removeClass("btn-orange");
				$(this).addClass("btn-orange");
				var parent = $(this).parent().children('p').html();
				var item = $(this).html();
				var attr_string = $.getStorge("goods_attr");
				if(attr_string.indexOf(parent)>=0){
					var array = new Array();
					array = attr_string.split(';');
					$.each(array, function(index,item1) {
						if(item1.indexOf(parent)>=0){
							array[index] = parent+':'+item;
						}
					});
					attr_string = array.join(';');
				}else{
					attr_string += parent+":"+item+";";
				}
				$.setStorge('goods_attr',attr_string);
			});
			$(".goods_info-body .attr_num .delete_num").unbind('click').click(function(){
				var num = $(".goods_info-body .attr_num .goods_number p").html();
				if(num>1){
					$(this).removeClass('no_click');
					num--;
					$(".goods_info-body .attr_num .goods_number p").html(num);
					$.setStorge('goods_num',num);
				}else{
					$(this).addClass('no_click');
					return;
				}
			});
			$(".goods_info-body .attr_num .add_num").unbind('click').click(function(){
				var num = $(".goods_info-body .attr_num .goods_number p").html();
				num++;
				$(".goods_info-body .attr_num .goods_number p").html(num);
				$.setStorge('goods_num',num);
				if(num>1){
					$('.goods_info-body .attr_num .delete_num').removeClass('no_click');
				}
			});
		}else{
			$.RocLoad('show',{msg:'没有该奖品',time:3},function(){
				$.goShowPage('index')
			});
		}
	}
	var route_award_success = function(){
		newAwardInfo();
		var award_success_msg_num = $.getStorge('award_success_msg_num');
		if(award_success_msg_num){
			$.msgTips('兑换成功','恭喜您兑换成功，请凭二维码到您购买产品的门店去兑换吧！');
			$.setStorge('award_success_msg_num',0);
		}
		
		var order = JSON.parse($.getStorge('award_success'));
		$.setStorge('order_info',order);
		$(".award_success-body .award_goods_name").html(order.goods_name);
		$(".award_success-body .award_order_num p").html('订单编号：'+order.prize_number);
		$(".award_success-body .award_code_img img").attr('src',web+"/QrCode?code=http://jssdk.cloud-cy.com/wechatShopAdminServer/index.html?order_code="+order.code+"|||prize_number="+order.prize_number+"|||url_code="+account);
		$.getAjaxGoods(account,function(goods){
			var html = '';
			$.each(goods, function(key,value) {
				html += '<li data-goods=\''+JSON.stringify(value)+'\'><img src="'+value.thumb+'" /><h1 class="fontsize-24">'+value.name+'</h1><p class="fontsize-24"><span class="color color-orange fontsize-36">'+value.vip_scores+'</span>积分<span class="decoration">'+value.standard_scores+'积分</span></p></li>';
			});
			$(".award_success-body .detailBox .clearFix").html(html);
			$.goodsInfoPage();
		},1,4);
		$(".award_content_title a").click(function(){
			$.goShowPage('order_info');
		})
	};
	var route_order_info = function(){
		var order = $.getStorge('order_info');console.log(order);
		$(".order_info-body .order_info_order_num .left").html('订单编号：'+order.prize_number);
		$(".order_info-body .goods_name").html(order.goods_name);
		$(".order_info-body .order_header .step1 .time").html(order.create_time);
		$(".order_info-body .money").html(order.scores/order.goods_number+'积分');
		$(".order_info-body .goods_description").html(order.goods_attr);
		$(".order_info-body .goods_num").html('x'+order.goods_number);
		$(".order_info-body .box-body-content img").attr('src',order.goods_thumb);
		$(".order_info-body .award_code_img img").attr('src',web+"/QrCode?code=http://jssdk.cloud-cy.com/wechatShopAdminServer/index.html?order_code="+order.code+"|||prize_number="+order.prize_number+"|||url_code="+account);
		$(".order_info-body .box-body-bottom .orige b").html(order.scores);
		switch(order.status){
			case 'begin':
				$(".order_info-body .order_info_order_num .right").html('待领取');
				$(".order_info-body .order_header .step2").removeClass('order_success_status');
				$(".order_info-body .order_header .step3").removeClass('order_success_status');
				$(".order_info-body .award_code_img").show();
				newAwardInfo();
			break;
			case 'success':
				$(".order_info-body .order_info_order_num .right").html('已领取');
				$(".order_info-body .order_header .step3 .time").html(order.update_time);
				$(".order_info-body .order_header .step2").addClass('order_success_status');
				$(".order_info-body .order_header .step3").addClass('order_success_status');
				$(".order_info-body .award_code_img").hide();
			break;
		}
	};
	var route_order_list = function(){
		$.getOrderHeader(function(data){
			if(data.data.url!=undefined){
				$(".order_list_header img").attr('src',data.data.url);
			}else{
				$(".order_list_header img").attr('src','img/banner.png');
			}
		});
		$.getAjaxOrderList(account,'begin',function(data){
			if(data.code==200){
				var html = '';
				for(var i=0;i<data.data.length;i++){
					var goods = data.data[i];
					html += '<div class="order_list_goods" data-order=\''+JSON.stringify(goods)+'\'><div class="order_info_order_num"><p class="left fontsize-26">订单编号：'+goods.prize_number+'</p><p class="right fontsize-26">待领取</p><div class="clear"></div></div><div class="box-body-content"><div class="left"><img src="'+goods.goods_thumb+'" /></div><div class="goods_name left">'+goods.goods_name+'</div><div class="money yellow right">'+goods.scores/goods.goods_number+'积分</div><div class="goods_description left">'+goods.goods_attr+'</div><div class="goods_num right">x'+goods.goods_number+'</div><div class="clear"></div></div><div class="box-body-bottom"><span class="box-bottom-name fontsize-26"><b>合计消费积分：</b></span><span class="orige fontsize-36"><b>'+goods.scores+'</b></span></div></div>';
				}
				$(".order_list-body .order_begin_list").html(html);
				$(".order_list_goods").unbind('click').click(function(){
					$.setStorge('order_info',JSON.parse($(this).attr('data-order')));
					$.goShowPage('order_info');
				});
			}else{
				$.msgTips("数据加载失败",data.msg);
			}
		});
		$.getAjaxOrderList(account,'success',function(data){
			if(data.code==200){
				var html = '';
				for(var i=0;i<data.data.length;i++){
					var goods = data.data[i];
					html += '<div class="order_list_goods" data-order=\''+JSON.stringify(goods)+'\'><div class="order_info_order_num"><p class="left fontsize-26">订单编号：'+goods.prize_number+'</p><p class="right fontsize-26">已领取</p><div class="clear"></div></div><div class="box-body-content"><div class="left"><img src="'+goods.goods_thumb+'" /></div><div class="goods_name left">'+goods.goods_name+'</div><div class="money yellow right">'+goods.scores/goods.goods_number+'积分</div><div class="goods_description left">'+goods.goods_attr+'</div><div class="goods_num right">x'+goods.goods_number+'</div><div class="clear"></div></div><div class="box-body-bottom"><span class="box-bottom-name fontsize-26"><b>合计消费积分：</b></span><span class="orige fontsize-36"><b>'+goods.scores+'</b></span></div></div>';
				}
				$(".order_list-body .order_success_list").html(html);
				$(".order_list_goods").unbind('click').click(function(){
					$.setStorge('order_info',JSON.parse($(this).attr('data-order')));
					$.goShowPage('order_info');
				});
			}else{
				$.msgTips("数据加载失败",data.msg);
			}
		});
	
		$(".order_list-body .chose_goods_type .header-chose .left").click(function(){
			$(this).removeClass('chose_div_hide');
			$(this).addClass('chose_div_show');
			$(this).parent().children('.right').removeClass('chose_div_show');
			$(this).parent().children('.right').addClass('chose_div_hide');
			$(".order_list-body .chose_goods_type .header-chose-bottom .left .pending-goods-bottom").removeClass('chose_hide');
			$(".order_list-body .chose_goods_type .header-chose-bottom .left .pending-goods-bottom").addClass('chose_show');
			$(".order_list-body .chose_goods_type .header-chose-bottom .right .history-goods-bottom").removeClass('chose_show');
			$(".order_list-body .chose_goods_type .header-chose-bottom .right .history-goods-bottom").addClass('chose_hide');
			$(".order_list-body .order_begin_list").hide();
			$(".order_list-body .order_success_list").show();
		});
		$(".order_list-body .chose_goods_type .header-chose .right").click(function(){
			$(this).removeClass('chose_div_hide');
			$(this).addClass('chose_div_show');
			$(this).parent().children('.left').removeClass('chose_div_show');
			$(this).parent().children('.left').addClass('chose_div_hide');
			$(".order_list-body .chose_goods_type .header-chose-bottom .left .pending-goods-bottom").removeClass('chose_show');
			$(".order_list-body .chose_goods_type .header-chose-bottom .left .pending-goods-bottom").addClass('chose_hide');
			$(".order_list-body .chose_goods_type .header-chose-bottom .right .history-goods-bottom").removeClass('chose_hide');
			$(".order_list-body .chose_goods_type .header-chose-bottom .right .history-goods-bottom").addClass('chose_show');
			$(".order_list-body .order_begin_list").show();
			$(".order_list-body .order_success_list").hide();
		});
	};
	var route_user_index = function(){
		var user = $.getUser();
		console.log(user);
		$(".user_index-body .user_header_group img").attr('src',user.headimgurl);
		$(".user_index-body .user_nickname").html(user.nickname);
		var mobile = '';
		if(user.is_vip){
			mobile = user.mobile;
		}
		$(".user_index-body .user_phone").html(mobile);
		
		if(user.birthday){
			$(".user_index-body .user_birthday").val(user.birthday);
		}
		
		$(".user_phone_group .right").click(function(){
			setUserPhone();
		});
	};
	
	//重新获取订单信息
	var getNewAward = function(){
		var api_url = $.getApiUrl();
		var order_info = $.getStorge('order_info');
		$.ajax({
			type:"get",
			url:api_url.getAwardInfoNew,
			data:{
				id:order_info.id,
			},
			dataType:"json",
			success:function(data, textStatus){
				if(data.code==200){console.log("success2")
					$.setStorge("order_info",data.data);
					clearTime();
					var hash = window.location.hash.substr(1);
					if(hash=='order_info'){
						window.location.reload();
					}else{
						$.goShowPage('order_info');
					}
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
			}
		});
	}
	//轮询（每5秒钟查询一次）
	var newAwardInfo = function(){
		var api_url = $.getApiUrl();
		var interval = setInterval(function(){
			var order_info = $.getStorge('order_info');console.log("success1")
			$.ajax({
				type:"get",
				url:api_url.getAwardStatus,
				data:{
					id:order_info.id,
				},
				dataType:"json",
				success:function(data, textStatus){
					if(data.code==200&&data.data.status=="success"){
						getNewAward();
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
				}
			});
		},5000);
		$.setStorge("time_int",interval);console.log('setInterval');
		
	}
	//关闭轮询
	var clearTime = function(){
		var interval = $.getStorge("time_int");
		clearInterval(interval);console.log('clear');
	}
	/*
	 * 路由
	 */
	$.setShowPage(function(hash){
		clearTime();
		var str = 'index,goods_info,award_success,order_info,order_list,user_index';
		if(hash&&str.indexOf(hash)>=0){
			eval('route_'+hash+'()');
		}
		
	});
	//初始化jssdk
    var init = function(data){
        //通过config接口注入权限验证配置
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.app_id, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
        });
        //通过ready接口处理成功验证
        wx.ready(function(){
            //分享到朋友圈
            
//  		var local_url = $.getStorge('auth_url');
//  		if(!local_url){
//  			local_url = window.location.href;
//  		}
    		var local_url = window.location.href;
           
            console.log(local_url);
            wx.onMenuShareTimeline({
			    title: desc+'--'+title, // 分享标题
			    link: local_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			    imgUrl: 'http://jssdk.cloud-cy.com/wechatShopServer/'+logo, // 分享图标
			    success: function () { 
			        // 用户确认分享后执行的回调函数
			    },
			    cancel: function () { 
			        // 用户取消分享后执行的回调函数
			    }
			});
			//分享给朋友
			wx.onMenuShareAppMessage({
			    title: title, // 分享标题
			    desc: desc, // 分享描述
			    link: local_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			    imgUrl: 'http://jssdk.cloud-cy.com/wechatShopServer/'+logo, // 分享图标
			    type: 'link', // 分享类型,music、video或link，不填默认为link
			    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			    success: function () { 
			        // 用户确认分享后执行的回调函数
			    },
			    cancel: function () { 
			        // 用户取消分享后执行的回调函数
			    }
			});
        });
    }
	//获取jssdk配置
	$.ajax({
        type:"get",
        url:web+"/Jssdk",
        data:{
        	url:window.location.href,
        	url_code:account
        },
        dataType:"json",
        success:function(data,textStatus){console.log(data);
            if(data.code==200){
                init(data.data);
            }else{
//              alert("连接失败，请稍后再试或联系管理员");
            }

        }
	});
	

	// 添加地址
	// var getAddressInfo = function(){
	// 	var api_url = $.getApiUrl();
	// 	$.ajax({
	// 		type:'post',
	// 		url:api_url.getAddressInfoUrl,
	// 		dataType:'json',
	// 		success:function(data){
	// 			console.log(data)
	// 		}
	// 	})
	// }
	// getAddressInfo()

});