const app = getApp();
const config = require('../../config.js');
const icom = require('../../common/js/base/com.js');
Component({
  options: {
    styleIsolation: 'isolated'
  },
  properties: {
    navigationTitle: {
      type: String,
      value: ''
    },
    navigationBack: {
      type: String,
      value: null
    },
    navigationBackText: {
      type: String,
      value: ''
    }
  },
  data: {
    navigationShow: app.data.navigationShow,
    navigationHeight: app.data.navigationHeight,
    navigationPadding: app.data.navigationPadding,
    navigationTitle: config.navigationTitle,
  },
  methods: {
    navigationBackClick:function(){
      if(this.data.navigationBack && this.data.navigationBack!=''){
        this.triggerEvent('back', {url:this.data.navigationBack});
      }
    }
  }
})
