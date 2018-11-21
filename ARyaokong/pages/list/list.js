// pages/list/list.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: null,
    equipment_id: null,
    countdown: 0,
    countdown_msg: '',
    time_word:'剩余取照片时间',
    inter: null,
    imgList:[],
    AppImg: util.AppImg,
    AppMsg: {},
    downloadNum: 3,
    haveMobile:false,
    swiperData: {
      swiperHeight: 393,
      indicatorDots: true,
      indicatorColor:'rgba(255, 255, 255, .6)',
      indicatorActiveColor:'#FFFFFF',
      autoplay: true,
      interval: 3000,
      duration: 500,
      dialog:'恭喜您获取一张优惠券',
      imgData: [
        {
          banner_img: util.AppImg.Con_Banner
        },
        
      ]
    },
    curbg:true,
    listMask:false,
    listMaskCur:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dialog = this.selectComponent("#dialog");
    this.setData({
      uid: options.uid,
      equipment_id: options.equipment_id
    });
    this.getSwiperData();
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
    this.setData({
      AppMsg:app.globalData.AppMsg
    })
    this.listInit();
    console.log('show')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (this.data.inter) {
      clearInterval(this.data.inter);
      this.setData({
        inter:null
      });
    }
    wx.hideLoading();
    this.dialog.hideDialog();
    // wx.reLaunch({
    //   url: '/pages/index/index?hide=true',
    // })
    console.log('list hide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (this.data.inter) {
      clearInterval(this.data.inter);
      this.setData({
        inter: null
      });
    }
    wx.hideLoading();
    this.dialog.hideDialog();
    console.log('list unload')
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
  
  // }
  /**
   * 页面数据初始化
   */
  listInit: function () {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    let self = this;
    wx.request({
      url: util.Api.getImgList,
      method: 'GET',
      data: {
        equipment_id: this.data.equipment_id,
        openid: app.globalData.openid,
        version: app.globalData.version
      },
      success: function (res) {
        if (res.data.code === 0) {
          if (res.data.status == 1) {
            wx.reLaunch({
              url: '../control/control?uid=' + self.data.uid + '&equipment_id=' + self.data.equipment_id,
            })
          } else {
            for (var index in res.data.data) {
              res.data.data[index].chose = 0;
            }
            self.setData({
              countdown: res.data.countdown,
              haveMobile:res.data.haveMobile,
              imgList:res.data.data,
              downloadNum: res.data.downloadNum ? res.data.downloadNum:self.data.downloadNum
            });
            if(res.data.data.length<=0){
              // 无图片状态
              self.setData({
                listMask:true,
                listMaskCur:false
              })
              // wx.showModal({
              //   // title: '获取失败',
              //   content: app.globalData.AppMsg.getImgEmptyArray,
              //   showCancel: false,
              //   success: function (e) {
              //     if(e.confirm){
              //       self.listInit();
              //     }else{
              //       self.endControl();
              //     }
              //   }
              // })
            }
            if(!self.data.inter){
              self.countdown();
            }
            
          }

        } else {
          var msg = res.data.msg !== undefined ? res.data.msg : (res.data.Error !== undefined ? res.data.Error : '');
          self.dialog.showDialog({
            content: msg,
            showCancel: false,
            success: function () {
              self.endControl();
            }
          })
          // wx.showModal({
          //   // title: '操作失败',
          //   content: msg,
          //   showCancel: false,
          //   success: function () {
          //     self.endControl();
          //   }
          // })
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
  /**
   * 启动倒计时
   */
  countdown: function () {
    let self = this;
    var inter = setInterval(function () {
      if (self.data.countdown <= 0) {
        clearInterval(self.data.inter);
        self.endControl();
        return;
      }
      var time = self.data.countdown - 1
      var msg = util.formatSecond(time);
      self.setData({
        countdown: self.data.countdown - 1,
        countdown_msg: msg
      });
    }, 1000);
    this.setData({
      inter: inter
    });
  },
  /**
   * 回到首页
   */
  endControl:function(){
    app.globalData.uid = null;
    wx.reLaunch({
      url: '../index/index',
    })
  },
  /**
   * 是否选中图片事件
   */
  choseImg:function(e){
    // btn保存点击状态

    var img_id = e.currentTarget.dataset.img_id;
    var data = this.data.imgList;
    var length = 0;
    for (var index in data) {
      if (data[index].take_out === 1) {
        length++;
      }else if (data[index].chose === 1) {
        length++;
      }
    }
    for (var index in data){
      if (data[index].id==img_id){
        if (data[index].chose === 1){
          data[index].chose = 0;
        }else{
          if (length >= this.data.downloadNum && data[index].take_out===0){
            this.dialog.showDialog({
              content: app.globalData.AppMsg.downloadMoreImg,
              showCancel: false
            })
          }else{
            data[index].chose = 1;
          }
        }
      }
    }
    var user_length = 0;
    for(var i in data){
      if (data[i].chose===1){
        user_length++;
      }
    }
    if (user_length > 0) {
      this.setData({
        curbg: false
      })
    } else {
      this.setData({
        curbg: true
      })
    }
    this.setData({
      imgList:data
    });
  },
  // 获取用户手机授权
  getPhoneNumber:function(e){
    console.log(e)
    let self = this;
    wx.request({
      url: util.Api.getUserMobile,
      method: 'GET',
      data: {
        openid: app.globalData.openid,
        iv:e.detail.iv,
        data:e.detail.encryptedData,
        session_key:app.globalData.SessionKey,
        version: app.globalData.version
      },
      success: function (res) {
        if(res.data.code==0){
          self.setData({
            haveMobile:true
          })
          self.saveImg();
        }else{
          var msg = res.data.msg !== undefined ? res.data.msg : (res.data.Error !== undefined ? res.data.Error : '');
          self.dialog.showDialog({
            content: msg,
            showCancel: false,
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
    })
  },
  /**
   * 保存图片
   */
  saveImg: function () {

    // 点击状态
    // this.setData({
    //   curbg:true
    // })

    var data = [];
    for(var index in this.data.imgList){
      if(this.data.imgList[index].chose==1){
        data.push(this.data.imgList[index]);
      }
    }
    console.log(data, data.length)
    if (data.length <= 0) {
      console.log('aaa', app.globalData.AppMsg.downloadNullImg)
      this.dialog.showDialog({
        content: app.globalData.AppMsg.downloadNullImg,
        showCancel: false,
      })
      return
    }
    console.log('bbb')
    wx.showLoading({
      title: '照片下载中',
    })
    var length = 0;
    for (var index in data) {
      if (data[index].take_out === 1) {
        length++;
      }
    }
    if (length == 0) {
      this.randDownloadBanner();
    }
    let self = this;
    let num = 0;
    let all = data.length;
    for(var index in data){
      let id = data[index].id;
      let use_log_id = data[index].use_log_id;
      wx.downloadFile({
        url: data[index].img_url,
        success: function (res) {
          if (res.statusCode == 200) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success:function(){
                //上传保存图片的信息
                var data = self.data.imgList;
                for (var index in data) {
                  if (data[index].id === id) {
                    data[index].chose = 0
                    data[index].take_out = 1
                  }
                }
                self.setData({
                  imgList: data
                })
                wx.request({
                  url: util.Api.saveDownloadMsg,
                  method: 'GET',
                  data: {
                    id: id,
                    use_log_id: use_log_id,
                    version: app.globalData.version
                  },
                  success: function (res) {
                    num++;
                    if (num == all) {
                      wx.showToast({
                        title: '图片下载成功',
                        icon: 'success',
                        duration: 2000,
                        success: function (e) {
                          setTimeout(function(){
                            self.endControl();
                          },1000);
                        }
                      })
                    }
                  },
                })
                
              },
              complete:function(){
                wx.hideLoading();
              }
            })
          }
        }
      })
    }
    
  },
  /**
   * 上传保存信息
   */
  saveDownloadMsg:function(id){
    var data = this.data.imgList;
    for(var index in data){
      if(data[index].id === id){
        data[index].chose = 0
        data[index].take_out = 1
      }
    }
    this.setData({
      imgList:data
    })
    wx.request({
      url: util.Api.saveDownloadMsg,
      method: 'GET',
      data: {
        id: id,
        version: app.globalData.version
      },
      success: function (res) {
        
      },
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
        // demo
        res.data.data.swiperHeight = 393;
        // res.data.data.imgData = [{ banner_img: "../images/img2/youhui.png" }, { banner_img: "../images/img2/youhui.png" }];

        self.setData({
          swiperData:res.data.data
        })
      },
    })
  },
  /**
   * 轮播图点击事件
   */
  bannerImgClick: function (e) {
    var src = e.currentTarget.dataset.item.download_img;
    if (!src) {
      return;
    }
    this.dialog.showDialog({
      showImage: true,
      showCancel: true,
      title: this.data.swiperData.dialog,
      image: src,
      confirmText: "下载",
      success: function (e) {
        if (e.confirm) {
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
  },
  /**
   * 随机下载一张轮播图
   */
  randDownloadBanner:function(){
    console.log('randDownloadBanner')
    var min = 0;
    var max = this.data.swiperData.imgData.length
    var rand = parseInt(Math.random() * (max - min) + min, 10);
    var src = this.data.swiperData.imgData[rand].download_img;
    if (!src) {
      return;
    }
    this.dialog.showDialog({
      showImage: true,
      showCancel:false,
      title: this.data.swiperData.dialog,
      image: src,
      confirmText: "确定",
    })
    wx.downloadFile({
      url: src,
      success: function (res) {
        if (res.statusCode == 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath
          });
        }
      }
    });
  },
})