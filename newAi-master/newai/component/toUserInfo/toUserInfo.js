// component/toUserInfo/toUserInfo.js
const app = getApp()
let wxModal = app.globalData.wxModal
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userList: {
      type: Array,
      value: () => []
    },
    teamList: {
      type: Array,
      value: () => []
    },
    showTeam: {
      type: Boolean,
      value: false
    },
    showUser: {
      type: Boolean,
      value: false
    },
    showDate: {
      type: Boolean,
      value: false
    },
    teamCurrId: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    teamCurrIndex: 0,
    memberCurrIndex: 0,
    dateList: ['日历视图', '项目视图'],
    dateCurrIndex: 0
  },
  observers: {
    teamList: function(value) {
      console.log(value)
      if (value.length > 0) {
        this.getTeamCurrIndex()
      }
    },
    teamCurrId(value) {
      console.log('observers=>', value)
      let index = this.data.teamList.findIndex(item => item.id == value)
      this.setData({
        teamCurrIndex: index
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindTeamListChange(e) {
      console.log(e)
      let index = (e.detail && e.detail.value) || e
      this.setData({
        teamCurrIndex: +index
      })
      let { id } = this.data.teamList[+index]
      this.triggerEvent('getTeamCurrId', id)
      wx.setStorageSync('teamCurrId', id)
      wx.setStorageSync('currTeam', this.data.teamList[+index])
    },
    getTeamCurrIndex() {
      let teamCurrId = wx.getStorageSync('teamCurrId')
      let index = this.data.teamList.findIndex(item => item.id == teamCurrId)
      index = index === -1 ? 0 : index
      this.bindTeamListChange(index)
    },
    bindUserListChange(e) {
      let { value } = e.detail
      this.setData({
        memberCurrIndex: +value
      })
      let { userId } = this.data.userList[+value]
      this.triggerEvent('getMemberCurrId', userId)
    },
    bindDateChange(e) {
      let { value } = e.detail
      console.log(value)
      this.setData({
        dateCurrIndex: +value
      })
      this.triggerEvent('dateChange', value)
    },
    toUserInfo() {
      wx.navigateTo({
        url: '/pages/userInfo/userInfo'
      })
    }
  },
  attached: function() {
    console.log(this.data.userList)
  }
})
