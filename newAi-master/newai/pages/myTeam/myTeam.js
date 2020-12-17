// pages/myTeam/myTeam.js
import wxModal from '../../utils/wxModal'
const app = getApp()
let _api = app.globalData._api

Page({
  /**
   * 页面的初始数据
   */
  data: {
    memberList: [],
    currTeam: '',
    currMemberIndex: '',
    isModify: '',
    teamList: [],
    teamCurrId: '',
    teamCurrIndex: '',
    addTeamValue: '',
    userInfo: ''
  },
  //获取团队下的成员列表
  async getTeamMemberList() {
    let { teamCurrId } = this.data
    console.log(teamCurrId)
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
  },
  async modifyTeamLeader(e) {
    let { index } = e.currentTarget.dataset
    this.setData({
      currMemberIndex: index
    })
  },
  async setMemberLevel() {
    let { teamCurrId } = this.data
    let { currMemberIndex } = this.data
    if (currMemberIndex === '') {
      return
    }
    let { userId, isLeader } = this.data.memberList[currMemberIndex]
    let params = {
      method: 'PUT',
      headerType: 'application/json',
      query: {
        teamId: teamCurrId,
        userId,
        isLeader: isLeader ? 0 : 1
      }
    }
    let res = await _api.setMemberLevel(params)
    if (res.code === 200) {
      this.data.memberList[currMemberIndex].isLeader = isLeader ? 0 : 1
      this.setData({
        memberList: this.data.memberList,
        currMemberIndex: ''
      })
    }
  },
  modifyTeam(e) {
    let { type } = e.target.dataset
    switch (type) {
      case 'switchTeam':
        this.getSelfTeamList()
        this.setData({
          isModify: true
        })
        break
      case 'setLevel':
        this.setMemberLevel()
        break
      case 'submitSwitchTeam':
        let { teamCurrIndex, teamList, teamCurrId } = this.data
        if (teamCurrIndex === '') {
          wxModal.alert('切换成功.')
          wx.removeStorageSync('currProjectId')
          this.setData({
            isModify: false
          })
          return
        }
        wx.setStorageSync('teamCurrId', teamCurrId)
        wx.setStorageSync('currTeam', teamList[teamCurrIndex])
        this.setData({
          isModify: false,
          currTeam: teamList[teamCurrIndex],
          teamCurrIndex: ''
        })
        this.getTeamMemberList()
        break
      case 'addTeam':
        this.addTeam()
        break
      default:
        break
    }
  },
  //获取团队列表
  async getSelfTeamList() {
    let params = {
      method: 'GET'
    }
    let res = await _api.getSelfTeamList(params)
    console.log(res)
    if (res.code === 200) {
      this.setData({
        teamList: res.data
      })
      // this.getTeamCurrId()
    }
  },
  //切换团队
  getTeamCurrId(e) {
    console.log(e.currentTarget.dataset)
    let { id, index } = e.currentTarget.dataset
    this.setData({
      teamCurrId: id,
      teamCurrIndex: index
    })
    // let teamCurrId = wx.getStorageSync('teamCurrId')
    // let id = (e && e.detail) || teamCurrId
  },
  getAddTeamValue(e) {
    let { value } = e.detail
    this.setData({
      addTeamValue: value
    })
  },
  async addTeam() {
    if (!this.data.addTeamValue) {
      wxModal.alert('请输入团队名称.')
      return
    }
    let params = {
      method: 'POST',
      headerType: 'application/json',
      query: {
        teamName: this.data.addTeamValue
      }
    }
    let res = await _api.addTeam(params)
    if (res.code === 200) {
      this.data.teamList.push(res.data)
      wxModal.alert('添加成功.')
      this.setData({
        addTeamValue: '',
        teamList: this.data.teamList
      })
    }
  },
  async removeMemberByTeam() {
    let { teamCurrId, currMemberIndex } = this.data
    let { userId } = this.data.memberList[currMemberIndex]
    let params = {
      suffix: `?teamId=${teamCurrId}&userId=${userId}`
    }
    let res = await _api.removeMemberByTeam(params)
    let { code } = res
    if (code === 200) {
      wxModal.alert('用户删除成功.')
      this.data.memberList.splice(currMemberIndex, 1)
      this.setData({
        memberList: this.data.memberList
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      currTeam: wx.getStorageSync('currTeam'),
      teamCurrId: wx.getStorageSync('teamCurrId')
    })
    this.getTeamMemberList()
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
  onShareAppMessage: function() {
    return {
      title: `${this.data.userInfo.nickName}邀请你进入团队`,
      path: `/pages/speak/speak?teamName=${this.data.currTeam.teamName}&teamId=${this.data.currTeam.id}`,
      imageUrl: '/images/loginHeader.jpg', // 可以更换分享的图片
      success: function(res) {
        console.log(res)
        wxModal.alert(this.data.currTeam)
        // 转发成功
        wx.showToast({
          title: '分享成功',
          icon: 'none'
        })
      },
      fail: function(res) {
        console.log(res)
        // 转发失败
        wx.showToast({
          title: '分享失败',
          icon: 'none'
        })
      }
    }
  }
})
