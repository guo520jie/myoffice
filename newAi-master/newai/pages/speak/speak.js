// pages/speak/speak.js
const app = getApp()
let _api = app.globalData._api
import wxModal from '../../utils/wxModal'
import wxApi from '../../utils/wxApi'
let QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
let qqmapsdk

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currLanguage: app.globalData.currLanguage,
    voiceMsg: '', //获取语言内容
    voiceId: '',
    projectList: [],
    currProjectIndex: '',
    address: '',
    imgList: [],
    currTeamMemberList: [],
    copyUserIdList: [],
    modalName: '',
    hideRefresh: false,
    teamList: [],
    memberList: [],
    workTimeStr: '', //返回时间
    // 时间选择
    recentTime: '', //默认时间 后端返回时间
    disabled: false, //设置是否能点击 false可以 true不能点击
    startDate: '2020-01-01 00:00',
    endDate: '2030-12-31 00:00',
    placeholder: '请选择时间',
    showModal: false,
    shareMessage: '',
    teamCurrId: '',
    timeArray: [
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00'
    ],
    timeIndex: 0,
  },

  getActionProject(e) {
    let { index } = e.currentTarget.dataset
    this.setData({
      currProjectIndex: index
    })
    let { id } = this.data.projectList[index]
    wx.setStorageSync('currProjectId', id)
  },
  async getLocation(e) {
    // let { type } = e.currentTarget.dataset
    // if (!this.address && !type) {
    //   return
    // }
    wxModal.loading('定位中..')
    let location = await wxApi.getLocation()
    let { latitude, longitude } = location
    this.getLocal(latitude, longitude)
  },
  // 获取当前地理位置
  getLocal(latitude, longitude) {
    qqmapsdk.reverseGeocoder({
      location: {
        latitude,
        longitude
      },
      sig: '19tFHsc7Jb1cIjxY8ab1dHmQIqhiMSaH',
      success: res => {
        let { address } = res.result
        this.setData({
          address
        })
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {
        setTimeout(() => {
          wxModal.loaded()
        }, 1000)
      }
    })
  },
  //拍照
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: async res => {
        let index = e.currentTarget.dataset.index
        if (res.confirm) {
          let id = this.data.imgList[index].id || ''
          let newImageList = [...this.data.imgList]
          newImageList.splice(index, 1)
          if (!id) {
            this.setData({
              // upLoadImgList: newImageList,
              imgList: newImageList
            })
            return
          }
          let params = {
            suffix: id,
            method: 'DELETE'
          }
          let data = await api.deleteUploadImge(params)
          if (data.resp_code === 0) {
            this.setData({
              upLoadImgList: newImageList,
              imgList: newImageList
            })
          }
        }
      }
    })
  },
  ChooseImage() {
    // // wxModal.loading()
    // if (!this.data.voiceId) {
    //   wxModal.alert('请说语音哦.')
    //   return
    // }
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: res => {
        this.setData({
          imgList: this.data.imgList.concat({ imgUrl: res.tempFilePaths[0] })
        })
        wxModal.loading()
        this.upLoadImage(res)
      },
      fail: function(res) {
        wxModal.alert('服务错误..')
        wxModal.loaded()
        console.log(res)
      }
    })
  },
  ViewImage(e) {
    console.log(e)
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    })
  },
  // 上传图片
  async upLoadImage(file) {
    console.log(file.tempFilePaths[0])
    let { imgList, voiceId } = this.data
    wx.uploadFile({
      url: _api.uploadImage,
      header: {
        Authorization: wx.getStorageSync('token')
      },
      filePath: file.tempFilePaths[0],
      name: 'file',
      formData: {
        voiceDailyId: voiceId
      },
      success: res => {
        console.log(res)
        let result = JSON.parse(res.data)
        console.log(result)
        if (result.resp_code === 1) {
          wxModal.loaded()
          wxModal.alert(result.resp_msg)
        } else {
          if (imgList.length >= 9) {
            wxModal.alert('最多中能上传9张哦.')
          }
          //  else {
          //   imgList.push({ imgUrl: result.datas.url })
          // }
          // this.setData({
          //   imgList
          // })
          wxModal.loaded()
        }
      },
      fail: function(res) {
        wxModal.loaded()
        wxModal.alert('服务错误..')
        console.log(res)
      }
    })
  },
  DelTag(e) {
    wx.showModal({
      title: '提示',
      content: '确定要当前联系人吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: async res => {
        console.log(res)
        let { index } = e.currentTarget.dataset
        this.data.currTeamMemberList.splice(index, 1)
        this.data.memberList[index].checked = false
        this.setData({
          currTeamMemberList: this.data.currTeamMemberList,
          memberList: this.data.memberList
        })
      }
    })
  },
  getRecordMsg(e) {
    console.log(e)
    //创建和任务开始的时间 一个时长
    let {
      reminderDate,
      finishDate,
      currentDate,
      id,
      workTime,
      voiceContent
    } = e.detail
    let workTimeStr
    if (workTime != 0) {
      if (workTime / 60 >= 1) {
        workTimeStr = `0${workTime / 60}:${
          workTime % 60 === 0 ? '00' : workTime % 60
        }`
      } else {
        workTimeStr = `00:${workTime % 60}`
      }
    }
    if (id) {
      this.setData({
        hideRefresh: true,
        recentTime: reminderDate || finishDate || currentDate,
        voiceMsg: voiceContent,
        workTimeStr,
        voiceId: id
      })
    }
    // 获取语言
  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  async getVoiceMsg(e) {
    let { value } = e.detail
    let { voiceId, voiceMsg, currProjectIndex, projectList } = this.data
    let teamCurrId = wx.getStorageSync('teamCurrId')
    // let newVoiceMsg = voiceMsg + value
    let params = {
      headerType: 'application/json',
      query: {
        voiceId,
        projectId:
          (currProjectIndex !== '' && projectList[currProjectIndex].id) || '',
        teamId: teamCurrId,
        voiceContent: value
      }
    }
    let res = await _api.addVoiceByText(params)
    if (res.code === 200) {
      let { reminderTime, id, workTime, voiceContent } = res.data
      let workTimeStr
      if (workTime != 0) {
        if (workTime / 60 >= 1) {
          workTimeStr = `0${workTime / 60}:${
            workTime % 60 === 0 ? '00' : workTime % 60
          }`
        } else {
          workTimeStr = `00:${workTime % 60}`
        }
      }

      if (id) {
        this.setData({
          hideRefresh: true,
          recentTime: reminderTime,
          voiceMsg: voiceContent,
          workTimeStr,
          voiceId: id
        })
      }
    }
    console.log(res)
  },
  /**
   * 日历控件绑定函数
   * 点击日期返回
   */
  onPickerChange: function(e) {
    console.log(e.detail)
    this.setData({
      recentTime: e.detail.dateString
    })
  },

  //获取团队列表
  async getSelfTeamList() {
    let params = {
      method: 'GET'
    }
    let res = await _api.getSelfTeamList(params)
    res.data.unshift({ teamName: 'MyTeam', id: '' })
    this.setData({
      teamList: res.data
    })
    this.getTeamCurrId()
  },
  //切换团队
  getTeamCurrId(e) {
   console.log(e)
    // let teamCurrId = wx.getStorageSync('teamCurrId') || ''
    // this.setData({
    //   teamCurrId
    // })
    // let id = (e && e.detail) || teamCurrId
    if(wx.getStorageSync('currProjectId')){
      wx.removeStorage({key:'currProjectId'})
    }
    
    let id = e && e.detail
    console.log(id,'sss')
    if(!id){
    // 切换没有id的团队时，清空项目列表
    this.setData({
      projectList: [],
    })

      return 
    }

    this.getProjectsByTeam(id)


   
  },
  //获取项目列表
  async getProjectsByTeam(teamId = '') {
    let params = {
      method: 'GET',
      query: {
        teamId
      }
    }
    let res = await _api.getProjectsByTeam(params)
    let id = wx.getStorageSync('currProjectId')

    if (id && res.data.length > 0) {
      let index = res.data.findIndex(item => item.id === id)
      index = index < 0 ? 0 : index
      // 注意格式化
      // [res.data[0], res.data[index]] = [res.data[index], res.data[0]]
      res.data.splice(0, 0, res.data[index])
      res.data.splice(index + 1, 1)
      this.setData({
        currProjectIndex: 0
      })
    }
    this.setData({
      projectList: res.data
    })
  },
  //获取团队下的成员列表
  async getTeamMemberList(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
    // let len = this.data.memberList.length
    // if (len <= 0) {
    let teamCurrId = wx.getStorageSync('teamCurrId')
    let params = {
      method: 'GET',
      query: {
        teamId: teamCurrId
      }
    }
    let res = await _api.getTeamMemberList(params)
    this.setData({
      memberList: res.data
    })
    // }
  },
  checkboxChange(e) {
    let currTeamMemberList = []
    let currCheckItem = ''
    e.detail.value.forEach(item => {
      currCheckItem = this.data.memberList.filter(el => el.userId == item)[0]
      currCheckItem.checked = true
      currTeamMemberList.push(currCheckItem.nickname)
    })
    this.setData({
      copyUserIdList: e.detail.value,
      currTeamMemberList
    })
  },
  bindTimeChange(e) {
    let { value } = e.detail
    let { timeArray } = this.data
    this.setData({
      workTimeStr: timeArray[value]
    })
  },
  //提交数据
  async saveVoiceAttribute() {
    let {
      recentTime,
      address,
      copyUserIdList,
      workTimeStr,
      voiceId,
      projectList
    } = this.data
    let workTime = 0
    if (workTimeStr) {
      let workTimeArr = workTimeStr.split(':')
      workTime = parseInt(workTimeArr[0]) * 60 + parseInt(workTimeArr[1])
    }

    let currProjectId= wx.getStorageSync('currProjectId')

    let params = {
      headerType: 'application/json',
      query: {
        teamId: wx.getStorageSync('teamCurrId') || '',
        projectId: currProjectId ? currProjectId : ( projectList.length>0 ? projectList[0].id : '' ),
        voiceId,
        address,
        copyUserIdList,
        workTime,
        currentDate: recentTime //时间
      }
    }
    let res = await _api.saveVoiceAttribute(params)
    console.log(res)
    if (res.code === 200) {
      this.setData({
        hideRefresh: false,
        voiceId: '',
        voiceMsg: '',
        address: '',
        copyUserIdList: '',
        workTimeStr: '',
        recentTime: '',
        imgList: [],
        currTeamMemberList: [],
        copyUserIdList: []
      })
    }
  },
  validate() {
    if (!this.data.voiceId) {
      wxModal.alert('请先说语音哦.')
    }
  },
  //拒绝加入
  reject() {
    this.setData({
      showModal: false
    })
  },
  //加入团队
  async join() {
    let { shareTeamId } = this.data.shareMessage
    let params = {
      suffix: `?teamId=${shareTeamId}`
    }
    let res = await _api.joinTeam(params)
    console.log(res)
    if (res.code === 200) {
      wxModal.alert('加入成功')
    }
    this.setData({
      showModal: false
    })
  },
  async isRegister() {
    if (wx.getStorageSync('userInfo')) {
      return
    }
    let res = await _api.Login()
    let { msg, data } = res
    if (data.isRegister === 0) {
      wxModal.alert(msg || '系统开小差了..')
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.isRegister()
    let { teamName, teamId, data } = options
    if (teamName && teamId) {
      let shareMessage = {
        shareTeamId: teamId,
        teamName: teamName
      }
      wx.setStorageSync('shareMessage', shareMessage)
      this.setData({
        showModal: true,
        shareMessage
      })
    }
    if (data) {
      let { reminderTime, id, workTime, voiceContent } = JSON.parse(data)
      let workTimeStr
      if (workTime != 0) {
        if (workTime / 60 >= 1) {
          workTimeStr = `0${workTime / 60}:${
            workTime % 60 === 0 ? '00' : workTime % 60
          }`
        } else {
          workTimeStr = `00:${workTime % 60}`
        }
      }
      if (id) {
        this.setData({
          recentTime: reminderTime,
          voiceMsg: voiceContent,
          workTimeStr,
          voiceId: id,
          hideRefresh: true
        })
      }
    }
    qqmapsdk = new QQMapWX({
      key: 'PCMBZ-DHPK6-SC3SJ-EJOZW-IY4N2-LRFS5'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (wx.canIUse('hideHomeButton')) {
      wx.hideHomeButton()
    }
    this.getSelfTeamList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
