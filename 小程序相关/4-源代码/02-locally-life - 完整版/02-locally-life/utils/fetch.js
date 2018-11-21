// 导出一个fetch函数，用来发送请求获取数据
module.exports = function (url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://locally.uieee.com/${url}`,
      data,
      success: resolve,
      // success: function (res) {
      //   resolve(res)
      // },
      fail: reject
    })
  })
}