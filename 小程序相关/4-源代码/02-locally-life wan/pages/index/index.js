// 导入 fetch
const fetch = require('../../utils/fetch.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], // 轮播图数组
    categories: [] // 九宫格菜单
  },

  /**
   * 生命周期函数--监听页面加载
   * 在这个钩子函数中，发送请求，获取数据
   */
  onLoad: function (options) {
    // 获取轮播图数据
    fetch('slides')
      .then(res => {
        this.setData({
          list: res.data
        })
      })
    
    // 获取九宫格菜单
    fetch('categories')
      .then(res => {
        this.setData({
          categories: res.data
        })
      })

    /* wx.request({
      // url 表示接口地址
      url: 'https://locally.uieee.com/slides',
      // success 成功的回调函数
      success: (res) => {
        // console.log(res.data)
        this.setData({
          list: res.data
        })
      },
      // 失败的回调函数
      fail: function (err) {
        console.log(err)
      }
    })

    // 获取九宫格菜单
    wx.request({
      url: 'https://locally.uieee.com/categories',
      success: res => {
        this.setData({
          categories: res.data
        })
      }
    }) */
  }
})