const app = getApp();
const config = require('../../config.js');
Component({
  options: {
    styleIsolation: 'isolated'
  },
  properties: {
  },
  data: {
    bgmBtnShow: app.bgm
  },
  lifetimes: {
    ready: function() {
      this.setData({
        bgmPlay:app.bgm?!app.bgm.audio.paused:null
      });
    }
  },
  methods: {
    bgmClick: app.bgm?app.bgm.click:null,
    playSet:function(val=true){
      this.setData({
        bgmPlay:val
      });
    },
    showSet:function(val=true){
      this.setData({
        bgmBtnShow:val
      });
    }
  }
})
