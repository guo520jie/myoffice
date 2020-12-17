// pages/userInfo/userInfo.js
const app = getApp()
let _api = app.globalData._api
let wxModal = app.globalData.wxModal
import wxApi from '../../utils/wxApi'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    currTeam: '',
    currLanguage: app.globalData.currLanguage,
    isLeader: '',
    settingList: [
      {
        name: '我的团队',
        toPath: 'myTeam',
        image: '/images/icon_2-removebg-preview.png',
        color: 'border: 2rpx solid #FED402;'
      },
      {
        name: '我的项目',
        toPath: 'myProject',
        image: '/images/icon-removebg-preview.png',
        color: 'border: 2rpx solid rgba(75, 116, 227, 1);'
      }
    ]
  },
  async getUserInfo() {
    let { userInfo } = await wxApi.getUserInfo()
    this.setData({
      userInfo
    })
  },
  toSpeak() {
    wx.redirectTo({
      url: '/pages/speak/speak'
    })
  },
  toPathFn(e) {
    let { path } = e.currentTarget.dataset
    // if (!this.data.currTeam) {
    //   wxModal.alert('请先加入团队哦.')
    //   return
    // }
    wx.navigateTo({
      url: `/pages/${path}/${path}`
    })
  },
  async getLevelByTeam() {
    let teamCurrId = wx.getStorageSync('teamCurrId')
    if (!teamCurrId) {
      return
    }
    let params = {
      method: 'GET',
      query: {
        teamId: teamCurrId
      }
    }
    let res = await _api.getLevelByTeam(params)
    let { isLeader } = res.data
    if (isLeader) {
      this.setData({
        isLeader
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userInfo:
        wx.getStorageSync('userInfo') &&
        JSON.parse(wx.getStorageSync('userInfo'))
    })
    // this.getUserInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getLevelByTeam()
    this.setData({
      currTeam: wx.getStorageSync('currTeam')
    })
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
