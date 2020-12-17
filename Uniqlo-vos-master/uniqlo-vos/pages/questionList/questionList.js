// pages/questionList/questionList.js
import PageModel from '../../utils/paginationModel'
import api from '../../api/request'
import wxModal from '../../utils/wxModal'

let pageModel = new PageModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    questionList: []
  },
  toDetails(e) {
    let { item } = e.currentTarget.dataset
    console.log(item)
    // if (item.isComplete === 1) {
    //   wxModal.alert("该问卷已完成..");
    //   return;
    // }
    switch (item.psqStatus) {
      // case 0:
      //   wxModal.alert("该问卷已过期..");
      //   break;
      // case 2:
      //   wxModal.alert("该问卷未开始..");
      //   break;

      default:
        wx.navigateTo({
          url: `/pages/questionDetails/questionDetails?id=${item.id}`
        })
        break
    }
  },
  //TODO逻辑需要测试
  async getQuestionList() {
    // 分页;
    let res = await pageModel.pullToRefresh(api.getQuestionList)
    console.log(res)
    let { code, count, datas } = res
    this.setData({
      questionList: datas.records
    })
  },
  //加载更多
  async getMoreQuestionList() {
    // 分页;
    let { questionList } = this.data
    console.log(pageModel.checkLoadMore(questionList))
    if (pageModel.checkLoadMore(questionList)) {
      let res = await pageModel.more(api.getQuestionList)
      let newQuestionList = questionList.concat(res.data)
      this.setData({
        questionList: newQuestionList
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

    console.log(pageModel)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getQuestionList()
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
  onReachBottom: function() {
    this.getMoreQuestionList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
