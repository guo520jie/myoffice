const iuser = function () {
    let user = {
        code: null,
        SessionKey: null,
        OpenID: null,
        userInfo: null
    };

    /**
     * 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
     */
    user.getSetting = function (callback = function () {}) {
        wx.getSetting({
            success(res) {
                console.log(res.authSetting);
                if (res.authSetting["scope.userInfo"]) {
                    console.log('小程序已经授权');
                    callback(true);
                } //edn if
                else {
                    console.log('小程序未授权');
                    callback(false);
                } //end else
            }
        });
    }

    /**
     * 登录 （如果code过期了 可以调用这个放发重新获取）
     * @params {Function} callback 回调函数
     */
    user.login = function (callback = function () {}) {
        wx.login({
            success: (res) => {
                console.log('user code:', res.code);
                user.code = res.code;
                callback(res.code);
            },
            fail: (res) => {
                console.warn('wx login fail', res);
            }
        });
    }

    /**
     * 初始化
     * @params {Function} callback 回调函数
     */
    user.getUserInfo = function (callback = function () {}) {
        let pages = getCurrentPages();
        let page = pages[pages.length - 1];
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: function (res) {
                            console.log('wx.getUserInfo succ')
                            user.parse(res);
                            page.setData({
                                hasUserInfo: true,
                                userInfo: user.userInfo
                            });
                            callback(true);
                        },
                        fail: getUserInfo_fail
                    });
                } //end if
                else getUserInfo_fail();
            } //end succ
        });
        function getUserInfo_fail() {
            console.log('wx.getUserInfo fail');
            page.setData({
                hasUserInfo: false,
                userInfo: null,
            });
            callback(false);
        } //end func
    }

    /**
     * 解析用户数据
     */
    user.parse = function (data) {
        console.log('user', data);
        this.encryptedData = data.encryptedData;
        this.iv = data.iv;
        this.rawData = data.rawData;
        this.signature = data.signature;
        this.userInfo = data.userInfo;
        if (this.userInfo.avatarUrl == '') {
            this.userInfo.avatarUrl = 'https://ugc.elixir.com.cn/ugc/public/index/images/morenheadimg.png';
        } //edn if
        console.log('user info', this.userInfo);
    }

    return user;
};

module.exports = iuser();