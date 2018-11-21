//app.js
App({
  onLaunch: function () {
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          } else {
            wx.navigateBack({
              delta: -1
            })
          }
        }
      })

    })

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    })
    let self = this
    wx.request({
      url: 'https://wechat.kayunzh.com/mfw/Control/getMsg',
      method: 'GET',
      data: {
        version: this.globalData.version
      },
      success: function (res) {
        if(res.statusCode==200&&res.data.data!==undefined){
          self.globalData.AppMsg = res.data.data
          console.log("success")
        }
      }
    })
  },
  isNullObject:function(obj) {
    if (obj) {
      for (var i in obj) {
        return false;
      }
      return true;
    }
    return false
  },
  onShow:function(obj){
    // var arr = [1001,1047,1048,1049];
    // if(arr.indexOf(obj.scene)>=0&&obj.query.scene!==undefined){
    //   this.globalData.uid = obj.query.scene
    // }else{
    //   this.globalData.uid = null;
    // }
    if (obj.query.scene !== undefined) {
      this.globalData.uid = obj.query.scene
    } else {
      this.globalData.uid = null;
    }
    console.log(obj,  this.globalData.uid,this.globalData.userInfo)
  },
  onHide:function(){
    console.log('app hide')
  },
  globalData: {
    version:'1.1.4',
    SessionKey:'',
    openid:'',
    userInfo: {},
    uid:null,
    canvasImgData:[],
    AppMsg:{
      network: '网络错误',       //网络错误
      scanPath: '网络错误',    //扫描到错误的小程序码
      scanResult: '网络错误',  //扫描到错误的二维码
      scanNull: '网络错误',    //没有扫描到任何结果
      getImgEmptyArray: '网络错误',        //图片数组为空（有可能是因为图片尚未上传）
      downloadMoreImg: '网络错误',           //选择的图片超过3张了
      downloadNullImg: '网络错误',         //没有选择任何图片就点击了下载按钮
      //固定的网页内容
      HtmlIndexTitle:'欢迎来到魔法屋！',
      HtmlIndexDesc:'扫一扫屏幕上的二维码，即可开始畅玩',
      HtmlControlUseTimeTitle:'畅玩时间3分钟',
      HtmlControlUseTimeDesc:'点击图标即可切换场景，畅玩结束后可获取所拍照片',
      HtmlControlFooterMsg:'畅玩时长',
      HtmlControlGetImgMsg:'不要退出程序哦，退出后照片将无法再获取',
      HtmlControlGetImgClock:'获取时长',
      HtmlControlGetImgBtn:'获取照片',
      HtmlListHeaderMsg:'勾选  照片，保存到手机',
      HtmlListSaveBtn:'保存到手机',
      //1.1.4
      HtmlIndexText: '点击蓝色扫码按钮参加活动',
    }
  }
})