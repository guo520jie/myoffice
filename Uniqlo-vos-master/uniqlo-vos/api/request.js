import wxModal from '../utils/wxModal'
import apiPath from './apiPath'
import statusCode from './statusCode'
import wxApi from '../utils/wxApi'

const version = '1.01'
// const Url = "http://192.168.2.108:9900";
// const Url = "https://yx.uniqlo.applesay.cn/yx"; //线上环境
// const Url = 'https://vos.uniqlo.cn/yx' //优衣库线上正式环境   需求新增  7 月 7 日
const Url = 'https://test-vos.uniqlo.cn/yx' //优衣库线上测试环境  5 月 19 日 5:10 本地测试

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
  // showFullScreenLoading();
  let isWxWork = wx.getStorageSync('isWxWork')
  let { code } = await wxApi[isWxWork ? 'wxQyLogin' : 'wxLogin']()
  console.log(code, 'code')
  let params = {
    method: 'GET',
    skip: 1,
    query: { code }
  }
  let res = await GetToken(params)
  let data = res.data
  if (data.resp_code === 0) {
    if (data.datas.isRegister === 0) {
      // tryHideFullScreenLoading();
      wxModal.alert(data.resp_msg)
      return data
    }
    wx.setStorageSync(
      'token',
      data.datas.tokenObject.token_type +
        ' ' +
        data.datas.tokenObject.access_token
    )
    tryHideFullScreenLoading()
    return data
  } else {
    // tryHideFullScreenLoading();
    wxModal.alert(data.resp_msg || '系统开小差了...')
    return -1
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
      params.hideLoading ? '' : tryHideFullScreenLoading()
      if (Code === statusCode.SUCCESS) {
        if (Array.isArray(responseData)) {
          return responseData
        }
        if (responseData.code === 0) {
          return responseData
        } // 请求返回成功 返回响应体
        switch (+responseData.resp_code) {
          case 0:
            return responseData
          case 1:
            wxModal.alert(responseData.resp_msg)
            return responseData
          case 401:
            break
          default:
            break
        } //返回失败的状态 抛出错误
        let res = await Login()
        let code = res.resp_code
        let msg = res.resp_msg
        if (code !== 0) {
          wxModal.alert(msg)
          return
        }
        let token = res.datas.tokenObject.access_token
        if (token && retry < 3) {
          return await request(params)
        } else {
          wxModal.alert('系统开小差了...')
          return statusCode.Fail
        }
      } else {
        let res = await Login()
        let code = res.resp_code
        let msg = res.resp_msg
        if (code !== 0) {
          wxModal.alert(msg)
          return
        }
        let token = res.datas.tokenObject.access_token
        if (token && retry < 3) {
          return await request(params)
        } else {
          wxModal.alert('系统开小差了...')
          return statusCode.Fail
        }
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
      url: params.suffix ? `${url}/${params.suffix}` : newUrl ? newUrl : url,
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
const GetToken = params => request(`${Url}${apiPath.GetToken}`, params)
const searchProductByCodes = params =>
  request(`${Url}${apiPath.SearchProductByCodes}`, params)
const getWeChatUserInfo = params =>
  request(`${Url}${apiPath.GetWeChatUserInfo}`, params)
const getQuestionList = params =>
  request(`${Url}${apiPath.GetQuestionList}`, params)
const getGlobalDetail = params =>
  request(`${Url}${apiPath.GetGlobalDetail}`, params)
const getQuestionDetailsById = params =>
  request(`${Url}${apiPath.GetQuestionDetailsById}`, params)
const getUserAnswerDetail = params =>
  request(`${Url}${apiPath.GetUserAnswerDetail}`, params)
const saveUserQuestionAnswer = params =>
  request(`${Url}${apiPath.SaveUserQuestionAnswer}`, params)
const toText = `${Url}${apiPath.ToText}`
const getUserUploadImage = params =>
  request(`${Url}${apiPath.GetUserUploadImage}`, params)
const saveUploadImge = params =>
  request(`${Url}${apiPath.SaveUploadImge}`, params)
const deleteUploadImge = params =>
  request(`${Url}${apiPath.DeleteUploadImge}`, params)
const saveUserScanProduct = params =>
  request(`${Url}${apiPath.SaveUserScanProduct}`, params)
const getGlobalNextQuestion = params =>
  request(`${Url}${apiPath.GetGlobalNextQuestion}`, params)
const getGlobalLastQuestion = params =>
  request(`${Url}${apiPath.GetGlobalLastQuestion}`, params)
const getPsqItemUserNextQuestion = params =>
  request(`${Url}${apiPath.GetPsqItemUserNextQuestion}`, params)
const getPsqItemUserLastQuestion = params =>
  request(`${Url}${apiPath.GetPsqItemUserLastQuestion}`, params)
const globalScanCode = params =>
  request(`${Url}${apiPath.GlobalScanCode}`, params)
const getDeptRange = params => request(`${Url}${apiPath.GetDeptRange}`, params)
const getQueryDetail = params =>
  request(`${Url}${apiPath.GetQueryDetail}`, params)
const queryProgress = params =>
  request(`${Url}${apiPath.QueryProgress}`, params)
const targetSetting = params =>
  request(`${Url}${apiPath.TargetSetting}`, params)
const getAnalyzeList = params =>
  request(`${Url}${apiPath.GetAnalyzeQuery}`, params)
const getUserOption = params =>
  request(`${Url}${apiPath.GetUserOption}`, params)
const getDoneDetail = params =>
  request(`${Url}${apiPath.GetDoneDetail}`, params)
const uploadImage = `${Url}${apiPath.UploadImage}`
const getQueryList = params => request(`${Url}${apiPath.Query}`, params)
const getQueryWithQusu = params =>
  request(`${Url}${apiPath.QueryWithQusu}`, params)
const getLookPlan = params => request(`${Url}${apiPath.GetLookPlan}`, params)
const completeSurvey = params =>
  request(`${Url}${apiPath.CompleteSurvey}`, params)

const getNoticeData = params =>
  request(`${Url}${apiPath.GetNoticeData}`, params)

module.exports = {
  Login,
  toText,
  uploadImage,
  searchProductByCodes: requestWrap(searchProductByCodes),
  getWeChatUserInfo: requestWrap(getWeChatUserInfo),
  getQuestionList: requestWrap(getQuestionList),
  getGlobalDetail: requestWrap(getGlobalDetail),
  getQuestionDetailsById: requestWrap(getQuestionDetailsById),
  getUserAnswerDetail: requestWrap(getUserAnswerDetail),
  saveUserQuestionAnswer: requestWrap(saveUserQuestionAnswer),
  getUserUploadImage: requestWrap(getUserUploadImage),
  saveUploadImge: requestWrap(saveUploadImge),
  deleteUploadImge: requestWrap(deleteUploadImge),
  saveUserScanProduct: requestWrap(saveUserScanProduct),
  globalScanCode: requestWrap(globalScanCode),
  getGlobalNextQuestion: requestWrap(getGlobalNextQuestion),
  getGlobalLastQuestion: requestWrap(getGlobalLastQuestion),
  getPsqItemUserNextQuestion: requestWrap(getPsqItemUserNextQuestion),
  getPsqItemUserLastQuestion: requestWrap(getPsqItemUserLastQuestion),
  getDeptRange: requestWrap(getDeptRange),
  getQueryDetail: requestWrap(getQueryDetail),
  queryProgress: requestWrap(queryProgress),
  targetSetting: requestWrap(targetSetting),
  getAnalyzeList: requestWrap(getAnalyzeList),
  getUserOption: requestWrap(getUserOption),
  getDoneDetail: requestWrap(getDoneDetail),
  getQueryList: requestWrap(getQueryList),
  getQueryWithQusu: requestWrap(getQueryWithQusu),
  getLookPlan: requestWrap(getLookPlan),
  completeSurvey: requestWrap(completeSurvey),
  getNoticeData: requestWrap(getNoticeData)
}
