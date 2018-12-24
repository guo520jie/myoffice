const fetch = require('../../utils/fetch.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], // 列表数据
    id: null, // 当前分类列表id
    curPage: 0, // 当前页
    hasMore: true // 是否有更多数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch(`categories/${options.id}`)
      .then(res => {
        // console.log(res.data)
        // 动态设置页面顶部标题
        wx.setNavigationBarTitle({
          title: res.data.name
        })
      })

    // 设置data中的id值
    this.data.id = options.id

    // 获取列表数据
    this.loadMore()
  },

  // 加载分页数据 
  loadMore() {
    let { id, curPage, list, hasMore } = this.data
    //对象解构赋值，对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

    // _page 参数：表示当前是第几页
    // _limit 参数：表示每页大小
    const params = {
      _page: ++curPage, // 只要加载数据就让当前页加1
      _limit: 10
    }

    // 总条数：42
    // 每页大小：10
    // 当前页：curPage
    // if (curPage >= Math.ceil(总条数 / 每页大小)) {}

    fetch(`categories/${id}/shops`, params)
      .then(res => {
        // 用来判断是否有更多数据
        const TOTAL = res.header['X-Total-Count']
        if (curPage >= Math.ceil(TOTAL / 10)) {
          hasMore = false
        }

        this.setData({
          // 注意：应该是追加数据，而不是直接覆盖
          list: [...list, ...res.data],
          curPage,
          hasMore
        })
      })
  },

  // 触底加载更多数据
  onReachBottom() {
    console.log('触底了，获取下一页数据吧')
    if (!this.data.hasMore) {
      return
    }

    // 加载下一页数据
    this.loadMore()
  }
})