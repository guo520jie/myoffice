// pages/goodsDetails/goodsDetails.js
let wxCharts = require("../../utils/wxcharts-min");
let pieChart = null;
import api from "../../api/request";
import wxModal from "../../utils/wxModal";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    type: "details",
    progressList: [],
    userEvaluationList: [1, 2, 3],
    goodsObj: "",
    qusuId: "",
    elementHeight: "375px"
  },
  //获取至今
  getUpToNow(e) {
    let { detail } = e;
    console.log(detail);
    this.setData({
      selectType: detail
    });
    this.getQueryDetail();
  },
  //获取当天
  getToDay(e) {
    let { detail } = e;
    console.log(detail);
    this.setData({
      selectType: detail
    });
    this.getQueryDetail();
  },
  MultiColumnChange(e) {
    console.log(e);
  },
  MultiChange(e) {
    let { value } = e.detail;
    this.setData({
      multiIndex: value
    });
  },
  createPieChart() {
    let windowWidth = 320;
    try {
      let res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error("getSystemInfoSync failed!");
    }
    let { progressList } = this.data;
    let series = [];
    if (progressList && progressList.length > 0) {
      progressList.forEach(el => {
        series.push({ name: el.subTitle, data: el.subNum });
      });
      pieChart = new wxCharts({
        animation: true,
        canvasId: "pieCanvas",
        type: "pie",
        series: series,
        width: windowWidth,
        height: 300,
        dataLabel: true
      });
    }
  },
  touchHandler(e) {
    console.log(pieChart.getCurrentDataIndex(e));
  },
  async getQueryDetail() {
    let { qusuId, addressId, productCode } = this.data.goodsObj;
    let params = {
      query: {
        // productCode: goodsObj.productCode,
        // type: selectType,
        addressId: addressId
      },
      urlArr: [productCode, qusuId],
      method: "GET"
    };
    let res = await api.getQueryDetail(params);
    console.log(res);
    if (res.resp_code === 0) {
      this.setData({
        progressList: res.datas.subPools,
        qusuId: res.datas.qusuId
      });
      this.createPieChart();
      this.drowsyUserInfo();
    }
  },
  toGoodsComments(e) {
    let { item } = e.currentTarget.dataset;
    this.data.goodsObj.optionObj = item;
    this.data.goodsObj.selectType = this.data.selectType;
    this.data.goodsObj.qusuId = this.data.qusuId;
    wx.navigateTo({
      url: `/pages/goodsComments/goodsComments?item=${JSON.stringify(
        this.data.goodsObj
      )}`
    });
  },
  //图片放大
  previewImage() {
    let { productMainCover } = this.data.goodsObj;
    wx.previewImage({
      urls: [productMainCover]
    });
  },
  //生成水印浮层
  drowsyUserInfo: function() {
    let query = wx.createSelectorQuery();
    query
      .select(".container")
      .boundingClientRect(rect => {
        console.log(rect);
        this.setData({
          elementHeight: rect.height + "px"
        });
      })
      .exec();

    let { name, userId } = JSON.parse(wx.getStorageSync("userInfo"));
    let name_xx = `${name} ${userId}`;
    console.log(name_xx, "name_xx");
    let ctx = wx.createCanvasContext("myCanvas1");
    ctx.rotate((45 * Math.PI) / 180); //设置文字的旋转角度，角度为45°；

    //对斜对角线以左部分进行文字的填充
    for (let j = 1; j < 20; j++) {
      //用for循环达到重复输出文字的效果，这个for循环代表纵向循环
      ctx.beginPath();
      ctx.setFontSize(20);
      ctx.setFillStyle("rgba(169,169,169,.2)");

      ctx.fillText(name_xx, 0, 100 * j);
      for (let i = 1; i < 20; i++) {
        //这个for循环代表横向循环，
        ctx.beginPath();
        ctx.setFontSize(20);
        ctx.setFillStyle("rgba(169,169,169,.2)");
        ctx.fillText(name_xx, 180 * i, 100 * j);
      }
    } //两个for循环的配合，使得文字充满斜对角线的左下部分

    //对斜对角线以右部分进行文字的填充逻辑同上
    for (let j = 0; j < 20; j++) {
      ctx.beginPath();
      ctx.setFontSize(20);
      ctx.setFillStyle("rgba(169,169,169,.2)");

      ctx.fillText(name_xx, 0, -100 * j);
      for (let i = 1; i < 20; i++) {
        ctx.beginPath();
        ctx.setFontSize(20);
        ctx.setFillStyle("rgba(169,169,169,.2)");
        ctx.fillText(name_xx, 180 * i, -100 * j);
      }
    }
    ctx.draw();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let { item } = options;
    console.log(item);
    this.setData({
      goodsObj: JSON.parse(item)
    });
    this.getQueryDetail();
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
});
