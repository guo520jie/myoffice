const fetch = require('../../utils/fetch.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: [] // 详情数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch(`shops/${options.id}`)
      .then(res => {
        this.setData({
          shop: res.data
        })
      })
  },

  // 预览图片
  previewImage(e) {
    // 获取到当前图片地址以及图片地址数组
    const { current, urls } = e.currentTarget.dataset

    // 注意：current 是 urls 中的一项，如果 current 在urls中不存在，就会默认展示urls中的第一张图片

    wx.previewImage({
      current,  // 当前要预览图片的地址
      urls, // 要预览图片地址的集合
    })
  }
})