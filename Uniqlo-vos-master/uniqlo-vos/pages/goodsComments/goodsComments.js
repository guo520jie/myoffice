// pages/goodsComments/goodsComments.js
let wxCharts = require("../../utils/wxcharts-min");
let pieChart = null;
import api from "../../api/request";
import wxModal from "../../utils/wxModal";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectType: 1, // 2 至今 1 当天
    goodsObj: "",
    goodsCommentList: [],
    elementHeight: ""
  },
  //获取至今
  getUpToNow(e) {
    let { detail } = e;
    console.log(detail);
    this.setData({
      selectType: detail
    });
    this.getUserOption();
  },
  //获取当天
  getToDay(e) {
    let { detail } = e;
    console.log(detail);
    this.setData({
      selectType: detail
    });
    this.getUserOption();
  },
  async getUserOption() {
    let { selectType, goodsObj } = this.data;
    let { shopId } = JSON.parse(wx.getStorageSync("userInfo"));
    let params = {
      query: {
        optionId: goodsObj.optionObj.optionId,
        shopid: goodsObj.addressId || shopId,
        qusuId: goodsObj.qusuId
      },
      method: 'GET'
    }
    let res = await api.getUserOption(params);
    if (res.resp_code === 0) {
      this.setData({
        goodsCommentList: res.datas
      });
      this.drowsyUserInfo();
    }
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
    this.goodsList;
    console.log(JSON.parse(item));
    this.setData({
      goodsObj: JSON.parse(item),
      selectType: JSON.parse(item).selectType
    });
    this.getUserOption();
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
