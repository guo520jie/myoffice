// pages/questionAnalysis/questionAnalysis.js
import api from '../../api/request'
import wxModal from '../../utils/wxModal'
import WxModal from '../../utils/wxModal'
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
    total: 0,
    currentId: '',
    elementHeight: '',
    productCode: '',
    showProductBox: false
  },
  //跳转 问卷收集列表
  toQuestionAnalysisList(e) {
    let { selectType, currentId, userInfo } = this.data
    if (+selectType !== 2) {
      return
    }

    let { id } = e.currentTarget.dataset
    let item = {}
    item.id = id
    item.addressId = currentId || userInfo.shopId
    wx.navigateTo({
      url: `/pages/questionAnalysisList/questionAnalysisList?item=${JSON.stringify(
        item
      )}`
    })
  },

  //获取本周
  getWeek(e) {
    let { detail } = e
    console.log(detail)
    this.setData({
      selectType: detail,
      productList: [],
      total: 0,
      productCode: '',
      showProductBox: false
    })
    this.getAnalyzeList(this.data.currentId)
  },
  //获取自定义
  getToCustom(e) {
    let { detail } = e
    console.log(detail)
    this.setData({
      selectType: detail,
      productList: [],
      total: 0,
      productCode: '',
      showProductBox: false
    })
    this.getAnalyzeList(this.data.currentId)
  },
  MultiColumnChange(e) {
    WxModal.loading()
    let data = {
      objectMultiArray: this.data.objectMultiArray,
      multiIndex: this.data.multiIndex,
      multiArray: this.data.multiArray
    }
    let index = e.detail.value
    let column = e.detail.column
    data.multiIndex[column] = index
    console.log(column)
    switch (column) {
      case 0:
        let cityList = data.multiArray[index].children
        data.multiIndex[1] = 0
        data.multiIndex[2] = 0
        data.objectMultiArray[1] = [{ name: '一' }]
        data.objectMultiArray[2] = [{ name: '一' }]

        if (cityList && cityList[0].id) {
          cityList.unshift({ name: '一' })
        }
        if (cityList && cityList.length > 0) {
          data.objectMultiArray[1] = cityList
        }
        // if (cityList && cityList[1].children && cityList[1].children[0].name) {
        //   cityList[1].children.unshift({ name: '一' })
        // }
        break
      case 1:
        data.multiIndex[2] = 0
        data.objectMultiArray[2] = [{ name: '一' }]

        let shopList =
          data.multiArray[data.multiIndex[0]].children[index].children
        if (shopList && shopList[0].id) {
          shopList.unshift({ name: '一' })
        }
        if (shopList && shopList.length > 0) {
          data.objectMultiArray[2] = shopList
        }
        break
      case 2:
        break
      default:
        break
    }
    this.setData(data)
    let currentId = ''
    let areaObj = data.objectMultiArray[0][data.multiIndex[0]]
    let cityObj = data.objectMultiArray[1][data.multiIndex[1]]
    let shopObj = data.objectMultiArray[2][data.multiIndex[2]]
    if (areaObj && (areaObj.id || areaObj.id === 0)) {
      currentId = areaObj.id
    }
    if (cityObj && cityObj.id) {
      currentId = cityObj.id
    }
    if (shopObj && shopObj.id) {
      currentId = shopObj.id
    }
    this.setData({
      currentId: currentId + ''
    })
    setTimeout(() => {
      WxModal.loaded()
    }, 300)
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
      // changeCurrentId: this.data.currentId
    })
    this.getAnalyzeList(this.data.currentId)
  },
  toDetails(e) {
    let { el, item } = e.currentTarget.dataset
    let { userInfo, currentId } = this.data
    el.selectType = this.data.selectType
    el.qusuId = item.qusuId
    el.addressId = currentId || userInfo.shopId
    wx.navigateTo({
      url: `/pages/goodsDetails/goodsDetails?item=${JSON.stringify(el)}`
    })
  },
  cancelPicker() {
    let newObjectMultiArray = this.data.objectMultiArray
    newObjectMultiArray[1] = [{ name: '一' }]
    newObjectMultiArray[2] = [{ name: '一' }]
    this.setData({
      currentId: '',
      multiIndex: [0, 0, 0],
      objectMultiArray: newObjectMultiArray
    })
    this.getAnalyzeList()
  },
  //获取门店逻辑
  async getDeptRange() {
    let multiArray = []
    let params = {
      method: 'GET'
    }
    let res = await api.getDeptRange(params)
    let headquarters = res.datas.find(
      item => item.uniqueCode === 'VOS_HEAD_OGRAN_CODE'
    )
    multiArray[0] = res.datas[0].children
    // multiArray[1] = res.datas[0].children[0].children;
    // multiArray[2] = res.datas[0].children[0].children[0].children;

    multiArray[1] = []
    multiArray[2] = []

    // multiArray[1] = [{ name: '一' }]
    // multiArray[2] = [{ name: '一' }]

    let allStore = res.datas[0].children.find(
      item => item.uniqueCode === 'VOS_ALL_OGRAN_CODE'
    )
    let allStoreIndex = res.datas[0].children.findIndex(
      item => item.uniqueCode === 'VOS_ALL_OGRAN_CODE'
    )
    if (allStore.uniqueCode && allStoreIndex) {
      res.datas[0].children.splice(allStoreIndex, 1)
      multiArray[0].unshift(allStore)
    }

    res.datas[0].children.push(headquarters)
    multiArray[0].unshift({ name: '本店铺' })

    this.setData({
      objectMultiArray: multiArray,
      multiArray: res.datas[0].children
    })
  },
  //获取调研商品列表
  async getAnalyzeList(currentId = '') {
    let { userInfo, selectType, productCode } = this.data
    let params = {
      query: {
        // addressId: currentId || userInfo.shopId,
        addressId: currentId ? currentId : userInfo.shopId,
        type: selectType,
        productCode
      },
      method: 'GET'
    }
    let res = await api.getAnalyzeList(params)
    if (res.resp_code === 0) {
      let { qusuProductVOS, questSize } = res.datas
      this.setData({
        productList: qusuProductVOS,
        total: questSize
      })
      this.drowsyUserInfo()
    } else {
      this.setData({
        productList: [],
        total: 0
      })
    }
  },
  // 返回默认默认店铺
  toDefaultShop() {
    console.log('1234');
    this.setData({
      currentId: '',
      multiIndex: [0, 0, 0]
    })
    this.getAnalyzeList()
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
  //通过商品 code 查询关联问卷下的商品
  async searchProductCode() {
    console.log(this.data.productCode)
    let len = this.data.productCode.length
    console.log(len)
    if (len === 0) {
      this.getAnalyzeList(this.data.currentId)
      this.setData({
        showProductBox: false
      })
    }
    if (len > 5) {
      this.getAnalyzeList(this.data.currentId)
      this.setData({
        showProductBox: true
      })
    }
  },
  //输入商品 code
  getProductCode(e) {
    let { value } = e.detail
    this.setData({
      productCode: value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userInfo = JSON.parse(wx.getStorageSync('userInfo'))
    this.setData({
      userInfo,
      navH: app.globalData.navHeight
    })
    this.getDeptRange()
    this.getAnalyzeList(this.data.currentId)
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
