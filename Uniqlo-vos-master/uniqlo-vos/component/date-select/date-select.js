const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lang: {
      type: Object,
      value: {}
    },
    activationIndex: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activationIndex: 1,
    lang: {}
  },

  onLoad: function(options) {},

  /**
   * 组件的方法列表
   */
  methods: {
    customTime() {
      const callBack = obj => {
        console.log(obj);
      };
      //回收 getTime方法
      app.globalData.event.offEvent("getTime");
      this.setData({
        activationIndex: 0
      });
      //订阅 getTime方法
      app.globalData.event.subscribeOn("getTime", callBack);
    },
    selectMonth() {
      app.globalData.event.emit("back");
      console.log("月");
      this.setData({
        activationIndex: 1
      });
    },
    selectWeek() {
      // app.globalData.event.emit("back");
      this.triggerEvent("getWeek", 1);
      console.log("周");
      this.setData({
        activationIndex: 1
      });
    },
    selectDay() {
      // app.globalData.event.emit("back");
      this.triggerEvent("getUpToNow", 1);
      console.log("日");
      this.setData({
        activationIndex: 1
      });
    },
    selectCustom() {
      // app.globalData.event.emit("back");
      this.triggerEvent("getToCustom", 2);
      console.log("自定义");
      this.setData({
        activationIndex: 2
      });
    }
  }
});
