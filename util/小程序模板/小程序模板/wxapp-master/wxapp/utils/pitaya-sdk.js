!function (f, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = f() : "function" == typeof define && define.amd ? define(t) : t.Pitaya = f()
}(main, this);

function main() {
    //发送队列
    function sendQueue() {
        var t = {}
        var concurrent = 1, queue = [], tasks = [], active = 0;
        t.push = function (fun) {
            tasks.push(new Promise(function (resolve) {
                function run() {
                    active++;
                    fun().then(function (x) {
                        resolve(x)
                    }).then(function () {
                        t.next()
                    })
                }
                if (active < concurrent) run()
                else queue.push(run)
            }))
        }
        t.all = function () {
            return Promise.all(tasks);
        }
        t.next = function () {
            active--;
            if (queue.length > 0) queue.shift()()
        }
        return t;
    }
    function waitQueue() {
        var t = {};
        var tasks = [];

        t.push = function (fun) {
            tasks.push(fun)
        }
        t.concat = function () {
            tasks.map(function (fun) {
                queue.push(fun)
            })
            tasks = [];
        }
        return t;

    }


    function inject(x, name, fun) {
        if (x[name]) {
            var o = x[name];
            x[name] = function (n) {
                fun.call(this, n, name);
                o.call(this, n);
            }
        }
        else {
            x[name] = function (n) {
                fun.call(this, n, name)
            }
        }
    }
    function pitaya(app) {
        this.app = app;
    }

    function createUId() {
        function random() {
            return Math.random().toString(36).slice(-8)
        }
        return random() + random() + random() + random()
    }
    function getAppId() {
        if (wx.getAccountInfoSync) return wx.getAccountInfoSync().miniProgram.appId;
        return void 0 === wx.getAccountInfoSync ? "" : wx.getAccountInfoSync().miniProgram.appId.split("").map(function (n) {
            return n.charCodeAt(0) + 9
        }).join("-")
    }
    function getUId() {
        try {
            var uid = wx.getStorageSync('pitaya_uid');
            if (!uid) {
                uid = createUId();
                wx.setStorageSync('pitaya_uid', uid);
            }
            return uid;
        }
        catch (e) { return 'pitaya_uid_error' }
    }
    function getQuery(x) {
        var s = '';
        if (!x) return s;
        for (var i in x) {
            s += '&' + i + '=' + x[i]
        }
        if (s.length > 0) s = s.slice(1);
        return s;
    }
    function getPath(page, query) {
        return page + (query ? '?' + query : '')
    }

    function request(data, f) {
        function fun() {
            return new Promise(function (resolve) {
                data.n = Date.now();//发出请求的时间
                wx.request({
                    url: "https://pitaya.h5-x.com/x.html",
                    data: data,
                    method: "GET",
                    success: function (r) {
                      resolve(r.statusCode == 200 ? "" : "status error")
                    },
                    fail: function (r) {
                        resolve("fail")
                    }
                })
            })
        }
        //公共参数
        data.v = v;//版本
        data.pk = pk;//pitaya key
        data.f = f;
        data.s = sid;
        data.ai = appid;
        data.u = uid;//uid
        //o.aid = appid;//小程序appid
        data.t = Date.now();//发生的时间

        openid ? (queue.push(fun), wait.concat()) : wait.push(fun)
    }
    function loginData() {
        var data = {};
        data.op = openid;
        data.lo = launchOptions;
        data.ot = openTime;
        try {
            data.b = si.brand;//设备品牌
            data.m = si.model;//设备型号
            data.pr = si.pixelRatio;//设备像素比
            data.ww = si.windowWidth;//可使用窗口宽度
            data.wh = si.windowHeight;//可使用窗口高度
            data.wl = si.language;//微信设置的语言
            data.wv = si.version;//微信版本号
            data.wp = si.platform;//客户端平台
            data.sdkv = si.SDKVersion;//客户端基础库版本
            data.sys = si.system;//操作系统及版本
        } catch (n) { }

        data.nt = networkType;//网络类型
        data.lat = lat;//纬度
        data.lng = lng;//经度

        return data;
    }
    //type 1=用户事件  2=进入页面事件 3=系统事件 4=分享事件 5=错误事件
    function sendEvent(type, name, para) {
        var data = {}
        data.pa = path;
        data.et = type;
        data.en = name || '';
        data.ep = para || '';
        request(data, 'E');
    }
    //onLaunch 小程序初始化 方法调用  lo=启动参数
    function onLaunch(lo) {
        this.pitaya = new pitaya(this);
        launchOptions = lo;
    }

    //小程序打开或者切前台
    function onAppShow(lo) {
        if (isLogin && !isShare) sendEvent(3, 'pitaya_show', lo);//切前台
        else isLogin = true;

        sendUserInfo();
    }
    //小程序切后台
    function onAppHide() {
        if (!isShare) sendEvent(3, 'pitaya_hide');
    }

    //错误监听
    function onError(x) {
        sendEvent(5, 'pitaya_error', x)
    }
    //页面加载
    function onLoad(x) {
    }
    //页面显示
  function onShow() {
        path = getPath(this.route, getQuery(this.options))
        if (!isShare) sendEvent(2, 'pitaya_page');
        else isShare = false;
    }

    function onShareAppMessage(t, x) {
        if (!t) t = {};
        if (!t.path) t.path = path;
        if (t.path.indexOf('pitaya_fo') < 0) t.path += (t.path.indexOf('?') > 0 ? '&' : '?') + 'pitaya_fo=' + sid;
        else t.path = t.path.replace(/pitaya_fo=([^&]*)/g, 'pitaya_fo=' + sid);
        sendEvent(4, 'pitaya_share', x.from)
        return t;
    }

    function sendUserInfo() {
        if (!isUserInfo && config.getUserInfo) wx.getSetting({
            success: function (x) {
                if (x.authSetting['scope.userInfo']) {//获取用户信息
                    wx.getUserInfo({
                        withCredentials: false,
                        success: function (x) {
                            ui = x.rawData;
                            request({ ui: ui }, 'UI');
                        }
                    })
                    isUserInfo = true
                }
            }
        });
    }
    function getLocation() {
        if (!isLocation && config.getLocation) wx.getSetting({
            success: function (x) {
                if (x.authSetting['scope.userLocation']) {
                    wx.getLocation({
                        success: function (x) {
                            lat = x.latitude, lng = x.longitude
                        }
                    })
                    isLocation = true
                }
            }
        });
    }

    var config = require('pitaya-config');//引用Config
    var v = '1.0.0';
    var openTime = Date.now();
    var queue = new sendQueue();
    var wait = new waitQueue();
    var pk = config.pitayaKey;//
    var sid = createUId();
    var appid = getAppId();
    var uid = getUId();
    var openid;
    var launchOptions = {};//启动参数
    var si = {};//基本信息
    var lat = '';//基本信息
    var lng = '';//基本信息
    var networkType = '';//基本信息
    var ui = {};//用户授权信息
    var isLogin = false;
    var isSendOpenId = false;
    var path;
    var isShare = false;
    var isUserInfo = false;
    var isLocation = false;

    wx.pitaya = new pitaya('');
    try { si = wx.getSystemInfoSync(); } catch (n) { }
    wx.getNetworkType({ success: function (x) { networkType = x.networkType } });
    getLocation();

    pitaya.prototype.sendOpenId = function (openId) {
        if (!isSendOpenId) {
            isSendOpenId = true;
            openid = openId;
            var data = loginData();
            request(data, 'L');
        }
    }

    pitaya.prototype.sendEvent = function (name, para) {
        if (name && name.length > 100) {
            console.log('PITAYA 事件名称不能超过100个字符！');
            return;
        }
        if (para) {
            var l = 0;
            if (para.length) l = para.length;
            else l = JSON.stringify(para).length;

            if (l > 200) {
                console.log('PITAYA 事件参数不能超过200个字符！');
                return;
            }
        }
        sendEvent(1, name, para);
    }

    return function (n) {
        !function () {
            var app = App, page = Page;
            App = function (x) {
                inject(x, 'onLaunch', onLaunch)
                inject(x, 'onShow', onAppShow)
                inject(x, 'onHide', onAppHide)
                //inject(x, 'onError', onError)
                app(x)
            }
            Page = function (x) {
                inject(x, "onLoad", onLoad)
                inject(x, "onShow", onShow)
                var e = x.onShareAppMessage;
                if (void 0 !== e && null !== e) {
                    x.onShareAppMessage = function (x) {
                        isShare = true;
                        var t = e.call(this, x);
                        return onShareAppMessage(t, x);
                    }
                }
                page(x)
            }
        }()
    }()
}