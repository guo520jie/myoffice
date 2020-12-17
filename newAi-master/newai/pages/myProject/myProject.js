import wxModal from '../../utils/wxModal'

// pages/myProject/myProject.js
const app = getApp()
let _api = app.globalData._api
Page({
  /**
   * 页面的初始数据
   */
  data: {
    projectList: [],
    isModify: false,
    getAddProjectValue: '',
    modifyProjectValue: '',
    modalName: '',
    currDelProjectId: '',
    currProjectIndex: 0,
    newProjectList: []
  },
  hideModal() {
    this.setData({
      modalName: ''
    })
    this.removeOptions()
  },
  async getProjectsByTeam() {
    let teamCurrId = wx.getStorageSync('teamCurrId')
    let params = {
      method: 'GET',
      query: {
        teamId: teamCurrId
      }
    }
    let res = await _api.getProjectsByTeam(params)
    this.setData({
      projectList: res.data
    })
  },
  modifyProject() {
    let { isModify } = this.data
    if (isModify) {
      this.setData({
        isModify: false
      })
    } else {
      this.setData({
        isModify: true
      })
    }
  },
  async getAddProject(e) {
    let { value } = e.detail
    if (!value) {
      wxModal.alert('请输入项目名称.')
      return
    }
    let { projectList } = this.data
    let teamCurrId = wx.getStorageSync('teamCurrId')
    let params = {
      headerType: 'application/json',
      query: {
        teamId: teamCurrId,
        name: value
      }
    }
    let res = await _api.saveOrUpdate(params)
    if (res.code === 200) {
      wxModal.alert('新增成功')
      projectList.push(res.data)
      this.setData({
        projectList,
        getAddProjectValue: ''
      })
    }
  },
  async modifyTextAreaBlur(e) {
    let { index } = e.currentTarget.dataset
    let { value } = e.detail
    if (!value) {
      wxModal.alert('请输入项目名称.')
      return
    }
    let { projectList } = this.data
    let teamCurrId = wx.getStorageSync('teamCurrId')
    let params = {
      headerType: 'application/json',
      query: {
        teamId: teamCurrId,
        id: projectList[index].id,
        name: value
      }
    }
    let res = await _api.saveOrUpdate(params)
    if (res.code === 200) {
      projectList[index].name = value
      wxModal.alert('修改成功')
      this.setData({
        projectList
      })
    }
    this.setData({
      modifyProjectValue: ''
    })
  },
  async submitDelProject() {
    let {
      projectList,
      newProjectList,
      currProjectIndex,
      currDelProjectId
    } = this.data
    let params = {
      method: 'DELETE',
      suffix: `?projectId=${currDelProjectId}&targetProjectId=${newProjectList[currProjectIndex].id}`
    }
    let res = await _api.removeProject(params)
    if (res.code === 200) {
      let index = projectList.findIndex(item => item.id == currDelProjectId)
      projectList.splice(index, 1)
      wxModal.alert('删除成功')
      this.removeOptions()
      this.setData({
        modalName: '',
        projectList
      })
    }
  },
  bindTimeChange(e) {
    console.log(e)
    let { value } = e.detail
    this.setData({
      currProjectIndex: value
    })
  },
  removeOptions() {
    this.setData({
      currDelProjectId: '',
      newProjectList: '',
      currProjectIndex: 0
    })
  },
  async removeProject(e) {
    let { index } = e.currentTarget.dataset
    let { projectList } = this.data
    let projectId = projectList[index].id
    let newProjectList = [...projectList]
    newProjectList.splice(index, 1)
    newProjectList.unshift({ name: '直接删除项目内所有日报', id: '' })
    this.setData({
      modalName: 'Modal',
      currDelProjectId: projectId,
      newProjectList
    })
  },
  async saveOrUpdate() {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getProjectsByTeam()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
