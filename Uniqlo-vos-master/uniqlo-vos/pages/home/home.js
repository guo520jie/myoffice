import { zh_CN, en, jp } from "../../utils/lang/lang.js";
import api from "../../api/request";
import wxModal from "../../utils/wxModal";

//获取应用实例
const app = getApp();
var QQMapWX = require("../../utils/qqmap-wx-jssdk.js");
var qqmapsdk;
Page({
  data: {
    showModal: false,
    background: '#8b3e93',
    isShowTagInput: false,
    lang: {},
    // 照片
    imageList: [],
    tempFilePaths: '',
    // 地址
    address: '',
    latitude: '',
    longitude: '',
    // 录音
    isSpeaking: false,
    sendLock: false,
    //下一条
    isNext: true,
    //文本框内容
    rootTag: '',
    tags: [],
    recentTime: '',
    itemList: [],
    itemIndex: '',
    reportId: '',
    resultType: 0,
    lastprocessedStr: '',
    // 页面显示
    projectShow: false,
    uploadedImage: [],
    config: [],
    translatResultType: ['无', '进行中', '计划', '已完成'],
    langtype: wx.getStorageSync('lang'),
    //是否订阅小程序订阅消息
    isSubscriptions: true,
    Id: '',
    teamId: '',
    teamName: '',
    groupList: [],
    teamObj: {},
    isuser: 0,
    goodsCode: ''
  },
  //商品码输入后失焦
  codeConfrim: function(e) {
    let self = this
    var value = e.detail.value
    console.log('value:' + value)
    if (value.length > 0) {
      self.setData({
        goodsCode: value,
        isChangeText: true
      })
      console.log('self.data.goodsCode:' + self.data.goodsCode)
      if (self.data.reportId > 0) {
        self.CodeDeal(true, 'scan')
      } else {
        self.CodeDeal(false, 'scan')
      }
    } else {
      self.setData({
        brandIndex: -1,
        goodCheck: [false, false, false, false],
        goodsCode: value,
        isChangeText: false,
        goodsName: ''
      })
    }
  },
  //扫描二维码
  onScan: function() {
    let self = this
    wx.scanCode({
      success: res => {
        let code = res.result
        let m_data = {
          code
        }
        self.setData({
          goodsCode: code
        })

        if (self.data.reportId > 0) {
          self.CodeDeal(false, 'scan')
        } else {
          self.CodeDeal(true, 'scan')
        }
      }
    })
  },
  // tabchange 请求该项目详情
  itemtabChange: function(e) {
    this.data.itemIndex = e.target.id
    this.setData({
      itemIndex: e.target.id,
      recentContent: ''
    })
    wx.request({
      url: url.detail + '/' + e.target.id,
      header: {
        Authorization: wx.getStorageSync('token')
      },
      method: 'GET',
      success: res => {
        console.log(res)
        if (res.data.datas) {
          this.setData({
            recentContent: res.data.datas.voiceContent
          })
        }
        console.log(this.data.recentContent)
      }
    })
    if (!!this.data.reportId) {
      wx.request({
        url:
          url.bind +
          '?voiceId=' +
          this.data.reportId +
          '&projectId=' +
          this.data.itemIndex,
        data: {
          projectId: this.data.itemIndex,
          voiceId: this.data.reportId
        },
        header: {
          Authorization: wx.getStorageSync('token')
        },
        method: 'PUT',
        success: res => {
          console.log(res)
        }
      })
    }
    this.proShow()
  },
  //获取用户配置
  getItem: function() {
    return new Promise((resolve, reject) => {
      var _this = this
      let lang = wx.getStorageSync('lang')
      wx.request({
        url: url.ceindex + '/list',
        header: {
          Authorization: wx.getStorageSync('token'),
          'x-lng-header': lang,
          'x-tenant-header': 'webapp'
        },
        method: 'GET',
        success: res => {
          // console.log(res)
          // console.log("getitem", _this.data.items)
          _this.data.items = res.data.datas
          _this.setData({
            config: res.data.datas
          })
          resolve()
        }
      })
    })
  },
  //拒绝加入
  reject: function() {
    this.setData({
      showModal: false
    })
  },
  //加入团队
  join: function() {
    this.setData({
      showModal: false
    })
    console.log(this.data.teamId)
    wx.request({
      url: url.joingroup,
      data: {
        teamId: this.data.teamId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: wx.getStorageSync('token')
      },
      method: 'POST',
      success: res => {
        console.log(res)
      }
    })
  },
  // 选择团队
  async pickerGroup(e) {
    console.log(e)
    this.data.groupList.forEach((item, index) => {
      if (index == e.detail.value) {
        this.setData({
          groupIndex: e.detail.value,
          teamId: item.teamId
        })
      }
    })
    await this.switchTeam()
  },
  //切换团队
  async switchTeam(e) {
    let params = {
      query: {
        teamId: this.data.teamId
      },
      method: 'PUT',
      headerType: 'application/json'
    }
    let res = await api.switchTeam(params)
  },
  // 获取当前用户下的团队列表
  async getGroup() {
    let params = {
      method: 'GET'
    }
    let res = await api.getTeamByUserId(params)
    let teamObj = {}
    res.datas.forEach((item, index) => {
      if (item.isChoice == 1) {
        this.setData({
          teamId: item.teamId,
          targetIndex: index
        })
      }
    })
    this.setData({
      groupList: res.datas
    })
  },
  getLang: function() {
    let lang = wx.getStorageSync('lang')
    console.log(lang, 'langlang')
    switch (lang) {
      case '2':
        this.setData({
          lang: jp
        })
        break
      case '1':
        this.setData({
          lang: en
        })
        break
      default:
        this.setData({
          lang: zh_CN
        })
        wx.setStorage({
          key: 'lang',
          data: '0'
        })
        break
    }
  },
  updateUserInfo: function() {
    wx.getUserInfo({
      success: function(res) {
        app.globalData.userInfo = res.userInfo
        wx.request({
          url: url.getUserInfo,
          header: {
            Authorization: wx.getStorageSync('token')
          },
          method: 'POST',
          data: res
        })
      },
      fail: function() {
        console.log('获取用户信息失败')
      }
    })
  },
  toSettings: function() {
    wx.navigateTo({
      url: '/pages/setting/setting'
    })
  },
  gotomain: function() {
    wx.navigateTo({
      url: '/pages/main/main'
    })
  },
  gotodate: function() {
    var that = this
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!!!res['subscriptionsSetting']) {
          that.setData({
            isSubscriptions: false
          })
          that.isSubscriptions = false
        } else {
          that.setData({
            isSubscriptions: true
          })
          that.isSubscriptions = true
        }
      }
    })
    if (!that.subscriptionsSetting) {
      wx.requestSubscribeMessage({
        tmplIds: ['2Gg8qYoU8JXmMdKfDasXj4CAit7mSP_uzDV7AXCFDTs'],
        success(res) {
          console.log(res)
        }
      })
    }
    wx.navigateTo({
      url: '/pages/date/date'
    })
  },
  // 删除相册
  removeImage: function(e) {
    console.log(e)
    let self = this
    let cache = e.currentTarget.dataset.value
    wx.request({
      url: url.delpic + '?id=' + cache.id,
      method: 'DELETE',
      header: {
        Authorization: wx.getStorageSync('token')
      },
      success: res => {
        let result = res.data
        console.log(res)
        if (result.resp_code == 0) {
          let currentindex = ''
          this.data.imageList.forEach((item, index) => {
            if (item.id == cache.id) {
              currentindex = index
            }
          })
          this.data.imageList.splice(currentindex, 1)
          this.setData({
            imageList: this.data.imageList
          })
        }
        if (result.resp_code != 0) {
          this.data.imageList.push(cache)
          this.setData({
            imageList: this.data.imageList
          })
        }
      }
    })
  },
  //第一个文本框是否显示
  proShow: function() {
    if (this.data.itemIndex) {
      console.log(this.data.itemIndex)
      this.setData({
        projectShow: true
      })
    } else {
      projectShow: false
    }
  },
  // 添加标签/页面显示
  addTag: function() {
    this.setData({
      isShowTagInput: true
    })
  },
  //添加标签  提交内容
  submitInput: function(e) {
    if (e.detail.value) {
      if (this.data.reportId) {
        let lang = wx.getStorageSync('lang')
        wx.request({
          url: url.addtag,
          data: {
            dailyDetails: this.data.reportId,
            name: e.detail.value,
            lngId: lang
          },
          header: {
            Authorization: wx.getStorageSync('toProjectken'),
            'x-tenant-header': 'webapp'
          },
          method: 'POST',
          success: res => {
            if (res.data.resp_code == 0) {
              this.data.tags.push(e.detail.value)
              console.log(this.data.tags)
              this.setData({
                isShowTagInput: false,
                tags: this.data.tags
              })
              wx.showToast({
                title: res.data.resp_msg,
                icon: 'none',
                duration: 1000
              })
            }
          }
        })
      } else {
        this.setData({
          isShowTagInput: false,
          tags: this.data.tags
        })
        let lang = wx.getStorageSync('lang')
        if (lang == 0) {
          wx.showToast({
            title: '请先添加语音',
            icon: 'none',
            duration: 1000
          })
        } else if (lang == 1) {
          wx.showToast({
            title: 'Please add voice first',
            icon: 'none',
            duration: 1000
          })
        } else {
          wx.showToast({
            title: '先に音声を追加してください',
            icon: 'none',
            duration: 1000
          })
        }
      }
    } else {
      this.setData({
        isShowTagInput: false,
        tags: this.data.tags
      })
      let lang = wx.getStorageSync('lang')
      if (lang == 0) {
        wx.showToast({
          title: '标签不能为空',
          icon: 'none',
          duration: 1000
        })
      } else if (lang == 1) {
        wx.showToast({
          title: 'Label cannot be empty',
          icon: 'none',
          duration: 1000
        })
      } else {
        wx.showToast({
          title: 'ラベルは空にできません',
          icon: 'none',
          duration: 1000
        })
      }
    }
  },
  onChangeVoiceContent: function(e) {
    var self = this
    console.log(e)
    console.log(e.detail.value)
    let lang = wx.getStorageSync('lang')
    if (!!this.data.reportId) {
      this.setData({
        voiceContent: e.detail.value
      })
      wx.request({
        url: url.saveTextVoice + '?sceneId=621711625002811392',
        header: {
          Authorization: wx.getStorageSync('token'),
          'x-lng-header': lang
        },
        data: {
          projectId: self.data.itemIndex,
          address: self.data.address || '',
          id: self.data.reportId,
          voiceContent: e.detail.value || ''
        },
        method: 'POST',
        success: res => {
          console.log(res)
          if (res.data.resp_code == 0) {
            if (res.data.datas.length > 0) {
              this.setData({
                // itemList: res.data.datas,
                recentTime: result.datas.reminderTime
              })
              // console.log(this.data.itemList)
            } else {
              this.setData({
                projectShow: false
              })
            }
          } else if (res.data.resp_code == 401) {
            let lang = wx.getStorageSync('lang')
            if (lang == 0) {
              wx.showToast({
                title: '网络错误',
                icon: 'none',
                duration: 1000
              })
            } else if (lang == 1) {
              wx.showToast({
                title: 'network error',
                icon: 'none',
                duration: 1000
              })
            } else {
              wx.showToast({
                title: 'ネットワークエラー',
                icon: 'none',
                duration: 1000
              })
            }
          } else {
            wx.showToast({
              title: res.data.resp_msg,
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    } else {
      this.setData({
        voiceContent: ''
      })
      if (lang == 0) {
        wx.showToast({
          title: '请先添加语音',
          icon: 'none',
          duration: 1000
        })
      } else if (lang == 1) {
        wx.showToast({
          title: 'Please add voice first',
          icon: 'none',
          duration: 1000
        })
      } else {
        wx.showToast({
          title: '先に音声を追加してください',
          icon: 'none',
          duration: 1000
        })
      }
    }
  },
  removerTag: function(e) {
    let _self = this
    let oldTag = []
    oldTag = _self.data.tags
    if (oldTag.indexOf(e.currentTarget.id) > -1) {
      oldTag.splice(
        oldTag.indexOf(oldTag.filter(item => item === e.currentTarget.id)[0]),
        1
      )
    }
    this.setData({
      tags: oldTag
    })
    console.log('传值接口', this.data.tags)
  },
  // 获取当前位置信息
  getAddress: function() {
    let vm = this
    wx.getSetting({
      success: res => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (
          res.authSetting['scope.userLocation'] != undefined &&
          res.authSetting['scope.userLocation'] != true
        ) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权会导致您的地理位置获取不到',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(dataAu) {
                    if (dataAu.authSetting['scope.userLocation'] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation()
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation()
        } else {
          //调用wx.getLocation的API
          vm.getLocation()
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function() {
    let vm = this
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        vm.getLocal(latitude, longitude)
      },
      fail: function(res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function(latitude, longitude) {
    let vm = this
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      sig: '19tFHsc7Jb1cIjxY8ab1dHmQIqhiMSaH',
      success: function(res) {
        console.log(JSON.stringify(res))
        let address = res.result.address
        vm.setData({
          address: address
        })
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {
        console.log(res)
      }
    })
  },
  // 添加图片
  chooseImg: function() {
    var _this = this
    let lang = wx.getStorageSync('lang')
    if (_this.data.reportId == '' || _this.data.reportId == undefined) {
      let lang = wx.getStorageSync('lang')
      if (lang == 0) {
        wx.showToast({
          title: '请先添加语音',
          icon: 'none',
          duration: 1000
        })
      } else if (lang == 1) {
        wx.showToast({
          title: 'Please add voice first',
          icon: 'none',
          duration: 1000
        })
      } else {
        wx.showToast({
          title: '先に音声を追加してください',
          icon: 'none',
          duration: 1000
        })
      }
    } else {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: chooseImageRes => {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          wx.uploadFile({
            url: url.uppic,
            filePath: chooseImageRes.tempFilePaths[0],
            name: 'file',
            formData: {
              voiceDailyId: this.data.reportId,
              file: chooseImageRes.tempFilePaths[0]
            },
            header: {
              Authorization: wx.getStorageSync('token'),
              'x-lng-header': lang
            },
            success: res => {
              if (thia.data.reportId) {
                let result = JSON.parse(res.data)
                if (result.resp_code == 0) {
                  let tempImageList = _this.data.imageList
                  tempImageList.push({
                    url: chooseImageRes.tempFilePaths[0],
                    id: result.datas.id
                  })
                  _this.setData({
                    imageList: tempImageList,
                    resultType: result.datas.resultType
                  })
                }

                if (lang == 1) {
                  this.setData({
                    translatResultType: [
                      'none',
                      'Have in hand..',
                      'in the plan',
                      'completed'
                    ]
                  })
                }
                if (lang == 2) {
                  this.setData({
                    translatResultType: [
                      'なし',
                      '進行中…',
                      '計画中',
                      '完了しました'
                    ]
                  })
                }
                console.log(res)
              } else {
                this.changeLang()
              }
            }
          })
        }
      })
    }
  },
  changeLang: function() {
    app.globalData.lang = wx.getStorageSync('lang')
    if (app.globalData.lang === 0) {
      wx.showToast({
        title: '请先添加语音',
        icon: 'none',
        duration: 1000
      })
    } else if (app.globalData.lang === 1) {
      wx.showToast({
        title: 'Please add voice first',
        icon: 'none',
        duration: 1000
      })
    } else {
      wx.showToast({
        title: '先に音声を追加してください',
        icon: 'none',
        duration: 1000
      })
    }
  },
  // 录音
  touchdown: function(e) {
    console.log(e)
    var _this = this
    this.setData({
      isSpeaking: true,
      startPoint: e.touches[0],
      sendLock: false
    })
    app.globalData.recorderManager.start()
  },

  //取消录音
  changeCancle: function() {
    let lang = wx.getStorageSync('lang')
    if (lang == 0) {
      wxModal.alert('录音取消')
    } else if (lang == 1) {
      wxModal.alert('recording canceling')
    } else {
      wxModal.alert('録音のキャンセル')
    }
  },
  //结束录音
  touchup: function() {
    if (this.data.sendLock) {
      this.changeCancle()
    }
    this.setData({
      isSpeaking: false
    })
    this.mps()
    app.globalData.recorderManager.stop()
  },

  touchcancel() {
    this.setData({
      isSpeaking: false
    })
  },

  touchmove: function(e) {
    var that = this
    var moveLenght =
      e.touches[e.touches.length - 1].clientY - that.data.startPoint.clientY //移动距离
    if (Math.abs(moveLenght) > 50) {
      this.changeCancle()
      that.data.sendLock = true //触发了上滑取消发送，上锁
    } else {
      wx.hideLoading()
      that.data.sendLock = false
    }
  },

  UpSucceedMusic: function() {
    let self = this
    setTimeout(function() {
      recordSuccessAudio.src = successmusix[self.data.languageindex]
      recordSuccessAudio.play()
    }, 500)
  },
  Toast: function(title) {
    console.log(title)
    wx.showToast({
      title: title,
      icon: 'success',
      duration: 2000
    })
  },
  nextAction: function() {
    this.setData({
      imageList: [],
      tags: [],
      reportId: null,
      voiceContent: '',
      itemIndex: null,
      recentTime: '',
      recentContent: '',
      projectShow: false,
      resultType: 0
    })
  },
  //获取前四个项目
  showList: function() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url.Project,
        header: {
          Authorization: wx.getStorageSync('token'),
          'x-lng-header': wx.getStorageSync('lang')
        },
        method: 'GET',
        success: res => {
          console.log(res)
          if (res.data.resp_code == 0) {
            if (res.data.datas.length > 0) {
              this.setData({
                itemList: res.data.datas
              })
              // console.log(this.data.itemList)
            } else {
              this.setData({
                projectShow: false
              })
            }
          } else if (res.data.resp_code == 401) {
            wx.showToast({
              title: this.data.lang.neterror,
              icon: 'none',
              duration: 1000
            })
            // wx.redirectTo({
            //   url: '/pages/auth/auth',
            // })
          } else {
            wx.showToast({
              title: res.data.resp_msg,
              icon: 'none',
              duration: 1000
            })
          }
          resolve()
        }
      })
      console.log(this.data.sch)
    })
  },
  getUserInfo(e) {
    //判断授权状态
    wx.getSetting({
      success: userSetting => {
        console.log(userSetting)
        if (!!userSetting.authSetting['scope.userInfo']) {
        } else {
          wx.showToast({
            title: '请授权用户信息',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  //生成水印浮层
  drowsyUserInfo: function() {
    let query = wx.createSelectorQuery()
    query
      .select('.container')
      .boundingClientRect(rect => {
        console.log(rect)
        this.setData({
          elementHeight: rect.height + 'px'
        })
      })
      .exec()

    let { name, userId } = JSON.parse(wx.getStorageSync('userInfo'))
    let name_xx = `${name} ${userId}`
    console.log(name_xx, 'name_xx')
    let ctx = wx.createCanvasContext('myCanvas1')
    ctx.rotate((45 * Math.PI) / 180) //设置文字的旋转角度，角度为45°；

    //对斜对角线以左部分进行文字的填充
    for (let j = 1; j < 5; j++) {
      //用for循环达到重复输出文字的效果，这个for循环代表纵向循环
      ctx.beginPath()
      ctx.setFontSize(20)
      ctx.setFillStyle('rgba(169,169,169,.2)')

      ctx.fillText(name_xx, 0, 100 * j)
      for (let i = 1; i < 5; i++) {
        //这个for循环代表横向循环，
        ctx.beginPath()
        ctx.setFontSize(20)
        ctx.setFillStyle('rgba(169,169,169,.2)')
        ctx.fillText(name_xx, 180 * i, 100 * j)
      }
    } //两个for循环的配合，使得文字充满斜对角线的左下部分

    //对斜对角线以右部分进行文字的填充逻辑同上
    for (let j = 0; j < 5; j++) {
      ctx.beginPath()
      ctx.setFontSize(20)
      ctx.setFillStyle('rgba(169,169,169,.2)')

      ctx.fillText(name_xx, 0, -100 * j)
      for (let i = 1; i < 5; i++) {
        ctx.beginPath()
        ctx.setFontSize(20)
        ctx.setFillStyle('rgba(169,169,169,.2)')
        ctx.fillText(name_xx, 180 * i, -100 * j)
      }
    }
    ctx.draw()
  },
  //----------周期函数-------------------//
  async onLoad(options) {
    console.log('我在home中', options)
    this.drowsyUserInfo()
    this.getUserInfo()
    if (options.id) {
      this.setData({
        showModal: true,
        teamId: options.id,
        teamName: options.name
      })
    } else {
      this.setData({
        showModal: false
      })
    }

    var that = this
    this.getLang()
    await this.getItem()
    this.getGroup()
    await this.showList()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function() {},
  onShow: function() {
    this.getAddress()
    let self = this
    qqmapsdk = new QQMapWX({
      key: 'PCMBZ-DHPK6-SC3SJ-EJOZW-IY4N2-LRFS5'
    })
    let lang = wx.getStorageSync('lang')
    if (lang == 1) {
      this.setData({
        translatResultType: [
          'none',
          'Have in hand..',
          'in the plan',
          'completed'
        ]
      })
    }
    if (lang == 2) {
      this.setData({
        translatResultType: ['なし', '進行中…', '計画中', '完了しました']
      })
    }
    this.getLang()
  },
  mps: function() {
    const callBack = filePath => {
      this.processFileUploadForAsr(filePath)
    }
    app.globalData.recorderManager.setOnStopFn(callBack)
    app.globalData.recorderManager.onStop()
  },
  //上传录音文件到 api.happycxz.com 接口，处理语音识别和语义，结果输出到界面
  processFileUploadForAsr(filePath) {
    let m_data = {}
    let lang = wx.getStorageSync('lang')
    if (this.data.reportId > 0) {
      m_data.reportId = this.data.reportId
    }
    m_data.language = this.data.languageindex
    if (!this.data.sendLock) {
      wxModal.alert(this.data.lang.transition)
      let fromData = {
        address: this.data.address || '',
        translateType: 1,
        sceneId: '621711625002811392',
        projectId: this.data.itemIndex,
        teamId: this.data.Id
      }
      if (this.data.itemIndex) {
        if (this.data.reportId) {
          fromData.voiceId = this.data.reportId
        }
      } else {
        if (this.data.reportId) {
          fromData.voiceId = this.data.reportId
        }
      }
      console.log(fromData)
      wx.uploadFile({
        url: url.VoiceDeal,
        filePath: filePath,
        name: 'file',
        formData: fromData,
        header: {
          'content-type': 'multipart/form-data',
          Authorization: wx.getStorageSync('token'),
          'x-lng-header': lang
        },
        success: res => {
          wx.hideLoading()
          var result = JSON.parse(res.data)
          if (result.resp_code != 0) {
            wxModal.alert(result.resp_msg)
            return
          }
          this.setData({
            tags: result.datas.tagList || [],
            reportId: result.datas.id,
            voiceContent: result.datas.voiceContent,
            photographs: result.datas.images,
            resultType: result.datas.resultType,
            recentTime: result.datas.reminderTime
          })
          this.data.reportId = result.datas.id
          console.log(result)
        },
        fail: function(res) {
          console.log(res)
          // wx.showModal({
          //   title: this.data.tipTxt,
          //   content: this.data.nonetTxt,
          //   showCancel: false
          // });
          // wx.hideToast();
        }
      })
    }
  }
})
