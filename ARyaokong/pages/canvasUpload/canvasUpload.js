// pages/canvasUpload/canvasUpload.js
const app = getApp();
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    AppImg: util.AppImg,
    uid: '',
    equipment_id: 0,
    canvas_id: 0,
    scene_id: 0,
    countDown: 0,
    countDownMsg: '00:00',

    imgshow: app.globalData.canvasDownTemp,
    startX: '',
    startY: '',
    endX: '',
    endY: '',
    dir: '',
    widthScreen: null,
    moveData: null,
    inter: null,
    later: null,
    uploadStatus:false,
    upload:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dialog = this.selectComponent("#dialog");
    this.setData({
      uid: options.uid,
      scene_id: options.scene_id,
      canvas_id: options.canvas_id,
      equipment_id: options.equipment_id,
      imgshow: app.globalData.canvasDownTemp,
    })
    wx.getSystemInfo({
      success: res => {
        this.setData({
          widthScreen: res.screenWidth
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.uploadStatus)
    if(this.data.uploadStatus){
      // this.goCanvasImg();
      setTimeout(this.goCanvasImg,500);
    }
    this.getCountDown();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.hideLoading();
    this.dialog.hideDialog();
    if (this.data.inter) {
      clearInterval(this.data.inter);
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.hideLoading();
    this.dialog.hideDialog();
    if (this.data.inter) {
      clearInterval(this.data.inter);
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },

  /**
   * 获取倒计时数据
   */
  getCountDown: function () {
    let self = this;
    wx.showLoading()
    wx.request({
      url: util.Api.getCountDown,
      method: 'GET',
      data: {
        scene_id: this.data.scene_id,
        equipment_id: this.data.equipment_id,
        openid: app.globalData.openid,
        version: app.globalData.version
      },
      success: function (res) {
        if (res.data.code === 0) {
          if (res.data.status === 1) {
            self.setData({
              countDown: res.data.countdown
            });
            self.setTimer();
          }else{
            self.goList();
          }
        }else{
          self.goHome();
        }
        
      },
      fail:function(){
        self.dialog.showDialog({
          content: app.globalData.AppMsg.network,
          showCancel: false,
          success: function () {
            wx.navigateBack({
              delta: -1
            })
          }
        })
      },
      complete:function(){
        wx.hideLoading();
      }
    })
  },
  // 倒计时00:00 tim:秒
  setTimer: function () {
    let self = this;
    var inter = setInterval(function () {
      if (self.data.countDown <= 0) {
        clearInterval(self.data.inter);
        self.goList();
        return
      }
      var time = self.data.countDown - 1
      var msg = util.formatSecond(time);
      self.setData({
        countDown: self.data.countDown - 1,
        countDownMsg: msg
      });
    }, 1000);
    this.setData({
      inter: inter
    });
  },
  /**
   * 回到首页
   */
  goHome: function () {
    app.globalData.uid = null;
    wx.reLaunch({
      url: '../index/index',
    })
  },
  /**
   * 游戏结束，返回获取照片页
   */
  goList: function () {
    wx.reLaunch({
      url: '../list/list?uid=' + this.data.uid + '&equipment_id=' + this.data.equipment_id,
    })
  },

  handlestart: function (e) {
    this.setData({
      startX: e.changedTouches[0].pageX,
      startY: e.changedTouches[0].pageY,
    })
  },
  handleend: function (e) {
    // console.log(e)
    this.setData({
      endX: e.changedTouches[0].pageX,
      endY: e.changedTouches[0].pageY,
    })
    // 右滑
    let startX = this.data.startX
    let startY = this.data.startY
    let endX = this.data.endX
    let endY = this.data.endY
    let imgshow = this.data.imgshow
    this.getTouchData(endX, endY, startX, startY)
    if (this.data.dir == 'right') {

      // 移动
      var animation = wx.createAnimation({
        duration: 1000,
        delay: 0
      })
      animation.translate((this.data.widthScreen - 60), 0).step({ duration: 1000 })

      this.setData({ moveData: animation.export() })

      
    }
  },

  handlemove: function () {

  },

  getTouchData: function (endX, endY, startX, startY) {
    if (endX - startX > 50 && Math.abs(endY - startY) < 50) {
      this.setData({
        dir: 'right'
      })
      if(this.data.upload){
        this.init();
      }
      
    } else if (endX - startX < -50 && Math.abs(endY - startY) < 50) {
      this.setData({
        dir: 'left'
      })
    }
  },

  init:function(){
    let self = this;
    var later = setTimeout(function () {
      self.setData({
        later: null
      })
      if (self.data.uploadStatus) {
        self.goCanvasImg();
      }
    }, 1000);
    this.setData({
      later: later
    })

    wx.uploadFile({
      url: util.Api.canvasUploadImg + "?scene_id=" + this.data.scene_id + "&canvas_id=" + this.data.canvas_id + "&equipment_id=" + this.data.equipment_id + "&openid=" + app.globalData.openid,
      filePath: app.globalData.canvasDownTemp,
      name: 'file',
      success(res) {
        self.setData({
          uploadStatus: true,
          upload:false
        })
        if (!self.data.later) {
          self.goCanvasImg();
        }
      },
      fail:function(){
        self.dialog.showDialog({
          content: app.globalData.AppMsg.network,
          showCancel: false,
          success: function () {
            wx.navigateBack({
              delta: -1
            })
          }
        })
      }
    })
  },
  goCanvasImg:function(){
    wx.reLaunch({
      url: '../canvasImg/canvasImg?uid=' + this.data.uid + '&equipment_id=' + this.data.equipment_id + "&scene_id=" + this.data.scene_id,
    })
  }
})