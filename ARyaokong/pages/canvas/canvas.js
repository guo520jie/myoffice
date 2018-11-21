// pages/canvas/canvas.js
const app = getApp();
const util = require('../../utils/util.js');
import * as zrender from '../../lib/zrender/zrender';
import * as zrhelper from '../../lib/zrender/zrender-helper';
var zr;
var zrBgImg;
var zrBgColor;
var zrTopImg;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    AppImg: util.AppImg,
    uid: '',
    equipment_id: 0,
    canvas_id:0,
    scene_id: 0,
    countDown: 0,
    countDownMsg: '00:00',
    canvasWidth:576,
    canvasHeight: 940,
    createCanvasWidth: 300,
    secondCanvasShow: 'none',
    showBtnSave:'none',
    inter:'',
    btnInter:'',

    change:false,


    state: 0,//默认画笔颜色
    windowV: 0,//用于计算画布尺寸

    drowline: '1',
    cirflag: 'cir',
    fillColor: '#f00',
    topstate: '',

    remmberColor: '#f00',
    arrbgcolor: ['#f00', '#ff6800', '#ffc600', '#8bf801', '#09c300', '#00c4ff', '#0044ff', '#4800ff', '#ff42a7', '#ffdbb9', '#802700', '#000'],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dialog = this.selectComponent("#dialog");
    app.globalData.canvasDownTemp = '';
    console.log(options, app.globalData.canvasImg)
    this.setData({
      uid: options.uid,
      scene_id: options.scene_id,
      canvas_id:options.canvas_id,
      equipment_id: options.equipment_id
    });
    let self = this;
    wx.getSystemInfo({
      success: function (res) {
        var v = 750 / res.windowWidth;//设计稿尺寸除以  当前手机屏幕宽度
        self.setData({
          windowV: v
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let self = this;
    var btnInter = setTimeout(function(){
      self.setData({
        showBtnSave:"block"
      })
    },3000);
    this.setData({
      btnInter: btnInter
    })
    var canvasWidth = this.shiftSize(this.data.canvasWidth);
    var canvasHeight = this.shiftSize(this.data.canvasHeight);
    zrTopImg = new zrender.Image({
      style: {
        x: 0,
        y: 0,
        image: app.globalData.canvasImg,
        width: canvasWidth,
        height: canvasHeight,
      },
      z: 1
    });
    zrBgColor = new zrender.Rect({
      shape: {
        x: 0,
        y: 0,
        width: canvasWidth,
        height: canvasHeight,
      },
      style: {
        fill: '#FFF',
      },
    });
    this.init();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
    // if (this.data.btnInter) {
    //   clearInterval(this.data.btnInter);
    // }
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
    if (this.data.btnInter) {
      clearInterval(this.data.btnInter);
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
   * 画布尺寸修改
   */
  shiftSize: function (w) {
    if (this.data.windowV) {
      return w / this.data.windowV;
    }
    return w;
  },
  init:function(){
    var canvasWidth = this.shiftSize(this.data.canvasWidth);
    var canvasHeight = this.shiftSize(this.data.canvasHeight);
    zr = zrhelper.createZrender('firstCanvas', canvasWidth, canvasHeight);
    zr.add(zrBgColor);
    zr.add(zrTopImg);
    if(zrBgImg){
      zr.add(zrBgImg);
    }
    
    console.log("init")
  },
  /**
   * 返回上级页面
   */
  back: function () {
    wx.reLaunch({
      url: '../canvasChose/canvasChose?uid=' + this.data.uid + '&equipment_id=' + this.data.equipment_id + "&scene_id=" + this.data.scene_id,
    })
  },
  /**
   * 桃心
   */
  drawCircle: function (x, y) {
    let self = this;
    var tenDeg = Math.PI / 2;//角度/360*2PI 
    // var origin = tenDeg;
    var circle = new zrender.Heart({
      shape: {
        cx: x,
        cy: y,
        width: 18,
        height: 21
      },
      style: {
        fill: self.data.fillColor,
        // stroke: '#F00'
      },
      // rotation: [tenDeg, 5, 55]
      // rotation: 90
    });
    if (zr) {
      zr.add(circle);
    }

  },
  /**
   * 圆
   */
  drawImage: function (x, y) {
    let self = this;
    var circle = new zrender.Circle({
      shape: {
        cx: x,
        cy: y,
        r: 15
      },
      style: {
        fill: self.data.fillColor
      }
    })
    zr.add(circle);
  },
  /**
   * 星星
   */
  drawStar: function (x, y) {
    let self = this;
    var star = new zrender.Star({
      shape: {
        cx: x,
        cy: y,
        r: 21,
        n: 7
      },
      style: {
        fill: self.data.fillColor
      }
    });
    zr.add(star)
  },
  /**
   * 触摸开始
   */
  touchStar: function (e) {
    this.setData({
      change: true
    })
    this.touchMove(e)
  },
  /**
   * 触摸移动
   */
  touchMove: function (e) {
    var x = e.changedTouches[0].x
    var y = e.changedTouches[0].y
    if (this.data.drowline == '1') {
      this.drawImage(x, y);
    } else if (this.data.drowline == '2') {
      this.drawStar(x, y)
    } else if (this.data.drowline == '3') {
      this.drawCircle(x, y)
    }
  },
  /**
   * 触摸结束
   */
  touchEnd: function (e) {
    this.touchMove(e);
  },
  /**
   * 橡皮擦点击事件
   */
  clearcolor: function (e) {
    this.setData({
      fillColor: '#fff',
      topstate: 'top4',
      cirflag: ''
    })
    this.dispose();
  },
  /**
   * 圆形画笔点击事件
   */
  drowcircle: function () {
    // console.log('ssss')
    this.setData({
      drowline: '1',
      topstate: 'top1',
      fillColor: this.data.remmberColor,
      cirflag: 'cir'
    })
    this.dispose();
    // console.log(this.data.drowline)
  },
  /**
   * 星型画笔点击事件
   */
  drowstar: function () {
    this.setData({
      drowline: '2',
      topstate: 'top2',
      fillColor: this.data.remmberColor,
      cirflag: 'star'
    })
    this.dispose();
  },
  /**
   * 心型画笔点击事件
   */
  drowhart: function () {
    this.setData({
      drowline: '3',
      topstate: 'top3',
      fillColor: this.data.remmberColor,
      cirflag: 'hart'
    })
    this.dispose();
  },
  /**
   * 画笔颜色点击事件
   */
  changebg: function (e) {
    console.log(e.currentTarget.dataset.index)
    let ind = e.currentTarget.dataset.index
    this.setData({
      fillColor: this.data.arrbgcolor[ind],
      remmberColor: this.data.arrbgcolor[ind],
      state: ind,
      topstate: '',
    });
    this.dispose();
  },
  /**
   * 释放内存，防止图画过多时变卡
   */
  dispose:function(){
    console.log(this.data.change)
    // if (!this.data.change) {
    //   return
    // }
    this.setData({
      change: false
    })
    if (zr) {
      console.log("dispose")
      // this.disposeInit();
    }
  },
  disposeInit: function () {
    console.log("disposeInit")
    let canvasWidth = this.shiftSize(this.data.canvasWidth);
    let canvasHeight = this.shiftSize(this.data.canvasHeight);
    let self = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: canvasWidth,
      height: canvasHeight,
      canvasId: 'firstCanvas',
      success(res) {
        console.log("ssss111");
        zr.dispose();
        zrBgImg = new zrender.Image({
          style: {
            x: 0,
            y: 0,
            image: res.tempFilePath,
            width: canvasWidth,
            height: canvasHeight,
          }
        });
        self.init();
        console.log("ssss");
      }
    })
  },
  /**
   * 生成图片
   */
  downImg: function () {
    zr.dispose();
    var canvasWidth = this.shiftSize(this.data.canvasWidth);
    var canvasHeight = this.shiftSize(this.data.canvasHeight);
    // wx.showLoading({
    //   mask: true
    // });
    var startX = 0;
    var startY = 0;
    var width = canvasWidth;
    var height = canvasHeight;
    var destWidth = canvasWidth;
    var destHeight = canvasHeight;
    if (app.globalData.canvas.status != 1) {//正方形图
      startY = this.shiftSize((this.data.canvasHeight - this.data.canvasWidth) / 2);
      height = this.shiftSize(this.data.canvasWidth);
      destWidth = this.data.createCanvasWidth;
      destHeight = this.data.createCanvasWidth;
    }
    let self = this;
    wx.canvasToTempFilePath({
      x: startX,
      y: startY,
      width: width,
      height: height,
      // destWidth: destWidth,
      // destHeight: destHeight,
      canvasId: 'firstCanvas',
      success: (res) => {
        if (app.globalData.canvas.status == 1) {
          //将长方形图修改为正方形
          self.updateImg(res.tempFilePath);
        } else {
          //原生为正方形，直接上传
          app.globalData.canvasDownTemp = res.tempFilePath;
          self.uploadImg(res.tempFilePath)
        }

      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 将矩形图修改为正方形图
   */
  updateImg: function (tempFilePath) {
    var canvasWidth = this.shiftSize(this.data.canvasWidth);
    var canvasHeight = this.shiftSize(this.data.canvasHeight);
    this.setData({
      secondCanvasShow: 'block'
    })
    let secondCanvas = zrhelper.createZrender('secondCanvas', canvasWidth, canvasWidth);
    var secondX = this.shiftSize(this.data.canvasWidth * (1 - this.data.canvasWidth / this.data.canvasHeight) / 2);
    var bg = new zrender.Rect({
      shape: {
        x: 0,
        y: 0,
        width: canvasWidth,
        height: canvasHeight,
      },
      style: {
        fill: '#FFF',
      },
    });
    secondCanvas.add(bg);
    var image = new zrender.Image({
      style: {
        x: secondX,
        y: 0,
        image: tempFilePath,
        width: this.shiftSize(this.data.canvasWidth * (this.data.canvasWidth / this.data.canvasHeight)),
        height: canvasWidth,
      },
    });
    secondCanvas.add(image);
    let self = this;
    setTimeout(function () {
      secondCanvas.dispose();
      wx.canvasToTempFilePath({
        canvasId: 'secondCanvas',
        x: 0,
        y: 0,
        // destWidth: self.data.createCanvasWidth,
        // destHeight: self.data.createCanvasWidth,
        success: (res) => {
          app.globalData.canvasDownTemp = res.tempFilePath;
          self.uploadImg(res.tempFilePath)
        },
        fail: function (res) {
          console.log(res)
        }
      });
    }, 500);
  },
  /**
   * 上传图片
   */
  uploadImg: function (tempFilePath) {
    wx.reLaunch({
      url: '../canvasUpload/canvasUpload?equipment_id=' + this.data.equipment_id + "&scene_id=" + this.data.scene_id + "&canvas_id=" + this.data.canvas_id + "&uid=" + this.data.uid + "&countdown=" + this.data.countDown
    })
    // wx.uploadFile({
    //   url: util.Api.canvasUploadImg +"?scene_id="+this.data.scene_id+"&canvas_id="+this.data.canvas_id+"&equipment_id="+this.data.equipment_id+"&openid="+app.globalData.openid,
    //   filePath: tempFilePath,
    //   name: 'file',
    //   success(res) {
    //     console.log(res)
    //   }
    // })
  },
  /**
   * 获取倒计时数据
   */
  getCountDown:function(){
    wx.showLoading()
    let self = this;
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
            //游戏结束，跳转到获取照片页
            self.goList();
          }
        }else{
          self.goHome();
        }
      },
      fail:function(){
        wx.showModal({
          content: app.globalData.AppMsg.network,
          showCancel:false,
          success:function(){
            wx.navigateBack({
              delta: -1
            })
          }
        })
      },
      complete: function () {
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
})