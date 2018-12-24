// 导出一个fetch函数，用来发送请求获取数据 
module.exports = function (url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://locally.uieee.com/${url}`,
      // 模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
      // 模板字符串中嵌入变量，需要将变量名写在${}之中。
      data,
      success: resolve,
      // success: function (res) {
      //   resolve(res)
      // },
      fail: reject
    })
  })
}



//在模板字符串中写循环,ES6声明了一个模板编译的说法，该模板使用<%...%>放置 JavaScript 代码，使用<%= ... %>输出 JavaScript 表达式

// let template = `
// <ul>
//   <% for(let i=0; i < data.supplies.length; i++) { %>
//     <li><%= data.supplies[i] %></li>
//   <% } %>
// </ul>
// `