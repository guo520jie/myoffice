// pages/control/control.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showControl:true,
    uid:null,
    equipment_id:null,
    valid_time:0,
    use_time:0,
    countdown:0,
    countdown_msg:'',
    hideCountdown:0,
    hideCountdown_msg:'',
    is_broadcast:false,
    scene:[],
    inter:null,
    timer:null,

    AppImg: util.AppImg,
    cur:{leftcur:false,rightcur:false},  
    Height: '413rpx',
    imgData: [],
    current:0,

    AppMsg:{},
    swiperData: {
      swiperHeight: 230,
      indicatorDots: true,
      indicatorColor: 'rgba(255, 255, 255, .6)',
      indicatorActiveColor: '#FFFFFF',
      autoplay:true,
      interval:3000,
      duration: 500,
      dialog: '恭喜您获取一张优惠券',
      imgData:[
        {
          banner_img: util.AppImg.Con_Banner
        }
      ]
    }
  },
  
  // change
  swiperChange: function (e) {
    // console.log(this.data.imgData[e.detail.current])
    var item = this.data.imgData[e.detail.current];
    // 滑动时选中状态
    this.setData({
      current: e.detail.current
    })
  //  console.log(e)
  },

  clearBroadcast:function(){
    let self = this;
    var timer = setTimeout(function () {
      console.log('开始轮播')
      self.setData({
        is_broadcast: true,
        timer:null
      });
    }, 5000);
    this.setData({
      is_broadcast: false,
      timer: timer
    });
  },
  prevImg: function () {
    var current = this.data.current
    var imgData = this.data.imgData
    // console.log(current)
    current = current > 0 ? current - 1 : imgData.length - 1
    this.setData({
      current: current
    })
    if (this.data.is_broadcast) {
      this.clearBroadcast();
    }
    if(this.data.timer&&!this.data.is_broadcast){
      clearTimeout(this.data.timer);
      this.clearBroadcast();
    }
  },
  nextImg: function () {
    var current = this.data.current
    var imgData = this.data.imgData
    current = current < (imgData.length - 1) ? current + 1 :0
    console.log(current)
    this.setData({
      current: current
    })
    if (this.data.is_broadcast) {
      this.clearBroadcast();
    }
    if (this.data.timer && !this.data.is_broadcast) {
      clearTimeout(this.data.timer);
      this.clearBroadcast();
    }
  },

  // 左右箭头
  leftStar:function(){
    this.setData({
      'cur.leftcur':true
    })
  },
  leftEnd:function(){
    this.setData({
      'cur.leftcur':false
    })
  },
  rightStar:function(){
    this.setData({
      'cur.rightcur':true
    })
  },
  rightEnd:function(){
    this.setData({
      'cur.rightcur':false
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dialog = this.selectComponent("#dialog");
    this.setData({
      uid:options.uid,
      equipment_id: options.equipment_id
      
    });
    // this.getSwiperData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(app.globalData.openid)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("control show");
    this.setData({
      AppMsg: app.globalData.AppMsg
    })
    this.controlInit();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("control hide");
    if (this.data.inter) {
      clearInterval(this.data.inter);
    }
    if (this.data.timer) {
      clearTimeout(this.data.timer);
    }
    wx.hideLoading();
    this.dialog.hideDialog();
    // wx.reLaunch({
    //   url: '/pages/index/index?hide=true',
    // })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("control unload");
    if (this.data.inter) {
      clearInterval(this.data.inter);
    }
    if (this.data.timer) {
      clearTimeout(this.data.timer);
    }
    wx.hideLoading();
    this.dialog.hideDialog();
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
   * 初始化
   */
  controlInit:function(){
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    let self = this;
    wx.request({
      url: util.Api.getControlInit,
      method: 'GET',
      data: {
        equipment_id: this.data.equipment_id,
        openid: app.globalData.openid,
        version: app.globalData.version
      },
      success: function (res) {
        if (res.data.code === 0) {
          if (res.data.status == 2) {
            wx.reLaunch({
              url: '../list/list?uid=' + self.data.uid + '&equipment_id=' + self.data.equipment_id,
            })
          } else {
            var current = 0;
            for(var i in res.data.data){
              if(res.data.data[i].is_use){
                current = parseInt(i);
              }
            }
            self.setData({
              valid_time: res.data.valid_time,
              use_time: res.data.use_time,
              countdown: res.data.countdown,
              hideCountdown: res.data.valid_time - res.data.use_time,
              current:current,
              is_broadcast: res.data.is_broadcast,
              imgData: res.data.data
            });
            self.countdown();
          }

        } else {
          var msg = res.data.msg !== undefined ? res.data.msg : (res.data.Error !== undefined ? res.data.Error : '');
          self.dialog.showDialog({
            content: msg,
            showCancel: false,
            success: function () {
              app.globalData.uid = null;
              wx.reLaunch({
                url: '../index/index',
              })
            }
          })
          // wx.showModal({
          //   // title: '操作失败',
          //   content: msg,
          //   showCancel: false,
          //   success: function () {
          //     wx.reLaunch({
          //       url: '../index/index',
          //     })
          //   }
          // })
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
  },
  /**
   * 显示畅玩结束页
   */
  hideControl:function(){
    let self = this;
    var inter = setInterval(function () {
      if (self.data.hideCountdown <= 0) {
        clearInterval(self.data.inter);
        app.globalData.uid = null;
        wx.reLaunch({
          url: '../index/index',
        })
        return
      }
      var time = self.data.hideCountdown - 1
      var msg = util.formatSecond(time);
      self.setData({
        hideCountdown: self.data.hideCountdown - 1,
        hideCountdown_msg: msg
      });
    }, 1000);
    this.setData({
      inter: inter,
      showControl:false
    });
  },
  /**
   * 跳转至图片列表页
   */
  getImgList: function () {
    wx.reLaunch({
      url: '../list/list?uid=' + this.data.uid + '&equipment_id=' + this.data.equipment_id,
    })
  },
  /**
   * 启动倒计时
   */
  countdown:function(){
    let self = this;
    var inter = setInterval(function(){
      if(self.data.countdown<=0){
        clearInterval(self.data.inter);
        self.getImgList();
        return
      }
      var time = self.data.countdown - 1
      var msg = util.formatSecond(time);
      self.setData({
        countdown:self.data.countdown-1,
        countdown_msg: msg
      });
    },1000);
    this.setData({
      inter: inter
    });
  },
  /**
   * 场景切换
   */
  switchScene: function (e){
    if (this.data.imgData[this.data.current].is_use){
      return
    }
    wx.showLoading({
      title: '数据加载中',
      mask: true
    });
    let sceneData = this.data.imgData[e.currentTarget.dataset.index];
    let self = this;
    wx.request({
      url: util.Api.switchScene,
      method: 'GET',
      data: {
        scene_id: sceneData.id,
        equipment_id: this.data.equipment_id,
        openid: app.globalData.openid,
        version: app.globalData.version
      },
      success: function (res) {
        if (res.data.code === 0) {
          if (res.data.status == 2) {
            self.hideControl();
          } else {
            if (self.data.timer) {
              clearTimeout(self.data.timer);
              self.setData({
                timer:null
              })
            }

            var current = 0;
            for (var i in res.data.data) {
              if (res.data.data[i].is_use) {
                current = parseInt(i);
              }
            }
            self.setData({
              current:current,
              is_broadcast:false,
              imgData: res.data.data
              // imgData:res.data.data
            });
          }
          if(sceneData.is_canvas){
            wx.reLaunch({
              url: '../canvasChose/canvasChose?uid=' + self.data.uid + '&equipment_id=' + self.data.equipment_id + "&scene_id=" + sceneData.id,
            })
          }
         
        } else {
          var msg = res.data.msg !== undefined ? res.data.msg : (res.data.Error !== undefined ? res.data.Error : '');
          self.dialog.showDialog({
            content: msg,
            showCancel: false,
            success:function(){

              app.globalData.uid = null;
              wx.reLaunch({
                url: '../index/index',
              })
            }
          })
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
      complete: function () {
        wx.hideLoading();
        console.log("bbb")
      }
    })
  },
  /**
   * 获得轮播图初始数据
   */
  getSwiperData: function () {
    let self = this;
    wx.request({
      url: util.Api.getSwiperData,
      method: 'GET',
      data: {
        equipment_id: this.data.equipment_id,
        openid: app.globalData.openid,
        version: app.globalData.version
      },
      success: function (res) {
        self.setData({
          swiperData: res.data.data
        });
        console.log(self.data.swiperData)
      },
    })
  },
  /**
   * 轮播图点击事件
   */
  bannerImgClick:function(e){
    console.log(e);
    let src = e.currentTarget.dataset.item.download_img;
    if(!src){
      return;
    }
    let self = this;
    this.dialog.showDialog({
      showImage:true,
      image: src,
      confirmText:"下载",
      success:function(e){
        if(e.confirm){
          wx.downloadFile({
            url: src,
            success: function (res) {
              if (res.statusCode == 200) {
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath
                });
              }
            }
          })
        }
      }
    })
  }
})