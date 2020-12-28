const app = getApp();
const config = require('../../config.js');
const os = require('../../common/js/base/os.js');
const imath = require('../../common/js/base/math.js');
const icom = require('../../common/js/base/com.js');
const iuser = require('../../common/js/base/user.js');

//-------------------------------------------------------初始化-------------------------------------------------------
let $page, $query, SessionKey, OpenID, FromOpenID, UnionID, userAuthed, userPhoneAuthed,userData;
let PageData = {
};

Page({
    data: Object.assign({
        userInfo: {},
        hasUserInfo: false,
        loadBox: false,
        fontSize: os.fontSize,
        pageHeight: app.data.pageHeight,
        pagePadding: app.data.pagePadding,
    }, PageData), //页面的初始数据
    onLoad: function(option) {
        $page = this;
        $query = option;
        console.log('getQueryString', option);
        FromOpenID = option.scene;
        console.log('FromOpenID:' + FromOpenID);
        userData = null;
        userAuthed = false;
        userPhoneAuthed = false;
        iuser.login(function (code) {//先获取小程序的code
            iuser.code = code;
            iuser.getUserInfo(onGetUserInfo);//获取小程序的用户信息
        });
    },
    onReady: function() {
        this.bgmBtn = this.selectComponent('#bgmBtn');
    }, //监听页面初次渲染完成
    onShow: function () {}, //监听页面显示
    onHide: function() {}, //监听页面隐藏
    onUnload: function() {}, //监听页面卸载
    onPullDownRefresh: function() {}, //页面相关事件处理函数--监听用户下拉动作
    onReachBottom: function() {}, //页面上拉触底事件的处理函数
    onShareAppMessage: function () { //用户点击右上角分享
        return app.setShareData();
    },
    articleTouchmove: function () { },
    getUserInfoClick,
    getUserInfoRefuse,
    getPhoneNumberClick,
    btnStartClick,
}) //end page

//-------------------------------------------------------业务逻辑-------------------------------------------------------
//获取小程序的用户信息回调
function onGetUserInfo(succ) {
    console.log('onGetUserInfo:' + succ);
    sessionkey_get();
}//end callback

//用code换sessionkey和openid
function sessionkey_get() {
    console.log('sessionkey_get');
    icom.loadBox();
    if (config.testMode) {
        setTimeout(sessionkey_getted, 500, {
            errcode: 0,
            errmsg: 'ok',
            result: {
                OpenID: 'oQVlo5GS7czv-wT363XSXMwaRVTw',
                SessionKey: 'd4323c64-ba21-43ed-9b81-0b494b41dcc9',
            }
        });
    } else {
        icom.post('https://' + config.domain + '/api/handler.ashx?method=Login', { code: iuser.code }, sessionkey_getted);
    }//end else
}//edn func

//获得sessionkey和openid
function sessionkey_getted(res) {
    console.log(res);
    if (res.errcode == 0 || res.errcode == 200) {
        let result = res.result;
        SessionKey = result.SessionKey;
        console.log('SessionKey:' + SessionKey);
        icom.storage('SessionKey', SessionKey);
        OpenID = result.OpenID;
        console.log('OpenID:' + OpenID);
        icom.storage('OpenID', OpenID);
        if(wx.pitaya) wx.pitaya.sendOpenId(OpenID);//初始化pitaya
        userInfo_get();
        if (FromOpenID){
            console.log('通过分享打开首页');
            if(FromOpenID==OpenID){
                console.log('自己打开自己分享的页面')
            }//edn if
            else{
                console.log('第三者打开分享的页面');
            }//end else
        }//edn if
        else{
            console.log('直接打开首页');
        }
    } //end if
    else {
        console.error(res.errmsg);
    } //end else
    icom.loadBox(false);
} //edn func

//-------------------------------------user info get
function userInfo_get() {
    console.log('userInfo_get');
    if (config.testMode) {
        setTimeout(userInfo_getted, 200, {
            errcode: 0,
            errmsg: 'success',
            result: config.userInfoTest
        });
    } else {
        icom.post('https://' + config.domain + '/api/handler.ashx?method=GetUserInfo', { SessionKey: SessionKey }, userInfo_getted);
    }//end else
}//edn func

function userInfo_getted(res) {
    console.log('userInfo_getted', res);
    icom.loadBox(false);
    if (res.errcode == 0) {
        userData = res.result;
        $page.setData({ 
            userData, 
        });
        if(userData.HeadImage) icom.storage('HeadImage', userData.HeadImage);
        if(userData.NickName) icom.storage('NickName', userData.NickName);
        if(userData.Phone) icom.storage('NickName', userData.Phone);
        auth_detect(init_handler);
    } //edn if
    else {
        console.error(res.errmsg);
        icom.alert(res.errmsg);
    }//end else
}//edn func

function auth_detect(callback=function(){}){
    wx.getSetting({
        success(res) {
            if (userData.NickName && userData.NickName != '' && res.authSetting["scope.userInfo"]) {
                console.log('已经授权获得用户昵称和头像')
                userAuthed = true;
                if (userData.Phone & userData.Phone!='') {
                    userPhoneAuthed=true;
                    console.log('已经授权获得用户手机号码')
                } else {
                    userPhoneAuthed=false;
                    console.log('尚未授权获得用户手机号码')
                }//end else
            } //edn if
            else {
                console.log('尚未授权获得用户昵称和头像');
                userAuthed = false;
                userPhoneAuthed=false;
            } //end else
            console.log('userAuthed:'+userAuthed);
            console.log('userPhoneAuthed:'+userPhoneAuthed);  
            $page.setData({ 
                userAuthed,
                userPhoneAuthed,
            });
            callback();
        }
    });
}//edn func

//---------------------------------------------------------------init------------------------------------------------------------
function init_handler(){
    console.log('init_handler');
    index_handler();
}//edn func

//---------------------------------------------------------------index------------------------------------------------------------
function index_handler(){
    console.log('index_handler');
    icom.show('sectionIndexShow','sectionIndexFade');
}//edn func

function btnStartClick(e) {
    if (e) app.monitorAdd(e);//添加监测
    icom.hide('sectionIndexShow');
    if(userAuthed){
        if(userPhoneAuthed) user_next();
        else phone_hander();
    }else{
        login_hander();
    }//end else
}//edn event

function user_next(){
    icom.getUrl('../page/page');
}//edn func

//--------------------------------------------------------获取用户昵称、头像的授权------------------------------------------------------------
function login_hander() {
    icom.show('loginShow');
}//edn func

function getUserInfoClick(e) {//获得用户的微信个人信息按钮事件，如微信昵称、微信头像地址，需要通过点击授权按钮获得
    console.log('e.detail.errMsg:' + e.detail.errMsg);
    if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
        console.log('用户拒绝授权')
        getUserInfoRefuse();
    } else {
        console.log('用户允许授权')
        userAuthed = true;
        iuser.parse(e.detail);
        icom.hide('loginShow');
        userInfo_send();
    }
}//end event

//拒绝授权按钮事件
function getUserInfoRefuse(e) {
    console.log('用户拒绝授权，未授权状态下打开排行榜，功能受限');
    //在未授权状态下进行下一步业务逻辑
    icom.hide('loginShow');
    index_handler();
}//edn event

//-----------userInfo send
function userInfo_send() {
    console.log('userInfo_send');
    icom.loadBox();
    if (config.testMode) {
        setTimeout(userInfo_sended, 200, {
            errcode: 0,
            errmsg: 'success',
            result: config.userInfoTest
        });
    } else {
        icom.post('https://' + config.domain + '/api/handler.ashx?method=SaveUserInfo', { SessionKey: SessionKey, encryptedData: iuser.encryptedData, iv: iuser.iv }, userInfo_sended);
    }//end else
}//end func

function userInfo_sended(res) {
    console.log('userInfo_sended', res);
    icom.loadBox(false);
    if (res.errcode == 0) {
        userData = res.result;
        $page.setData({ 
            userData, 
        });
        if(userData.HeadImage) icom.storage('HeadImage', userData.HeadImage);
        if(userData.NickName) icom.storage('NickName', userData.NickName);
        if(userData.Phone) icom.storage('NickName', userData.Phone);
        auth_detect(function(){
            if(userPhoneAuthed) user_next();
            else phone_hander();
        });
    } //edn if
    else {
        console.error(res.errmsg);
        icom.alert(res.errmsg);
    }//end else
}//edn func

//--------------------------------------------------------获取用户手机号的授权------------------------------------------------------------
function phone_hander() {
    icom.hide('loginShow');
    icom.show('phoneShow');
}//edn func

function getPhoneNumberClick(e) {
    console.log('getPhoneNumber', e.detail);
    if (e.detail.iv && e.detail.encryptedData) {
        console.log('getPhoneNumber succ');
        phone_send(e.detail.iv, e.detail.encryptedData);
    }//edn if
    else {
        console.log('getPhoneNumber deny');
        //下一步业务逻辑
        icom.alert('不授权手机号无法继续体验')
    }//edn else
}//end func

//-----------phone send
function phone_send(iv, encryptedData) {
    console.log('phone_send');
    icom.loadBox();
    if (config.testMode) {
        setTimeout(phone_sended, 200, {
            errcode: 0,
            errmsg: 'success',
            result: 139333333,
        });
    } else {
        icom.post('https://' + config.domain + '/Api/Handler.ashx?method=PhoneNumber', { SessionKey: SessionKey, encryptedData: encryptedData, iv: iv }, phone_sended);
    }//end else
}//end func

function phone_sended(res) {
    console.log('phone_sended', res);
    icom.loadBox(false);
    if (res.errcode == 0) {
        icom.hide('phoneShow');
        //下一步业务逻辑
        userPhoneAuthed=true;
        userData.Phone=res.result;
        $page.setData({
            userPhoneAuthed,
            userData, 
        });
        user_next();
    } //edn if
    else {
        console.error(res.errmsg);
        icom.alert(res.errmsg);
    }//end else
}//end func

