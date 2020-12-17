Component({
  /**
   * 组件的属性列表
   */
  properties: {
    Lead: {
      type: Boolean,
      value: false
    },
    isIphoneX: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  onLoad: function(options) {},

  /**
   * 组件的方法列表
   */
  methods: {
    _gotoreview: function() {
      // let self = this;
      // if (self.IsLeadFlag()){
      //   wx.redirectTo({
      //     url: '/pages/Supervision/review',
      //   })
      // }else{
      //   wx.redirectTo({
      //     url: '/pages/my/review',
      //   })
      // }
      wx.redirectTo({
        url: "/pages/date/date"
      });
    },
    _goVoiceReport: function() {
      // let self = this;
      // if (self.IsLeadFlag()) {
      //   wx.redirectTo({
      //     url: '/pages/Supervision/Supervision',
      //   })
      // } else {
      //   wx.redirectTo({
      //     url: "/pages/voicereport/voicereport"
      //   })
      // }
      wx.redirectTo({
        url: "/pages/home/home"
      });
    },

    IsLeadFlag: function() {
      if (
        (wx.getStorageSync("userFlag") &&
          wx.getStorageSync("leadFlag") &&
          wx.getStorageSync("identityIndex") == 1) ||
        (wx.getStorageSync("userFlag") == 0 &&
          wx.getStorageSync("leadFlag") == 1)
      ) {
        return true;
      }
      return false;
    }
  }
});
