// pages/fillInDetails/fillInDetails.js
import api from '../../api/request'
import wxModal from '../../utils/wxModal'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    questionList: [1, 2, 3],
    lookPlanObj: [],
    elementHeight: ''
  },

  async getLookPlan() {
    let params = {
      method: 'GET'
    }
    let res = await api.getLookPlan(params)
    let { resp_code, datas } = res
    if (resp_code === 0) {
      datas.startDay = datas.startDay.slice(-5)
      datas.endDay = datas.endDay.slice(-5)
      this.setData({
        lookPlanObj: datas
      })
    }
    this.drowsyUserInfo()
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
    for (let j = 1; j < 35; j++) {
      //用for循环达到重复输出文字的效果，这个for循环代表纵向循环
      ctx.beginPath()
      ctx.setFontSize(20)
      ctx.setFillStyle('rgba(169,169,169,.2)')
      ctx.fillText(name_xx, 0, 100 * j)
      for (let i = 1; i < 35; i++) {
        //这个for循环代表横向循环，
        ctx.beginPath()
        ctx.setFontSize(20)
        ctx.setFillStyle('rgba(169,169,169,.2)')
        ctx.fillText(name_xx, 180 * i, 100 * j)
      }
    } //两个for循环的配合，使得文字充满斜对角线的左下部分

    //对斜对角线以右部分进行文字的填充逻辑同上
    for (let j = 0; j < 35; j++) {
      ctx.beginPath()
      ctx.setFontSize(20)
      ctx.setFillStyle('rgba(169,169,169,.2)')
      ctx.fillText(name_xx, 0, -100 * j)
      for (let i = 1; i < 35; i++) {
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
    this.getLookPlan()
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
