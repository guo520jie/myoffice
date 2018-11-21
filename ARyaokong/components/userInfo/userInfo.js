// components/userInfo/userInfo.js
//获取应用实例
const app = getApp()

const util = require('../../utils/util.js')

Component({
  created(){
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    if(!app.globalData.openid){
      // 登录
      let self = this;
      util.getLoginData().then(function (res) {
        console.log(res)
        if (res.data.code == 0) {
          app.globalData.SessionKey = res.data.data.session_key;
          app.globalData.openid = res.data.data.openid;
          self.getWxUserInfo();
        } else {
          var msg = res.data.msg !== undefined ? res.data.msg : (res.data.Error !== undefined ? res.data.Error : '');
          wx.showModal({
            // title: '发生了一个错误',
            content: msg,
            showCancel: false
          })
        }
      }).catch(function (res) {
        wx.showModal({
          // title: '网络错误',
          content: app.globalData.AppMsg.network,
          showCancel: false
        })
      });
    }else{
      this.getWxUserInfo();
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //取消授权
    cancel: function () {
      this.setData({
        isShow:false
      });
      this.triggerEvent('userInfoRequest', {})
    },
    getUserInfoSubmit: function (e) {
      this.setData({
        isShow: false
      });
      if(e.detail.rawData){
        var userinfo = JSON.parse(e.detail.rawData)
        this.triggerEvent('userInfoRequest', userinfo)
      }else{
        //授权失败
        this.triggerEvent('userInfoRequest', {})
      }
      wx.hideLoading();
      
    },
    getSetting: function () {
      let self = this;
      return new Promise(function (resolve, reject) {
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              resolve('1');
            } else {
              resolve('0');
            }
          },
          fail: res => {
            reject('调用判断状态失败')
          }
        });
      });
    },
    getWxUserInfo: function () {
      if (util.isNullObject(app.globalData.userInfo)) {
        // 判断是否授权
        let self = this;
        this.getSetting(self).then(function (data) {
          if (data == '0') {
            //未授权
            self.setData({
              isShow: true
            });
          } else {
            //已授权
            self.setData({
              isShow: false
            });
            wx.getUserInfo({
              success: res2 => {
                app.globalData.userInfo = res2.userInfo;
                self.triggerEvent('userInfoRequest', res2.userInfo)
              }
            })
          }
        });
      } else {
        this.triggerEvent('userInfoRequest', app.globalData.userInfo)
      }
      wx.hideLoading();
    }
  },
})
