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
    onLoad: function (option) {
        $page = this;
        $query = option;
        console.log('queryString', option);
        SessionKey = icom.storage('SessionKey');
        console.log('SessionKey:' + SessionKey);
        OpenID = icom.storage('OpenID');
        console.log('OpenID:' + OpenID);
        FromOpenID = icom.storage('FromOpenID');
        FromOpenID = FromOpenID == '' ? null : FromOpenID;
        console.log('FromOpenID:' + FromOpenID);
        iuser.getUserInfo(init_handler);
    },
    onReady: function () {
        this.bgmBtn = this.selectComponent('#bgmBtn');
    }, //监听页面初次渲染完成
    onShow: function () { }, //监听页面显示
    onHide: function () { }, //监听页面隐藏
    onUnload: function () { }, //监听页面卸载
    onPullDownRefresh: function () { }, //页面相关事件处理函数--监听用户下拉动作
    onReachBottom: function () { }, //页面上拉触底事件的处理函数
    onShareAppMessage: function () { //用户点击右上角分享
        return app.setShareData();
    },
    articleTouchmove: function () { },
    navigationBack: function (option) {
        console.log('navigationBack:',option.detail)
        icom.getUrl(option.detail.url);
    },
}) //end page

//-------------------------------------------------------业务逻辑-------------------------------------------------------

//---------------------------------------------------------init
function init_handler(authed) {
    console.log('init_handler');
} //end init