// pages/home/hone.js
const app = getApp()
let _api = app.globalData._api
import wxModal from '../../utils/wxModal'
import wxApi from '../../utils/wxApi'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isAuthSetting: false,
    showModal: false,
    shareMessage: ''
  },
  getRecordMsg(val) {
    console.log('val', val)
    wx.redirectTo({
      url: `/pages/speak/speak?data=${JSON.stringify(val.detail)}`
    })
    // 获取语言
  },

  toReview() {
    wx.navigateTo({
      url: '/pages/review/review'
    })
  },
  //拒绝加入
  reject() {
    this.setData({
      showModal: false
    })
    wx.removeStorageSync('shareMessage')
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
    wx.removeStorageSync('shareMessage')
  },
  isFirstOpen() {
    let date = new Date()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let monthDay = wx.getStorageSync('month-day')
    if (!monthDay) {
      wx.setStorageSync('month-day', [month, day])
      return true
    }
    if (monthDay[0] === month && monthDay[1] === day) {
      return false
    } else {
      wx.setStorageSync('month-day', [month, day])
      return true
    }
  },
  async isRegister() {
    if (!wx.getStorageSync('userInfo')) {
      return
    }
    let res = await _api.Login()
    let { msg, data } = res
    if (data.isRegister === 0) {
      wxModal.alert(msg || '系统开小差了..')
      return
    }
    if (!this.isFirstOpen()) {
      wx.redirectTo({
        url: '/pages/speak/speak'
      })
    }
  },

  async bindGetUserInfo(e) {
    let { userInfo } = e.detail
    if (userInfo) {
      this.setData({
        isAuthSetting: true
      })
      wx.setStorageSync('userInfo', JSON.stringify(userInfo))
      this.updateWxUserInfo()
      this.isRegister()
    }
  },

  async updateWxUserInfo() {
    bindGetUserInfo
    let { userInfo } = await wxApi.getUserInfo()
    console.log(userInfo)
    let params = {
      method: 'PUT',
      headerType: 'application/json',
      query: {
        ...userInfo
      }
    }
    await _api.updateWxUserInfo(params)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let shareMessage = wx.getStorageSync('shareMessage')
    if (wx.getStorageSync('userInfo')) {
      if (shareMessage) {
        this.setData({
          showModal: true,
          shareMessage
        })
      }
      this.setData({
        isAuthSetting: true
      })
    }
    this.isRegister()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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
