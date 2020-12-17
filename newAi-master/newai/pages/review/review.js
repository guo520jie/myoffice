// pages/review/review.js
const app = getApp()
let _api = app.globalData._api
let wxModal = app.globalData.wxModal

Page({
  /**
   * 页面的初始数据
   */
  data: {
    memberList: [],
    dayList: [1, 2, 3],
    currDayIndex: 0,
    currWeek: '', //当前星期
    currDay: '', //当前日期
    pageType: 0,
    currMemberId: '',
    dateTimeList: [],
    toView: '',
    currDeltaY: 0,
    isChooseProject: false,
    projectList: [],
    currProjectItem: '',
    modalName: '',
    newWorkTime: '',
    currItemId: '',
    hourIndex: '',
    itemIndex: '',
    placeholder:'请确认工时'
  },


  //获取团队下的成员列表
  async getTeamMemberList() {
    // let len = this.data.memberList.length

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
  },
  getMemberCurrId(e) {
    let { detail } = e
    this.setData({
      currMemberId: detail
    })
    let data = new Date(this.data.currDayTime)
    let time = `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`
    if (this.data.pageType == 0) {
      this.getCalendarViewData(time)
    } else {
      this.getProjectViewData(time)
    }
  },
  getRecordMsg(e) {
    console.log(e)
    //创建和任务开始的时间 一个时长
    let { voiceContent } = e.detail
    if (voiceContent) {
      this.setData({
        hideRefresh: true
      })
    }
    // 获取语言
  },
  getCurrDay(type) {
    let currDayTime = this.data.currDayTime || new Date()
    let date = ''
    switch (type) {
      case 'next':
        date = new Date(+currDayTime - 1000 * 60 * 60 * 24)
        break
      case 'back':
        date = new Date(+currDayTime + 1000 * 60 * 60 * 24)
        break
      default:
        date = currDayTime
        break
    }
    let week = date.getDay()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let weekList = ['日', '一', '二', '三', '四', '五', '六']
    this.setData({
      currWeek: weekList[week],
      currDay: day,
      currDayTime: date
    })
    switch (this.data.isChooseProject) {
      case false:
        this.getCalendarViewData(`${year}-${month}-${day}`)
        break
      case true:
        this.getProjectViewData(`${year}-${month}-${day}`)
        break
      default:
        break
    }
  },
  //
  async getCalendarViewData(time) {
    let { currMemberId, memberList } = this.data
    if (memberList && memberList.length <= 0) {
      return
    }
    let teamCurrId = wx.getStorageSync('teamCurrId')
    let userId = currMemberId ? currMemberId : memberList[0].userId
    let hours = new Date().getHours()
    let timeValue = hours > 12 ? `pm${hours - 12}` : `am${hours}`

    let params = {
      method: 'GET',
      query: {
        teamId: teamCurrId,
        userId,
        date: time
        // teamId: 78,
        // userId: 28761,
        // date: '2020-06-26'
      }
    }
    let res = await _api.getCalendarViewData(params)
    this.setData({
      dateTimeList: res.data
    })
    setTimeout(() => {
      this.setData({
        toView: timeValue
      })
    }, 0)
  },
  async getProjectViewData(time) {
    let { currMemberId, memberList, currProjectItem } = this.data
    if (memberList && memberList.length <= 0) {
      return
    }
    let userId = currMemberId ? currMemberId : memberList[0].userId
    let hours = new Date().getHours()
    let timeValue = hours > 12 ? `pm${hours - 12}` : `am${hours}`
    let params = {
      method: 'GET',
      query: {
        // teamId: teamCurrId,
        // userId,
        // date: time,
        projectId: currProjectItem.id,
        userId,
        date: time
      }
    }
    let res = await _api.getProjectViewData(params)
    this.setData({
      dateTimeList: res.data
    })
    setTimeout(() => {
      this.setData({
        toView: timeValue
      })
    }, 0)
  },
  calendarSwiper(e) {
    let { currDayIndex } = this.data
    let current = e.detail.current
    let flag =
      current - currDayIndex == -2 || current - currDayIndex == 1 ? 1 : -1
    console.log(flag)
    console.log(currDayIndex)
    this.setData({
      currDayIndex: current
    })
    switch (flag) {
      case 1:
        this.getCurrDay('back')
        break
      default:
        this.getCurrDay('next')
        break
    }
  },

  // 切换日列视图
  dateChange(e) {
    let { detail } = e
    this.setData({
      pageType: +detail
    })
    console.log(detail)
    if (+detail === 1) {
      this.getProjectsByTeam()
    } else {
      this.setData({
        currProjectItem: '',
        isChooseProject: false
      })
      this.getCurrDay()
    }
  },
  async getProjectsByTeam() {
    let teamCurrId = wx.getStorageSync('teamCurrId')
    let params = {
      method: 'GET',
      query: {
        teamId: teamCurrId
      }
    }
    let res = await _api.getProjectsByTeam(params)
    this.setData({
      projectList: res.data
    })
  },
  toProjectList() {
    this.setData({
      isChooseProject: false,
      pageType: 1
    })
  },
  getProjectIndex(e) {
    let { index } = e.currentTarget.dataset
    this.setData({
      currProjectItem: this.data.projectList[index],
      isChooseProject: true,
      pageType: 0
    })

    let { currDayTime } = this.data
    let day = currDayTime.getDate()
    let month = currDayTime.getMonth() + 1
    let year = currDayTime.getFullYear()
    this.getProjectViewData(`${year}-${month}-${day}`)
  },
  checkedTap(e) {
    let { index, i } = e.currentTarget.dataset
    let newDateTimeList = this.data.dateTimeList
    let currItem = newDateTimeList[index].itemList[i]
    console.log(currItem)
    switch (+currItem.status) {
      case 11:
        currItem.status = 0
        break
      default:
        this.setData({
          modalName: 'Modal',
        })
        // currItem.status = 11
        break
    }
    this.setData({
      dateTimeList: newDateTimeList,
      currItemId: currItem.voiceId,
      hourIndex: index,
      itemIndex: i
    })
  },
  hideModal() {
    this.setData({
      modalName: ''
    })
  },

  onFocus(){
    this.setData({
      placeholder:''
    })
  },

  getNewWorkTime(e) {
    let { value } = e.detail
    this.setData({
      newWorkTime: value,
      placeholder:'请确认工时'
    })
  },
  async updateTime() {
    let {
      newWorkTime,
      currItemId,
      dateTimeList,
      hourIndex,
      itemIndex
    } = this.data
    // if (!newWorkTime.includes(':') && newWorkTime.length < 5) {
    //   wxMojdal.alert('时间格式有问题!')
    //   return
    // }
    let workTimeArr
    if (parseFloat(newWorkTime)) {
      workTimeArr = parseInt(parseFloat(newWorkTime) * 60)
    } else {
      wxMojdal.alert('时间格式有问题!')
      return
    }

    let status =
      dateTimeList[hourIndex].itemList[itemIndex].status == 11 ? 0 : 11

    let params = {
      method: 'PUT',
      headerType: 'application/json',
      suffix: `?voiceId=${currItemId}&workTime=${workTimeArr}&status=${status}`
    }

    let res = await _api.updateVoiceWorkTime(params)
    if (res.code === 200) {
      wxModal.alert('修改成功.')
      dateTimeList[hourIndex].itemList[itemIndex].workTime = newWorkTime
      dateTimeList[hourIndex].itemList[itemIndex].status = status
      this.setData({
        modalName: '',
        dateTimeList
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await this.getTeamMemberList()
    await this.getCurrDay()
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
