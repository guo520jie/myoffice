// pages/canvasImg/canvasImg.js
const app = getApp();
const util = require('../../utils/util.js')
import * as zrender from '../../lib/zrender/zrender';
import * as zrhelper from '../../lib/zrender/zrender-helper';
var zr;
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
    imgurl:'',
    windowV:1,
    CanvasImgBg:'',
    inter:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dialog = this.selectComponent("#dialog");
    wx.showLoading();
    this.setData({
      uid: options.uid,
      scene_id: options.scene_id,
      equipment_id: options.equipment_id,
      imgshow: app.globalData.canvasDownTemp,
    })


    let self = this;
    wx.getSystemInfo({
      success: function (res) {
        var v = 750 / res.windowWidth;//设计稿尺寸除以  当前手机屏幕宽度
        self.setData({
          windowV: v
        });
      }
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
    let self = this;
    zr = zrhelper.createZrender('firstCanvas', this.shiftSize(684), this.shiftSize(1163));
    var bg = new zrender.Rect({
      shape: {
        x: 0,
        y: 0,
        width: this.shiftSize(684),
        height: this.shiftSize(1163),
      },
      style: {
        fill: '#FFF',
      },
    });
    zr.add(bg)
    if (this.data.CanvasImgBg){
      var image = new zrender.Image({
        style: {
          x: 0,
          y: 0,
          image: this.data.CanvasImgBg,
          width: self.shiftSize(684),
          height: self.shiftSize(1163),
        },
        z: 1
      });
      zr.add(image);
      var inter = setTimeout(this.goCanvasChose, 2000);
      this.setData({
        inter: inter
      })
    }else{
      let self = this;
      wx.showLoading();
      var downloadUrl = util.AppImg.CanvasImgBgHaiYang;
      switch (parseInt(this.data.scene_id)){
        case 7:
          downloadUrl = util.AppImg.CanvasImgBgHaiYang;
        break;
        case 8:
          downloadUrl = util.AppImg.CanvasImgBgSenLin;
        break;
        case 9:
          downloadUrl = util.AppImg.CanvasImgBgQiChe;
        break;
      }
      console.log(downloadUrl, this.data.scene_id)
      wx.downloadFile({
        url: downloadUrl,
        success(res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            self.setData({
              CanvasImgBg: res.tempFilePath
            })
            var image = new zrender.Image({
              style: {
                x: 0,
                y: 0,
                image: res.tempFilePath,
                width: self.shiftSize(684),
                height: self.shiftSize(1163),
              },
              z: 1
            });
            zr.add(image);
            
          }
          var inter = setTimeout(self.downImg, 1000);
          self.setData({
            inter: inter
          })
        },
        fail:function(){
          wx.showModal({
            content: app.globalData.AppMsg.network,
            showCancel: false,
            success: function () {
              wx.navigateBack({
                delta: -1
              })
            }
          })
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    }
    
    var imagefish = new zrender.Image({
      style: {
        x: 0,
        y: self.shiftSize(240),
        image: app.globalData.canvasDownTemp,
        width: self.shiftSize(684),
        height: self.shiftSize(684),
      },
      z: 1
    });
    zr.add(imagefish);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.hideLoading();
    this.dialog.hideDialog();
    zr.dispose();
    if(this.data.inter){
      clearTimeout(this.data.inter);
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.hideLoading();
    this.dialog.hideDialog();
    zr.dispose();
    if (this.data.inter) {
      clearTimeout(this.data.inter);
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

  shiftSize: function (w) {
    if (this.data.windowV) {
      return w / this.data.windowV;
    }
    return w;
  },
  /**
   * 回到选择页
   */
  goCanvasChose:function(){
    wx.reLaunch({
      url: '../canvasChose/canvasChose?uid=' + this.data.uid + '&equipment_id=' + this.data.equipment_id + "&scene_id=" + this.data.scene_id,
    })
  },
  /**
   * 图片保存
   */
  downImg: function () {
    let self = this;
    wx.canvasToTempFilePath({
      canvasId: 'firstCanvas',
      success: function (res) {
        wx.uploadFile({
          url: util.Api.canvasUploadTempImg + "?scene_id=" + self.data.scene_id + "&canvas_id=" + self.data.canvas_id + "&equipment_id=" + self.data.equipment_id + "&openid=" + app.globalData.openid,
          filePath: res.tempFilePath,
          name: 'file'
        })
        var inter = setTimeout(self.goCanvasChose,2000);
        self.setData({
          inter:inter
        })
      }
    })

  },
})