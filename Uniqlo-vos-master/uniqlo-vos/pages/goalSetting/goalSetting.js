// pages/goalSetting/goalSetting.js
import api from '../../api/request'
import wxModal from '../../utils/wxModal'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    questionObj: {},
    type: '',
    curIndex: 0 //当前选中输入框
  },
  // 获取标准数量/人
  getStandardNum(e) {
    let { value } = e.detail
    let { curIndex, questionObj } = this.data
    questionObj.targetSettingVOS[curIndex].num = value
    this.setData({
      questionObj
    })
  },
  getInputItem(e) {
    console.log(e)
    let { index } = e.currentTarget.dataset
    let { targetSettingVOS } = this.data.questionObj
    if (!targetSettingVOS || targetSettingVOS.length <= 0) {
      return
    }
    this.setData({
      curIndex: index
    })
  },
  //提交接口
  async onSubmit(e) {
    let { index } = e.currentTarget.dataset
    let { questionObj, curIndex } = this.data
    // console.log("提交数据", standardNum.trim());
    let { num, qusuId, suveyId } = questionObj.targetSettingVOS[index]
    if (!num) {
      wxModal.alert('请输入问卷目标')
      return
    }
    let params = {
      query: {
        num: +num,
        qusuId: qusuId || suveyId,
        classify: this.data.type
      },
      headerType: 'application/json'
    }
    let res = await api.targetSetting(params)
    if (res.resp_code === 0) {
      wxModal.alert('问卷目标设定成功.')
      // wx.navigateBack({
      //   delta: 1
      // });
    } else {
      wxModal.alert('问卷目标设定失败.')
    }
  },
  //获取问卷列表
  async getQueryList() {
    // let { shopId } = JSON.parse(wx.getStorageSync("userInfo"));
    let params = {
      // query: {
      //   shopId
      // },
      // 2 开放问卷 1 定向问卷
      query: {
        classify: this.data.type
      },
      method: 'GET'
    }
    let res = await api.getQueryList(params)
    let { startDay, endDay } = res.datas
    res.datas.startDay = startDay.slice(-5)
    res.datas.endDay = endDay.slice(-5)
    this.setData({
      questionObj: res.datas
    })
    setTimeout(() => {
      this.drowsyUserInfo()
    }, 0)
  }, //生成水印浮层
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
    this.setData({
      standardNum: wx.getStorageSync('dingXiangAllCount'),
      type: options.type
    })

    this.getQueryList()
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
