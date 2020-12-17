let appId = 1000046;
// let appId = wx.getStorageSync("isWxWork") ? "1000012" : "wx1fd1b1c6b5232a9f";
const GetToken = `/api-vos/wxUser/${appId}/getToken`; //是否注册
// const SearchProductByCodes = "/api-products-search/searchProductByCodes"; // 扫描商品码获取详情
const GetWeChatUserInfo = `/api-vos/wxUser/${appId}/getWeChatUserInfo`; //获取用户信息
const GetQuestionList = "/api-qusu/wxapi/getQuestionnairePageList"; //定向问卷列表
const GetGlobalDetail = "/api-qusu/wxapi/getGlobalDetail"; //global问卷详情
const GetQuestionDetailsById = "/api-qusu/wxapi/getPsqItemUserDetailByPsqId"; //获取定向问卷调查明细
const GetUserAnswerDetail = "/api-qusu/wxapi/getUserAnswerDetail"; //获取定向问卷用户回
const SaveUserQuestionAnswer = "/api-qusu/wxapi/saveQuestionAnswer"; //添加用户回答
const GetUserUploadImage = "/api-qusu/wxapi/getUserUploadImage"; //获取用户在题目中上传的图片
const SaveUploadImge = "/api-qusu/wxapi/saveUploadImage"; //保存用户上传的图片信息;
const UploadImage = "/api-vos/upload/toBlob"; //上传图片

// const UploadImage = "/api-qusu/wxapi/uploadImage"; //上传图片

const DeleteUploadImge = "/api-qusu/wxapi/deleteUploadImge"; //删除图片接口
const SaveUserScanProduct = "/api-qusu/wxapi/saveUserScanProduct"; //保存或修改用户扫码商品信息
const ToText = "/api-vos/audio/audioToText"; //语言接口
const GetGlobalNextQuestion = "/api-qusu/wxapi/getGlobalNextQuestion"; // global下一题
const GetGlobalLastQuestion = "/api-qusu/wxapi/getGlobalLastQuestion"; // global上一题
const GetPsqItemUserNextQuestion = "/api-qusu/wxapi/getPsqItemUserNextQuestion"; // 定向下一题
const GetPsqItemUserLastQuestion = "/api-qusu/wxapi/getPsqItemUserLastQuestion"; //定向上一题
const SearchProductByCodes = "/api-vos/scanCode/getCommodityBySixCode"; //定向问卷商品查询
const GlobalScanCode = "/api-vos/scanCode/getCommodityByCode"; //global问卷商品查询
const GetDeptRange = `/api-qusu/questionnaire/getDeptRange?agentId=${appId}`; //获取门店信息
const GetQueryDetail = "/api-qusu/analyze/query/detail"; //商品详细分析报告
const QueryProgress = "/api-qusu/store/query"; //查询店铺本周进度
const TargetSetting = "/api-qusu/target/setting"; //店长添加目标设定
const GetAnalyzeQuery = "/api-qusu/analyze/query"; //分析报告
const GetUserOption = "/api-qusu/analyze/query/user/option"; //选项详情评论列表
const GetDoneDetail = "/api-qusu/questionnaire/getDoneDetail"; //获取做过问卷详情

const QueryWithQusu = "/api-qusu/analyze/queryWithQusu"; // 分析报告(单个问卷)

//新需求接口
const Query = "/api-qusu/target/query"; // 店长当周目标试卷列表
const GetLookPlan = "/api-qusu/analyze/query/lookPlan"; //查询问卷完成人员
const CompleteSurvey = "/api-qusu/wxapi/completeSurvey"; //完成问卷

const GetNoticeData = '/api-vos/notice/getNoticeData' //获取跑马灯


module.exports = {
  GetToken,
  SearchProductByCodes,
  GetWeChatUserInfo,
  GetQuestionList,
  GetGlobalDetail,
  GetQuestionDetailsById,
  GetUserAnswerDetail,
  SaveUserQuestionAnswer,
  ToText,
  GetUserUploadImage,
  SaveUploadImge,
  DeleteUploadImge,
  SaveUserScanProduct,
  GetGlobalNextQuestion,
  GetGlobalLastQuestion,
  GetPsqItemUserNextQuestion,
  GetPsqItemUserLastQuestion,
  GlobalScanCode,
  GetDeptRange,
  GetQueryDetail,
  QueryProgress,
  TargetSetting,
  GetAnalyzeQuery,
  GetUserOption,
  GetDoneDetail,
  UploadImage,
  Query,
  QueryWithQusu,
  GetLookPlan,
  CompleteSurvey,
  GetNoticeData
}
