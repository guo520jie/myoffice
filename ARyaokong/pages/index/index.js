//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')

Page({
  data: {
    swiperIndex:0,
    userInfo: app.globalData.userInfo,
    uid:app.globalData.uid,
    AppImg: util.AppImg,
    AppMsg: {},
    
    Height:'413rpx',
    imgData:[],
    
    autoplay:true,
    swiperInd:''
  },
  /**
   * 截取path的code参数
   */
  getPathCode: function (path) {
    var arr = path.split("?scene=");
    if (arr.length != 2) {
      return '';
    }
    return arr[1];
  },
  //事件处理函数
  bindViewTap: function () {
    let self = this;
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
        if (res.path) {
          var code = self.getPathCode(res.path);
          if (code) {
            app.globalData.uid = code
            self.setData({
              uid: code
            })
            self.getUid();
          } else {
            self.dialog.showDialog({
              content: app.globalData.AppMsg.scanPath,
              showCancel: false
            })
            // wx.showModal({
            //   // title: '温馨提示',
            //   content: app.globalData.AppMsg.scanPath,
            //   showCancel: false
            // })
          }
        } else if (res.result) {
          if(res.result.length<=50){
            app.globalData.uid = res.result
            self.setData({
              uid: res.result
            })
            self.getUid();
          } else {
            self.dialog.showDialog({
              content: app.globalData.AppMsg.scanResult,
              showCancel: false
            })
            // wx.showModal({
            //   // title: '温馨提示',
            //   content: app.globalData.AppMsg.scanResult,
            //   showCancel: false
            // })
          }
          
        } else {
          self.dialog.showDialog({
            content: app.globalData.AppMsg.scanNull,
            showCancel: false
          })
          // wx.showModal({
          //   // title: '温馨提示',
          //   content: app.globalData.AppMsg.scanNull,
          //   showCancel: false
          // })
        }
        
      }
    })
  },
// change
  swiperChange:function(e){
    this.setData({
      swiperIndex:e.detail.current
    })
    // console.log(e.detail.current)
  },


  onReady:function(){
  },
  onHide:function(){
    this.dialog.hideDialog();
  },
  onUnload:function(){
    this.dialog.hideDialog();
  },
  onShow: function () {
    console.log('index show')
    this.setData({
      AppMsg: app.globalData.AppMsg
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.dialog = this.selectComponent("#dialog");
    console.log('index load', this.data.uid, app.globalData.uid)
    if (!util.isNullObject(app.globalData.userInfo)) {
      console.log("程序已在后台运行")
      // this.setData({
      //   uid: app.globalData.uid
      // });
      this.getUid();
    }

    this.getSwiper();
  },
  //获取轮播数据
  getSwiper:function(){
    wx.showLoading();
    let self = this;
    wx.request({
      url: util.Api.getIndexSwiper,
      method: 'GET',
      data: {
        version: app.globalData.version
      },
      success: function (res) {
        console.log(res.data.data)
        if (res.data.code === 0) {
          self.setData({
            imgData:res.data.data
          })

        }
      },
      fail: function (res) {
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
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  //获取设备参数
  getUid: function () {
    console.log('getUid', this.data.uid,app.globalData.uid)
    let self = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    if (app.globalData.uid) {
      wx.request({
        url: util.Api.checkUid,
        method: 'GET',
        data: {
          uid: app.globalData.uid,
          openid:app.globalData.openid,
          userInfo: app.globalData.userInfo,
          version: app.globalData.version
        },
        success: function (res) {
          if (res.data.code === 0) {
            wx.reLaunch({
              url: '../control/control?uid=' + self.data.uid + '&equipment_id=' + res.data.data.id,
            })
          }else{
            if (res.data.data !== undefined) {
              self.dialog.showDialog({
                content: res.data.msg,
                showCancel: false,
                success: function (e) {
                  if (e.confirm) {
                    if (res.data.status == 2) {
                      wx.reLaunch({
                        url: '../list/list?uid=' + self.data.uid + '&equipment_id=' + res.data.data.id,
                      })
                    } else {
                      app.globalData.canvasImgData  = [];
                      wx.reLaunch({
                        url: '../control/control?uid=' + self.data.uid + '&equipment_id=' + res.data.data.id,
                      })
                    }
                  }
                }
              })
              return
            }
            var msg = res.data.msg!==undefined?res.data.msg:(res.data.Error!==undefined?res.data.Error:'');
            console.log(msg, self.dialog)
            self.dialog.showDialog({
              content:msg,
              showCancel:false,
            })
            console.log(msg)
            
          }
        },
        fail: function (res) {
          console.log(res)
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
    }else{
      //没有uid登录
      wx.request({
        url: util.Api.checkUser,
        method: 'GET',
        data: {
          openid: app.globalData.openid,
          userInfo: app.globalData.userInfo,
          version: app.globalData.version
        },
        success: function (res) {
          if (res.data.code === 0) {
            if (res.data.status == 2) {
              wx.reLaunch({
                url: '../list/list?uid=' + self.data.uid + '&equipment_id=' + res.data.data.id,
              })
            } else {
              wx.reLaunch({
                url: '../control/control?uid=' + self.data.uid + '&equipment_id=' + res.data.data.id,
              })
            }
          }
        },
        fail: function (res) {
          console.log(res)
          self.dialog.showDialog({
            content: app.globalData.AppMsg.network,
            showCancel: false,
            success: function () {
              wx.navigateBack({
                delta: -1
              })
            }
          })
          // wx.showModal({
          //   // title: '网络错误',
          //   content: app.globalData.AppMsg.network,
          //   showCancel: false,
          //   success: function () {
          //     wx.navigateBack({
          //       delta: -1
          //     })
          //   }
          // })
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    }
    // this.setData({
    //   uid:null
    // })
    // app.globalData.uid = null;
  },
  //自定义获取用户信息组件返回值
  getUserInfo: function(e) {
    if(!util.isNullObject(e.detail)){
      this.setData({
        userInfo: e.detail
      });
      app.globalData.userInfo = e.detail;
      wx.hideLoading();
      this.getUid();
    }else{
      wx.navigateBack({ delta: 1 });
    }
    
  }
})
