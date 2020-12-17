import wxModal from '../utils/wxModal'
import apiPath from './apiPath'
import { SUCCESS, FAIL } from './statusCode'
import wxApi from '../utils/wxApi'

const version = '1.0.0'
// const Url = 'http://192.168.2.108:9900' //本地环境
// const Url = 'http://voice-gateway.ai-say.192.168.2.160.xip.io' //公司测试环境
const Url = 'http://47.103.113.230:9900' //公司测试环境

let loading
//显示loading
function startLoading() {
  wxModal.loading() //封装的 wxApi  加载
}
//隐藏loading
function endLoading() {
  wxModal.loaded()
}
//私有属性 ( 记录当前有几个请求 )
let needLoadingRequestCount = 0
//
function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

/**
 * 企业微信登陆接口，返回用户信息
 * 判断是否是企业微信登录并切换登录方式
 */
const Login = async () => {
  showFullScreenLoading()
  let { code } = await wxApi.wxLogin()
  console.log(code, 'code')
  let params = {
    method: 'GET',
    skip: 1,
    query: { code }
  }
  let res = await isRegister(params)
  let data = res.data
  if (data.code === SUCCESS) {
    if (data.data.isRegister === 0) {
      wx.removeStorageSync('token')
      // const pages = getCurrentPages()
      // const currentPage = pages[pages.length - 1]
      // console.log(currentPage)
      // const url = `/${currentPage.route}`
      // if (url !== '/pages/login/login') {
      //   wx.redirectTo({
      //     url: '/pages/login/login'
      //   })
      // }
      wx.redirectTo({
        url: '/pages/login/login'
      })

      tryHideFullScreenLoading()
      return data
    }
    wx.setStorageSync(
      'token',
      data.data.tokenObject.token_type +
        ' ' +
        data.data.tokenObject.access_token
    )
    tryHideFullScreenLoading()
    return data
  } else {
    tryHideFullScreenLoading()
    wxModal.alert(data.msg || '系统开小差了..')
    return false
  }
}

const requestWrap = requestFunction => {
  let retry = 0
  return async function request(params = {}) {
    retry++
    params.hideLoading ? '' : showFullScreenLoading()
    try {
      const response = await requestFunction(params)
      let Code = response.statusCode
      let responseData = response.data
      console.log('参数===>', params)
      console.log('接口返回定位===>', responseData)
      console.log('Code', Code)
      params.hideLoading ? '' : tryHideFullScreenLoading()
      if (Code === SUCCESS) {
        if (responseData.code === SUCCESS) {
          return responseData
        } // 请求返回成功 返回响应体
        switch (+responseData.code) {
          case 0:
            return responseData
          case 1:
            wxModal.alert(responseData.msg)
            return responseData
          case 500:
            wxModal.alert(responseData.msg)
            return responseData
            break
          default:
            break
        } //返回失败的状态 抛出错误
        let res = await Login()
        console.log(res, 'res')
        if (!res || !res.data.tokenObject) {
          wxModal.alert(res.msg || '系统开小差了..')
          return
        }
        let { token_type, access_token } = res.data.tokenObject
        let token = `${token_type} ${access_token}`
        if (token && retry < 3) {
          return await request(params)
        } else {
          wxModal.alert('系统开小差了..')
          return FAIL
        }
      } else {
        wxModal.alert('系统开小差了..')
      }
    } catch (error) {
      params.hideLoading ? '' : tryHideFullScreenLoading()
      console.log(error)
    }
  }
}

//请求封装
const request = async (url, params = {}) => {
  let token = wx.getStorageSync('token')
  let lang = wx.getStorageSync('lang')
  return new Promise((resolve, reject) => {
    let { urlArr } = params
    let newUrl = url
    if (urlArr && urlArr.length > 0) {
      urlArr.forEach(element => {
        newUrl += `/${element}`
      })
    }
    wx.request({
      url: params.suffix ? `${url}${params.suffix}` : newUrl ? newUrl : url,
      data: params.query,
      method: params.method || 'POST',
      header: {
        Accept: 'application/json',
        'Content-Type':
          params.headerType || 'application/x-www-form-urlencoded',
        Authorization:
          token && params.skip !== 1 ? token : 'Basic d2ViQXBwOndlYkFwcA==',
        'x-tenant-header': 'webapp',
        'x-lng-header': lang
      },
      success: function(res) {
        resolve(res)
      },
      fail: function(err) {
        reject('-1')
      }
    })
  })
}
//
const toText = `${Url}${apiPath.TO_TEXT}`
const uploadImage = `${Url}${apiPath.UP_LOAD_IMAGE}`

const register = params => request(`${Url}${apiPath.REGISTER}`, params)
const isRegister = params => request(`${Url}${apiPath.IS_REGISTER}`, params)
const updateWxUserInfo = params =>
  request(`${Url}${apiPath.UP_DATA_WX_USER_INFO}`, params)
const getProjectsByTeam = params =>
  request(`${Url}${apiPath.GET_PROJECTS_BY_TEAM}`, params)
const getSelfTeamList = params =>
  request(`${Url}${apiPath.GET_SELF_TEAM_LIST}`, params)
const getTeamMemberList = params =>
  request(`${Url}${apiPath.GET_TEAM_MEMBER_LIST}`, params)
const getCalendarViewData = params =>
  request(`${Url}${apiPath.GET_CALENDAR_VIEW_DATA}`, params)
const getProjectViewData = params =>
  request(`${Url}${apiPath.GET_PROJECT_VIEW_DATA}`, params)
const setMemberLevel = params =>
  request(`${Url}${apiPath.SET_MEMBER_LEVEL}`, params)
const addTeam = params => request(`${Url}${apiPath.ADD_TEAM}`, params)
const addVoiceByText = params =>
  request(`${Url}${apiPath.ADD_VOICE_BY_TEXT}`, params)
const saveVoiceAttribute = params =>
  request(`${Url}${apiPath.SAVE_VOICE_ATTRIBUTE}`, params)
const joinTeam = params => request(`${Url}${apiPath.JOIN_TEAM}`, params)
const getLevelByTeam = params =>
  request(`${Url}${apiPath.GET_LEVEL_BY_TEAM}`, params)

const saveOrUpdate = params =>
  request(`${Url}${apiPath.SAVE_OR_UPDATE}`, params)

const removeProject = params =>
  request(`${Url}${apiPath.REMOVE_PROJECT}`, params)

const updateVoiceState = params =>
  request(`${Url}${apiPath.UPDATE_VOICE_STATE}`, params)

const updateVoiceWorkTime = params =>
  request(`${Url}${apiPath.UPDATE_VOICE_WORK_TIME}`, params)

const removeMemberByTeam = params =>
  request(`${Url}${apiPath.REMOVE_MEMBER_BY_TEAM}`, params)

module.exports = {
  Login,
  toText,
  uploadImage,
  register: requestWrap(register),
  isRegister: requestWrap(isRegister),
  updateWxUserInfo: requestWrap(updateWxUserInfo),
  getProjectsByTeam: requestWrap(getProjectsByTeam),
  getSelfTeamList: requestWrap(getSelfTeamList),
  getTeamMemberList: requestWrap(getTeamMemberList),
  getCalendarViewData: requestWrap(getCalendarViewData),
  getProjectViewData: requestWrap(getProjectViewData),
  setMemberLevel: requestWrap(setMemberLevel),
  addTeam: requestWrap(addTeam),
  addVoiceByText: requestWrap(addVoiceByText),
  saveVoiceAttribute: requestWrap(saveVoiceAttribute),
  joinTeam: requestWrap(joinTeam),
  getLevelByTeam: requestWrap(getLevelByTeam),
  saveOrUpdate: requestWrap(saveOrUpdate),
  removeProject: requestWrap(removeProject),
  updateVoiceState: requestWrap(updateVoiceState),
  updateVoiceWorkTime: requestWrap(updateVoiceWorkTime),
  removeMemberByTeam: requestWrap(removeMemberByTeam)
}
