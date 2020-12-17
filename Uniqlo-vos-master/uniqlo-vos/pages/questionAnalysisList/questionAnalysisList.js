// pages/questionAnalysisList/questionAnalysisList.js

import api from '../../api/request'
import wxModal from '../../utils/wxModal'
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectType: 1, // 2 自定义 1 当周
    objectMultiArray: [],
    multiIndex: [0, 0, 0],
    productList: [],
    multiArray: [],
    userInfo: '',
    currentId: '',
    elementHeight: '',
    qusuId: 0
  },
  MultiColumnChange(e) {
    let data = {
      objectMultiArray: this.data.objectMultiArray,
      multiIndex: this.data.multiIndex,
      multiArray: this.data.multiArray
    }
    let index = e.detail.value
    let column = e.detail.column
    data.multiIndex[column] = index
    switch (column) {
      case 0:
        let cityList = data.multiArray[index].children
        data.multiIndex[1] = 0
        data.multiIndex[2] = 0
        if (cityList && cityList[0].name) {
          cityList.unshift({ name: '' })
        }
        if (cityList && cityList[1].children[0].name) {
          cityList[1].children.unshift({ name: '' })
        }
        if (cityList) {
          data.objectMultiArray[1] = cityList
          data.objectMultiArray[2] = cityList[1].children
        }
        break
      case 1:
        if (!data.multiArray[data.multiIndex[0]].children) {
          return
        }
        let shopList =
          data.multiArray[data.multiIndex[0]].children[index].children
        if (shopList && shopList[0].name) {
          shopList.unshift({
            name: ''
          })
        }
        if (shopList) {
          data.objectMultiArray[2] = shopList
        }
        break
      case 2:
        break
      default:
        break
    }
    // console.log(data.objectMultiArray[data.multiIndex[1]]);
    // console.log(data.objectMultiArray[data.multiIndex[2]]);
    // multiIndex[0],multiIndex[1],multiIndex[2]
    this.setData(data)
    let currentId = ''
    let areaObj = data.objectMultiArray[0][data.multiIndex[0]]
    let cityObj = data.objectMultiArray[1][data.multiIndex[1]]
    let shopObj = data.objectMultiArray[2][data.multiIndex[2]]
    if (areaObj && areaObj.id) {
      currentId = areaObj.id
    }
    if (cityObj && cityObj.id) {
      currentId = cityObj.id
    }
    if (shopObj && shopObj.id) {
      currentId = shopObj.id
    }
    this.setData({
      currentId
    })
  },
  MultiChange(e) {
    let { value } = e.detail
    if (value[0] === 0 || value[0] === 1) {
      if (value[1] > 0 || value[2] > 0) {
        wxModal.alert('请选择正确的大区信息')
        this.setData({
          multiIndex: [0, 0, 0],
          currentId: ''
        })
        return
      }
    }
    this.setData({
      multiIndex: value
    })
    this.getQueryWithQusuList(this.data.currentId)
  },
  toDetails(e) {
    let { item } = e.currentTarget.dataset
    let { userInfo, currentId } = this.data
    item.selectType = this.data.selectType
    item.qusuId = this.data.productList[0].qusuId
    item.addressId = currentId || userInfo.shopId
    wx.navigateTo({
      url: `/pages/goodsDetails/goodsDetails?item=${JSON.stringify(item)}`
    })
  },
  cancelPicker() {
    this.setData({
      multiIndex: [0, 0, 0]
    })
  },
  //获取门店逻辑
  async getDeptRange() {
    let multiArray = []
    let params = {
      method: 'GET'
    }
    let res = await api.getDeptRange(params)
    multiArray[0] = res.datas[0].children
    multiArray[1] = res.datas[0].children[0].children
    multiArray[2] = res.datas[0].children[0].children[0].children
    multiArray[1].unshift({ name: '' })
    multiArray[2].unshift({ name: '' })

    let allStore = res.datas[0].children.find(item => item.id === 0)
    let allStoreIndex = res.datas[0].children.findIndex(item => item.id === 0)
    res.datas[0].children.splice(allStoreIndex, 1)
    multiArray[0].unshift(allStore)
    multiArray[0].unshift({ name: '本店铺' })
    this.setData({
      objectMultiArray: multiArray,
      multiArray: res.datas[0].children
    })
  },
  //获取调研商品列表
  async getQueryWithQusuList() {
    let { userInfo, currentId, qusuId } = this.data
    let params = {
      query: {
        // addressId: currentId || userInfo.shopId,
        addressId: currentId || userInfo.shopId,
        type: 2,
        qusuId,
        productCode: ''
      },
      method: 'GET'
    }
    let res = await api.getQueryWithQusu(params)
    if (res.resp_code === 0) {
      let { qusuProductVOS } = res.datas
      this.setData({
        productList: qusuProductVOS
      })
      this.drowsyUserInfo()
    } else {
      this.setData({
        productList: []
      })
    }
  },
  // 返回默认默认店铺
  toDefaultShop() {
    this.setData({
      multiIndex: [0, 0, 0],
      currentId: ''
    })
    this.getQueryWithQusuList()
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
  onLoad(options) {
    let userInfo = JSON.parse(wx.getStorageSync('userInfo'))
    let { id, addressId } = JSON.parse(options.item)
    console.log(options)
    this.setData({
      userInfo,
      navH: app.globalData.navHeight,
      qusuId: id,
      currentId: addressId
    })
    // this.getDeptRange()
    this.getQueryWithQusuList()
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
