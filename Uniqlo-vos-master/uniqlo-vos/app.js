//app.js

import touch from "./utils/touch.js";
import api from "./api/request";
import wxApi from "./utils/wxApi";
import Event from "./utils/event";
import RecorderManager from "./utils/recorderManager";
let event = new Event();
let recorderManager = new RecorderManager();

App({
  //checkUpdateVersion 查询是否有更新
  checkUpdateVersion() {
    //判断微信版本是否 兼容小程序更新机制API的使用
    if (wx.canIUse("getUpdateManager")) {
      //创建 UpdateManager 实例
      const updateManager = wx.getUpdateManager();
      //检测版本更新
      updateManager.onCheckForUpdate(function(res) {
        console.log(res);
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //监听小程序有版本更新事件
          updateManager.onUpdateReady(function() {
            updateManager.applyUpdate();
          });
          updateManager.onUpdateFailed(function() {
            // 新版本下载失败
            wx.showModal({
              title: "已经有新版本喽~",
              content:
                "请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开哦~"
            });
          });
        }
      });
    } else {
      wx.showModal({
        title: "溫馨提示",
        content:
          "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
      });
    }
  },
  //获取是否企业微信及手机是否为iPhone X
  async getSystemInfo() {
    let { environment, model, statusBarHeight } = await wxApi.getSystemInfo();
    if (model.indexOf("iPhone X") != -1) {
      this.globalData.isIphoneX = true;
    }
    this.globalData.navHeight = statusBarHeight + 46;
    environment === "wxwork"
      ? wx.setStorageSync("isWxWork", true)
      : wx.setStorageSync("isWxWork", false);
  },

  onLaunch: async function(options) {
    wx.setStorageSync("isEnterSubmitSuccessPage", false);
    wx.setStorageSync("isWxWork", true);
    await this.getSystemInfo();
    this.checkUpdateVersion();
  },
  onShow: function() {},
  globalData: {
    token: wx.getStorageSync("token"),
    isIphoneX: false,
    recorderManager,
    event,
    navHeight: ""
  }
});
