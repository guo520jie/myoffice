// pages/user/user.js
import api from '../../api/request'
import wxModal from '../../utils/wxModal'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isAuthSetting: false,
    userInfo: '',
    modal: false,
    queryProgress: {},
    queryProgressType: 1,
    progressMsg: '店铺进度',
    noticeObject: {}
  },
  async getUserInfo() {
    let params = {
      method: 'GET',
      hideLoading: true
    }
    let res = await api.getWeChatUserInfo(params)
    let {
      name, //用户姓名
      mobile, //手机号码
      avatar, // 头像大图
      qrCode, //用户二维码
      thumbAvatar, // 头像小图
      gender, // "1"男  '2' 女  '0'未定义
      isLeader, //在所在的部门是否为领导
      isLeaderInDept, //所在部门,
      position, //职务,
      address, //地址,
      extAttrs, // 部门代码信息
      shopId, //店铺 ID,
      userId, //用户 ID
      virtualAddress,
      virtualShopId,
      virtualShopCode
    } = res.datas

    // let depCode = extAttrs.filter(item => item.name === "部门代码")[0].value;
    let userInfo = {
      name, //用户姓名
      mobile, //手机号码
      avatar, // 头像大图
      qrCode, //用户二维码
      thumbAvatar, // 头像小图
      gender, // "1"男  '2' 女  '0'未定义
      isLeader, //在所在的部门是否为领导
      isLeaderInDept, //所在部门,
      position, //职务,
      address, //地址,
      // depCode,
      shopId, //店铺 ID
      userId,
      virtualAddress,
      virtualShopId,
      virtualShopCode
    }
    wx.setStorageSync('userInfo', JSON.stringify(userInfo))
    console.log(userInfo)
    if (userInfo) {
      this.setData({
        userInfo,
        isAuthSetting: true
      })
      this.queryProgress()
    }
    wxModal.loaded()
  },
  async bindGetUserInfo(e) {
    let { userInfo } = e.detail
    if (userInfo) {
      this.setData({
        isAuthSetting: true
      })
      this.getUserInfo()
    }
  },
  navigateFn(e) {
    let noticeForUse = wx.getStorageSync('noticeForUse')
    if (!noticeForUse) {
      this.setData({
        modal: true
      })
      return
    }
    let { name, type } = e.currentTarget.dataset
    // if (name === "questionAnalysis" || name === "goalSetting") {
    //   wxModal.alert("功能建设中..");
    //   return;
    // }

    wx.navigateTo({
      url: type
        ? `/pages/${name}/${name}?type=${type}`
        : `/pages/${name}/${name}`
    })
  },
  // refresh() {
  //   this.queryProgress();
  // },
  hideModal() {
    wx.setStorageSync('noticeForUse', true)
    this.setData({
      modal: false
    })
  },
  noModal() {
    this.setData({
      modal: false
    })
  },
  async queryProgress() {
    let { shopId } = JSON.parse(wx.getStorageSync('userInfo'))
    let params = {
      query: {
        type: this.data.queryProgressType,
        shopid: shopId
      },
      hideLoading: true,
      method: 'GET'
    }
    let res = await api.queryProgress(params)
    if (res.resp_code === 0) {
      let {
        dingXiangAllCount,
        dingXiangFinishQuestCount,
        globalFinishQuestCount,
        num,
        globalAllCount
      } = res.datas
      let newGlobalAllCount = globalAllCount ? globalAllCount : 1
      wx.setStorageSync('dingXiangAllCount', dingXiangAllCount)
      let dingXiangPercentage =
        (+dingXiangFinishQuestCount / +dingXiangAllCount) * 100
      let globalPercentage = (+globalFinishQuestCount / newGlobalAllCount) * 100
      let dingXiangWidth = `${
        dingXiangPercentage >= 100 ? 100 : dingXiangPercentage
      }%`
      let globalWidth = `${globalPercentage >= 100 ? 100 : globalPercentage}%`
      let queryProgress = {
        dingXiangWidth,
        globalWidth,
        dingXiangAllCount,
        dingXiangFinishQuestCount,
        globalFinishQuestCount,
        newGlobalAllCount
      }
      this.setData({ queryProgress })
    }
  },
  //跳转问卷填写详情
  toFillInDetails() {
    let { isLeader, virtualShopCode } = this.data.userInfo
    if (virtualShopCode === 'VOS_HEAD_OGRAN_CODE') {
      return
    }
    if (isLeader == 1 || virtualShopCode === 'VOS_MANAGE_OGRAN_CODE') {
      wx.navigateTo({
        url: '/pages/fillInDetails/fillInDetails'
      })
    }
  },
  async getNoticeData() {
    let params = {
      method: 'GET'
    }
    let res = await api.getNoticeData(params)
    console.log(res)
    if (res.datas.noticeList.length > 0) {
      res.datas.noticeStr = res.datas.noticeList.join()
      this.setData({
        noticeObject: res.datas
      })
    }
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.drowsyUserInfo()
    if (!wx.getStorageSync('noticeForUse')) {
      this.setData({
        modal: true
      })
    }
    if (!wx.getStorageSync('userInfo')) {
      this.setData({
        isAuthSetting: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (wx.getStorageSync('userInfo')) {
      this.getUserInfo()
    }
    this.getNoticeData()
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
