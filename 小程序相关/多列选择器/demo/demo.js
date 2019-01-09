// demo/demo.js

var dateTimePicker = require('../lib/unit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    dataNum: { year: '', month:'',day:''}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    obj.dateTimeArray.pop();
    obj.dateTime.pop();
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });

  },
  changeDateTime:function(e) {
    this.setData({ dateTime: e.detail.value });
  },
  changeDateTimeColumn:function(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
    let year = this.data.dateTimeArray[0][this.data.dateTime[0]]
    let yearNum = year.slice(0, year.length - 1)+'-'
    let yearData = "dataNum.year"

    let month = this.data.dateTimeArray[1][this.data.dateTime[1]]
    let monthNum = month.slice(0, month.length - 1) + '-'
    let monthData = "dataNum.month"

    let day = this.data.dateTimeArray[2][this.data.dateTime[2]]
    let dayNum = day.slice(0, day.length - 1) + '-'
    let dayData = "dataNum.day"
    this.setData({
      [yearData]: yearNum,
      [monthData]: monthNum,
      [dayData]: dayNum
    })
  },
  changeDateTime1:function(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn1:function(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})