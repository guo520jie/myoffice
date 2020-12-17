//index.js
//获取应用实例
const app = getApp()
let _api = app.globalData._api
let wxModal = app.globalData.wxModal
import wxApi from '../../utils/wxApi'

Page({
  data: {
    currLanguage: app.globalData.currLanguage,
    isAuthSetting: false
  },
  async getPhoneNumber(e) {
    let { encryptedData, iv } = e.detail
    if (encryptedData && iv) {
      let login = await wxApi.wxLogin()
      let params = {
        headerType: 'application/json',
        query: {
          code: login.code,
          encryptedDataModel: {
            iv,
            encryptedData
          }
        }
      }
      let res = await _api.register(params)
      let { code, data } = res
      if (code === 200) {
        wx.setStorageSync('token', data.token_type + ' ' + data.access_token)
        wx.redirectTo({
          url: '/pages/speak/speak'
        })
      }
    } else {
      wxModal.alert('授权体验更多哦.')
    }
  },
  // async bindGetUserInfo(e) {
  //   let { userInfo } = e.detail
  //   console.log(userInfo)
  //   if (userInfo) {
  //     this.setData({
  //       isAuthSetting: true
  //     })
  //     wx.setStorageSync('userInfo', JSON.stringify(userInfo))
  //   }
  // },
  onLoad: function() {
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        isAuthSetting: true
      })
    }
  }
})
