const config = require('config.js');
const iuser = require('common/js/base/user.js');
const os = require('common/js/base/os.js');
const imath = require('common/js/base/math.js');
const icom = require('common/js/base/com.js');

require('utils/pitaya-sdk.js'); //自家监测
require('utils/mtj-wx-sdk.js'); //百度监测
// require('utils/ald-stat.js'); //阿拉丁监测

App({
    onLaunch: function (options) {
        console.log('app onLaunch', options);
        //自定义navigationBar高度计算
        let navigationHeight = config.navigationStyle == 'custom' ? wx.getMenuButtonBoundingClientRect().height  : 0;
        let navigationPadding = config.navigationStyle == 'custom' ? wx.getMenuButtonBoundingClientRect().top : 0;
        this.data.pageHeight = 'calc( 100%' + ' - ' + (navigationHeight + navigationPadding) + 'px' + ' )';
        this.data.pagePadding = config.navigationStyle == 'custom' ? 0 : (navigationHeight + navigationPadding) + 'px';
        this.data.navigationHeight = navigationHeight + 'px';
        this.data.navigationPadding = navigationPadding + 'px';
        this.data.navigationShow = config.navigationStyle == 'custom';
    },
    initApp: function (needUserInfo, cb) { //初始化
        iuser.login(() => { //用户登录获取code 如果需要用户信息 则去拉取用户信息
            if (needUserInfo) {
                this.initUserInfo(cb);
            } else {
                cb();
            }
        });
    },
    data: { //全局参数
    },
    setPageData: function (data) {
        let pages = getCurrentPages();
        let page = pages[pages.length - 1];
        if (page) {
            page.setData(data);
        } //edn if
    },
    shareSuccess: function () {},
    shareFail: function () {},
    setShareData: function (options) {
        let defaults = {
            title: config.shareData.title,
            path: config.shareData.path,
            imageUrl: config.shareData.imageUrl,
            onSuccess: this.shareSuccess,
            onFail: this.shareFail,
            onComplete: this.shareComplete,
        };
        let opts = {};
        Object.assign(opts, defaults, options);
        console.log(opts);
        return {
            title: opts.title,
            path: opts.path,
            imageUrl: opts.imageUrl,
            success: function (res) {
                console.log(res.errMsg);
                opts.onSuccess();
            },
            fail: function (res) {
                console.log(res.errMsg);
                opts.onFail();
            },
            complete: function (res) {
                console.log(res.errMsg);
                opts.onComplete();
            }
        };
    },
    onShow: function () {
        console.log('app onShow');
        let _this = this;
        let pages = getCurrentPages();
        let page = pages[pages.length - 1];
        if (config.bgm && config.bgm != '') {
            if (this.bgm) {
                console.log('bgmPausedByUser:' + this.bgm.pausedByUser);
                if (!this.bgm.pausedByUser) {
                    this.bgm.audio.play();
                } //edn if
            } //edn if
            else {
                this.bgm = require('common/js/base/bgm.js');
                this.bgm.init(config.bgm);
            } //edn else
        } //edn if
    },
    onHide: function () {
        console.log('app onHide');
        let _this = this;
        let pages = getCurrentPages();
        let page = pages[pages.length - 1];
        if (config.bgm && config.bgm != '') {
            if (this.bgm) {
                if (!this.bgm.pausedByUser) {
                    this.bgm.audio.pause();
                } //edn if
            } //edn if
        } //edn if
    },
    tabClick: function (e) { //自定义tabbar点击事件
        console.log(e.target)
        var id = parseInt(e.target.dataset.id.substr(3));
        let url = '../' + config.tabData[id].path + '/' + config.tabData[id].path;
        icom.getUrl(url);
    },
    headImageDownload: function (callback = function () {}) { //下载微信头像到本地，方便合成入canvas
        let _this = this;
        if (iuser.userInfo.avatarUrl && icom.storage('HeadImageLocal') != '') {
            if (icom.storage('HeadImageLocal') != '') {
                console.log('headImage need download');
                icom.imageDownload(iuser.userInfo.avatarUrl, head_download_complete);
            } else {
                console.log('headImage has been storaged');
                callback(icom.storage('HeadImageLocal'));
            }
        } else {
            console.log('user headImage has not getted');
            callback(null);
        }

        function head_download_complete(src) {
            console.log('headImage file path:' + src[0]);
            icom.storage('HeadImageLocal', src[0]);
            _this.data.HeadImageLocal = src[0];
            callback(src[0]);
        } //edn func
    },
    closePop: function (e) { //关闭弹窗的通用方法
        if (e) this.monitorAdd(e);
        let data = e.currentTarget.dataset;
        if (data) {
            let id = data.id;
            console.log(id);
            // let fade = 'fade' + id.substr(3);
            // console.log(fade);
            // icom.hide(id, fade);
            icom.hide(id);
        } //end if
    },
    monitorAdd: function (e) { //添加监测
        if (e.currentTarget.dataset.monitor) this.monitor(e.currentTarget.dataset.monitor);
    },
    monitor: function (label = '', data = {}) {
        console.log('监测事件名称：' + label);
        if (this.aldstat) this.aldstat.sendEvent(label, data);
        if (this.mtj) this.mtj.trackEvent(label, data);
        if (wx.pitaya) wx.pitaya.sendEvent(label, 1);
        if (this.setGaEvent) this.setGaEvent({
            label: label
        });
    },
})