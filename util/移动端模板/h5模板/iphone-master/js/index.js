$(document).ready(function () {

    //-----------------------------------------定义和初始化变量----------------------------------------
    var articleBox = $('article');
	var loadBox = $('aside#loadBox');
    var windowScale = window.innerWidth / 750;
    var UserInfo;

    //----------------------------------------页面初始化----------------------------------------
    icom.init(init);//初始化
    icom.screenScrollUnable();//如果是一屏高度项目且在ios下，阻止屏幕默认滑动行为

    function init() {
        requestAnimationFrame(function(){
			if(window.Data) Data.OAuth.Login(userGetted);
			else userGetted({
					errcode:0,
					errmsg:'ok',
					result:{
						OpenID: 'xxxx-xxxx-xxxx',
						Nickname: "Nickname",
						HeadImage: 'https://wx.qlogo.cn/mmopen/vi_32/l1R1ORryeZaAU5pwF4iavDQc04aGPC6FdJOiccHHzTbyDBIjGDJjicib1sVOXgYLjkjt3NTks92TMybeGvPgw1mjPA/132'
					}
			});
		});
		if(os.wxApp) ishare.wxAppShare();// 设置小程序分享
    }//edn func
	
    //----------------------------------------微信用户登录验证----------------------------------------	
    function userGetted(res) {
		if (res.errcode == 0) {
            UserInfo = res.result;
            UserInfo.HeadImage = UserInfo.HeadImage != '' ? UserInfo.HeadImage : 'https://wx.qlogo.cn/mmopen/vi_32/l1R1ORryeZaAU5pwF4iavDQc04aGPC6FdJOiccHHzTbyDBIjGDJjicib1sVOXgYLjkjt3NTks92TMybeGvPgw1mjPA/132';
            console.log('UserInfo', UserInfo);
            load_handler();
        }//end if
        else {
            console.log(res.errmsg);
        }//end else
    }//end func

    //----------------------------------------加载页面图片----------------------------------------
    var loadPage=$('#loadPage');
	var loadPagePer=loadPage.find('.per');
	
	function load_handler() {
        var loader = new PxLoader();
        loader.addImage('images/common/turn_phone.png');

        //实际加载进度
		loader.addProgressListener(function(e) {
			var per=Math.round(e.completedCount/e.totalCount*50);
			load_set(per);
		});

        loader.addCompletionListener(function () {
            init_handler();
//			load_timer(50);//模拟加载进度
            loader = null;
        });
        loader.start();
    }//end func

    //模拟加载进度
    function load_timer(per) {
        per = per || 0;
        per += imath.randomRange(1, 3);
        per = per > 100 ? 100 : per;
		load_set(per);
        if (per == 100) setTimeout(init_handler, 200);
        else setTimeout(load_timer, 33, per);
    }//edn func
	
	function load_set(per){
		if(loadPagePer.length>0) loadPagePer.html(per+'%');
	}//edn func

    //----------------------------------------页面逻辑代码----------------------------------------
    function init_handler() {
        console.log('init handler');
		if(loadPage.length>0) icom.fadeOut(loadPage,500,function(){loadPage.remove();});
		index_handler();
    }//end func
	
	//----------------------------------------index----------------------------------------
    var indexBox = $('section.index');
	var btnStart=indexBox.find('.btnStart');

    function index_handler() {
        console.log('index_handler');
        indexBox.show();
        imonitor.add({page:'首页'});//添加虚拟页面PV监测
		btnStart.off().on('click',btnStart_click);
    }//end func
	
	function btnStart_click(e) {
	    imonitor.add({label:'开始'});//添加事件监测
	}//end event

});//end ready