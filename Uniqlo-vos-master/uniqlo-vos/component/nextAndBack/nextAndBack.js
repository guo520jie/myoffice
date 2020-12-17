// component/nextAndBack/nextAndBack.js
import wxModal from "../../utils/wxModal";
import { throttle, debounce } from "../../utils/util";
import api from "../../api/request";

const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideBack: {
      type: Boolean,
      value: true
    },
    hideMicroPhone: {
      type: Boolean,
      value: false
    },
    hideNext: {
      type: Boolean,
      value: true
    },
    nextNavigateTo: {
      type: String,
      value: ""
    },
    backNavigateTo: {
      type: String,
      value: ""
    },
    nextMsg: {
      type: String,
      value: "next"
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    isSpeaking: false,
    buttonSwitch: false,
    sendLock: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back() {
      let { buttonSwitch } = this.data;
      if (!buttonSwitch) {
        this.setData({
          buttonSwitch: true
        });
        this.triggerEvent("Back");
        setTimeout(() => {
          this.setData({
            buttonSwitch: false
          });
        }, 1000);
      }
    },
    next() {
      let { buttonSwitch } = this.data;
      if (!buttonSwitch) {
        this.setData({
          buttonSwitch: true
        });
        this.triggerEvent("Next");
        setTimeout(() => {
          this.setData({
            buttonSwitch: false
          });
        }, 1000);
      }
    },
    // 录音
    startRecord(e) {
      this.setData({
        isSpeaking: true,
        startPoint: e.touches[0],
        sendLock: false
      });
      console.log("开始录音");
      app.globalData.recorderManager.start();
    },
    //结束录音
    stopRecord() {
      if (this.data.sendLock) {
        this.cancelRecord();
      }
      this.setData({
        isSpeaking: false
      });
      this.sendRecord();
      app.globalData.recorderManager.stop();
    },
    //发送语言
    sendRecord() {
      const callBack = filePath => {
        this.processFileUploadForAsr(filePath);
      };
      app.globalData.recorderManager.setOnStopFn(callBack);
      app.globalData.recorderManager.onStop();
    },
    //取消录音提示
    cancelRecord() {
      app.globalData.recorderManager.stop();
      wxModal.alert("取消录音");
    },
    //触摸取消
    touchCancel() {
      this.setData({
        isSpeaking: false
      });
      wxModal.loaded();
    },
    //触摸移动
    touchMove: function(e) {
      let moveLenght =
        e.touches[e.touches.length - 1].clientY - this.data.startPoint.clientY; //移动距离
      if (Math.abs(moveLenght) > 50) {
        this.cancelRecord();
        this.data.sendLock = true; //触发了上滑取消发送，上锁
      } else {
        this.data.sendLock = false;
      }
    },
    //上传录音文件到 api.happycxz.com 接口，处理语音识别和语义，结果输出到界面
    //TODO 优化
    processFileUploadForAsr(filePath) {
      console.log(filePath, "filePath");
      wxModal.loading();
      if (!this.data.sendLock) {
        let fromData = {};
        wx.uploadFile({
          url: api.toText,
          filePath: filePath,
          name: "file",
          formData: fromData,
          header: {
            "content-type": "multipart/form-data",
            Authorization: wx.getStorageSync("token")
          },
          success: res => {
            let result = JSON.parse(res.data);
            // this.triggerEvent("getRecordMsg", 11111);
            if (result.resp_code === 1) {
              wxModal.loaded();
              wxModal.alert(result.resp_msg);
            } else {
              this.triggerEvent("getRecordMsg", result.datas);
              wxModal.loaded();
            }
          },
          fail: function(res) {
            wxModal.loaded();
            wxModal.alert("服务错误..");
            console.log(res);
          }
        });
      }
      setTimeout(() => {
        wxModal.loaded();
      }, 1000);
    }
  }
});
