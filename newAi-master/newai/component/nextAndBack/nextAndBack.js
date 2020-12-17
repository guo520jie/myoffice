// component/nextAndBack/nextAndBack.js
import wxModal from '../../utils/wxModal'
// import { throttle, debounce } from "../../utils/util";
import api from '../../api/request'

import RecorderManager from '../../utils/recorderManager'
let recorderManager = new RecorderManager()

const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideBack: {
      type: Boolean,
      value: false
    },
    hideMicroPhone: {
      type: Boolean,
      value: true
    },
    hideNext: {
      type: Boolean,
      value: false
    },
    nextNavigateTo: {
      type: String,
      value: ''
    },
    backNavigateTo: {
      type: String,
      value: ''
    },
    nextMsg: {
      type: String,
      value: 'next'
    },
    hiddenMsg: {
      type: Boolean,
      value: false
    },
    voiceId: {
      type: Number,
      value: 0
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    isSpeaking: false,
    buttonSwitch: false,
    sendLock: false,
    currLanguage: app.globalData.currLanguage
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back() {
      wx.navigateTo({
        url: '/pages/review/review'
      })
    },
    submit() {
      this.triggerEvent('Submit')
    },
    // 录音
    startRecord(e) {
      this.setData({
        isSpeaking: true,
        startPoint: e.touches[0],
        sendLock: false
      })
      recorderManager.start()
    },
    //结束录音
    stopRecord() {
      
      if (this.data.sendLock) {
        this.cancelRecord()
      }
      this.setData({
        isSpeaking: false
      })
      this.sendRecord()
      recorderManager.stop()
    },
    //发送语言
    sendRecord() {
      const callBack = filePath => {
        this.processFileUploadForAsr(filePath)
      }
      recorderManager.setOnStopFn(callBack)
      recorderManager.onStop()
    },
    //取消录音提示
    cancelRecord() {
      recorderManager.stop()
      wxModal.alert('取消录音')
    },
    //触摸取消
    touchCancel() {
      this.setData({
        isSpeaking: false
      })
      wxModal.loaded()
    },
    //触摸移动
    touchMove: function(e) {
      let moveLenght =
        e.touches[e.touches.length - 1].clientY - this.data.startPoint.clientY //移动距离
      if (Math.abs(moveLenght) > 50) {
        this.cancelRecord()
        this.data.sendLock = true //触发了上滑取消发送，上锁
      } else {
        this.data.sendLock = false
      }
    },
    //上传录音文件到 api.happycxz.com 接口，处理语音识别和语义，结果输出到界面
    //TODO 优化
    processFileUploadForAsr(filePath) {
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const url = `/${currentPage.route}`
      wxModal.loading()
      if (!this.data.sendLock) {
        let fromData = {
          voiceId: this.data.voiceId || ''
        }
        wx.uploadFile({
          url: api.toText,
          filePath: filePath,
          name: 'file',
          formData: fromData,
          header: {
            'content-type': 'multipart/form-data',
            Authorization: wx.getStorageSync('token')
          },
          success: res => {
            let result = JSON.parse(res.data)
            let { code, msg, data } = result
            if (code !== 200) {
              wxModal.loaded()
              wxModal.alert(msg)
            } else {
              if (url === '/pages/review/review') {
                wx.redirectTo({
                  url: `/pages/speak/speak?data=${JSON.stringify(data)}`
                })
              } else {
                this.triggerEvent('getRecordMsg', data)
                wxModal.loaded()
              }
            }
            // this.triggerEvent('getRecordMsg', data)
          },
          fail: function(res) {
            wxModal.loaded()
            wxModal.alert('服务错误..')
            console.log(res)
          }
        })
      }
    }
  }
})
