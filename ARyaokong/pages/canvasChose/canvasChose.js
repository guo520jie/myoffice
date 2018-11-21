// pages/canvasChose/canvasChose.js
const app = getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    AppImg: util.AppImg,
    imgArr: [],
    autoplay: false,
    vertical: true,
    Height: '900rpx',
    current: 0,
    uid:'',
    equipment_id: 0,
    scene_id: 0,
    countDown:0,
    countDownMsg:'00:00',
    inter:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dialog = this.selectComponent("#dialog");
    console.log(options)
    this.setData({
      uid: options.uid,
      scene_id: options.scene_id,
      equipment_id: options.equipment_id
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
    this.init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.hideLoading();
    this.dialog.hideDialog();
    if(this.data.inter){
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
  // onPullDownRefresh: function () {

  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {

  // },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },

  /**
   * 页面初始化
   */
  init:function(){
    wx.showLoading();
    let self = this;
    wx.request({
      url: util.Api.getCanvasImg,
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
            var data = [];
            for (var index in res.data.data) {
              var item = res.data.data[index];
              if (index % 2 == 0) {
                var obj = {
                  top: item
                }
                if (res.data.data[parseInt(index) + 1]) {
                  obj.bottom = res.data.data[parseInt(index) + 1];
                }
                data.push(obj)
              }
            }
            self.setData({
              imgArr: data,
              countDown:res.data.countdown
            });
            self.setTimer();
          }else{
            self.goList();
          }
        } else {
          //游戏结束，跳转到获取照片页
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
        wx.hideLoading()
      }
    })
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
  goList:function(){
    wx.reLaunch({
      url: '../list/list?uid=' + this.data.uid + '&equipment_id=' + this.data.equipment_id,
    })
  },
  /**
   * 返回上级页面
   */
  back:function(){
    wx.reLaunch({
      url: '../control/control?uid=' + this.data.uid + '&equipment_id=' + this.data.equipment_id,
    })
  },

  /**
   * 选择图片
   */
  choseImg: function (e) {
    app.globalData.canvasImg = '';
    app.globalData.canvas = e.currentTarget.dataset.canvas;
    let canvas = e.currentTarget.dataset.canvas;
    let self = this;
    wx.showLoading()
    wx.downloadFile({
      url: canvas.canvas_url, //仅为示例，并非真实的资源
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          app.globalData.canvasImg = res.tempFilePath;
          
          wx.reLaunch({
            url: '../canvas/canvas?equipment_id=' + self.data.equipment_id + "&scene_id=" + self.data.scene_id + "&canvas_id=" + canvas.id+"&uid="+self.data.uid
          })
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
      complete(){
        wx.hideLoading();
      }
    })
    
  },

  /**
   * 向上翻动
   */
  prevImg: function () {
    var current = this.data.current
    var imgArr = this.data.imgArr
    current = current > 0 ? current - 1 : imgArr.length - 1
    this.setData({
      current: current
    })
  },
  /**
   * 向下翻动
   */
  nextImg: function () {
    var current = this.data.current
    var imgArr = this.data.imgArr
    current = current < (imgArr.length - 1) ? current + 1 : 0
    this.setData({
      current: current
    })
  },
  // 倒计时00:00 tim:秒
  setTimer: function () {
    let self = this;
    var inter = setInterval(function () {
      // console.log(self.data.countDown)
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
})