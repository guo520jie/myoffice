//获取应用实例
const app = getApp()

const routerRoot = 'https://wechat.kayunzh.com/mfw';

const Api = {
  getIndexSwiper: routerRoot +'/Control/getIndexSwiper',
  getWxUserId: routerRoot + '/Login',
  getMsg: routerRoot +'/Control/getMsg',
  checkUser: routerRoot + '/Control/checkUser',
  checkUid: routerRoot +'/Control/checkUid',
  getControlInit: routerRoot + '/Control/getControlInit',
  switchScene: routerRoot +'/Control/switchScene',
  getImgList: routerRoot + '/Control/getImgList',
  saveDownloadMsg: routerRoot +'/Control/saveDownloadMsg',
  getSwiperData: routerRoot + '/Control/getSwiperData',
  getUserMobile: routerRoot +'/Control/getUserMobile',
  //酷甩
  getCanvasImg: routerRoot + '/Control/getCanvasImg',
  canvasUploadImg: routerRoot +'/Control/upload',
  canvasUploadTempImg:routerRoot+'/Control/uploadImg',
  getCountDown: routerRoot +'/Control/getCountDown',
}
const AppImg = {
  Home_Bg: routerRoot +'/images/img1/container-bg.png',
  Home_Banner: routerRoot +'/images/img1/main-bg.png',
  Scan_fir: routerRoot +'/images/img1/scan1.png',
  Scan_sec: routerRoot +'/images/img1/scan2.png', 
  Scan_thi: routerRoot + '/images/img1/scan3.png',
  Scan_ok: routerRoot + '/images/img1/ok.png',
  downLeft: routerRoot +'/images/img1/downleft.png', 
  downRight: routerRoot +'/images/img1/downright.png', 
  Scan_left: routerRoot +'/images/img1/leftCur.png', 
  Scan_right: routerRoot +'/images/img1/rightCur.png', 
  timeBg: routerRoot +'/images/img1/timer.png', 
  curImg: routerRoot +'/images/img1/light.png', 
  curOk: routerRoot +'/images/img1/okcur.png',

  Con_Bg: routerRoot +'/Menu_Bg.png',
  Con_Circle: routerRoot +'/Menu_Circle.png',
  Con_Box_title: routerRoot +'/box-title.png',
  Con_Item_down: routerRoot +'/Item_Down.png',
  Con_Item_up: routerRoot +'/Item_Up4.png',
  Con_Footer_Bg: routerRoot +'/footer-fixed-background.png',
  Con_Finish_Bg: routerRoot +'/Finish_Bg.png',
  Con_Banner: routerRoot +'/Common_Banner.png',
  Con_Finish_circle: routerRoot +'/Finish_Circle.png',
  Con_End_msg: routerRoot +'/end_body_msg.png',
  Con_Clock: routerRoot +'/clock.png',
  Con_Arrow_pic: routerRoot +'/Arrow_Pic.png',
  Con_Btn: routerRoot +'/images/img2/btn.png',
  Con_Cur: routerRoot +'/images/img2/Btn_Disable.png',
  swiper_Bg: routerRoot +'/images/img2/swiperbg.png',
  List_Bg: routerRoot +'/images/img1/container-bg.png',
  List_Time_Bg: routerRoot +'/images/img2/Tips_Bg.png',
  List_Frame: routerRoot +'/frame.png',
  List_radiobtnBg: routerRoot +'/images/img2/list_mask.png',
  List_radiobtnDown: routerRoot +'/images/img2/listcur.png',
  List_Btn_Save: routerRoot +'/btn_save.png',
  List_Btn_Share: routerRoot +'/btn_share.png',
  CurBg: routerRoot +'/images/img2/curbg.png',
  BtnBg: routerRoot +'/images/img2/btn_Bg.png',
  Swipering: routerRoot +'/images/swipering.png',
  //酷甩
  CanvasBg: routerRoot + '/canvas/statics/BgLarge.jpg',
  CanvasPrev: routerRoot + '/canvas/statics/Swiper_prv.png',
  CanvasLast: routerRoot + '/canvas/statics/Swiper_last.png',
  CanvasBgMenu: routerRoot + '/canvas/statics/BG_Menu.png',
  CanvasReturn: routerRoot + '/canvas/statics/Btn_Back.png',
  CanvasCountDown: routerRoot + '/canvas/statics/countdown.png',
  CanvasCrayonRubber: routerRoot + '/canvas/statics/Crayon_Rubber.png',
  CanvasBtnSave: routerRoot + '/canvas/statics/btn_save.png',
  CanvasCrayonData:[
    routerRoot + '/canvas/statics/Crayon_Red.png', 
    routerRoot + '/canvas/statics/Crayon_Orange.png', 
    routerRoot + '/canvas/statics/Crayon_Yellow.png', 
    routerRoot + '/canvas/statics/Crayon_GrassGreen.png', 
    routerRoot + '/canvas/statics/Crayon_Green.png', 
    routerRoot + '/canvas/statics/Crayon_Blue.png',
    routerRoot + '/canvas/statics/Crayon_Ultramarine.png', 
    routerRoot + '/canvas/statics/Crayon_Purple.png', 
    routerRoot + '/canvas/statics/Crayon_Pink.png', 
    routerRoot + '/canvas/statics/Crayon_Carnation.png', 
    routerRoot + '/canvas/statics/Crayon_Brown.png', 
    routerRoot + '/canvas/statics/Crayon_Black.png'
  ],
  CanvasCrayonDataSelect: [
    routerRoot + '/canvas/statics/Crayon_Red_Select.png',
    routerRoot + '/canvas/statics/Crayon_Orange_Select.png',
    routerRoot + '/canvas/statics/Crayon_Yellow_Select.png',
    routerRoot + '/canvas/statics/Crayon_GrassGreen_Select.png',
    routerRoot + '/canvas/statics/Crayon_Green_Select.png',
    routerRoot + '/canvas/statics/Crayon_Blue_Select.png',
    routerRoot + '/canvas/statics/Crayon_Ultramarine_Select.png',
    routerRoot + '/canvas/statics/Crayon_Purple_Select.png',
    routerRoot + '/canvas/statics/Crayon_Pink_Select.png',
    routerRoot + '/canvas/statics/Crayon_Carnation_Select.png',
    routerRoot + '/canvas/statics/Crayon_Brown_Select.png',
    routerRoot + '/canvas/statics/Crayon_Black_Select.png'
  ],
  CanvasBrushCircle: routerRoot + '/canvas/statics/Brush_Circle.png',
  CanvasBrushCircleSelect: routerRoot + '/canvas/statics/Brush_Circle_Select.png',
  CanvasBrushStar: routerRoot + '/canvas/statics/Brush_Star.png',
  CanvasBrushStarSelect: routerRoot + '/canvas/statics/Brush_Star_Select.png',
  CanvasBrushHeart: routerRoot + '/canvas/statics/Brush_Heart.png',
  CanvasBrushHeartSelect: routerRoot + '/canvas/statics/Brush_Heart_Select.png',
  CanvasBgBlack: routerRoot + '/canvas/statics/BG_Black.png',
  CanvasUp: routerRoot + '/canvas/statics/UploadUp.png',
  CanvasWord: routerRoot + '/canvas/statics/UploadWord.png',
  CanvasImgBgHaiYang: 'https://ardownload.kayunzh.com/server/canvas/BG_Canvas_yu.png',
  CanvasImgBgQiChe: 'https://ardownload.kayunzh.com/server/canvas/BG_Canvas_qiche.png',
  CanvasImgBgSenLin: 'https://ardownload.kayunzh.com/server/canvas/BG_Canvas_dongwu.png',
}
// const AppMsg = {
//   network:'网络连接错误，请确保网络畅通后重试',       //网络错误
//   scanPath:'小程序码不正确，请扫描正确的小程序码',    //扫描到错误的小程序码
//   scanResult:'小程序码不正确，请扫描正确的小程序码',  //扫描到错误的二维码
//   scanNull:'小程序码不正确，请扫描正确的小程序码',    //没有扫描到任何结果
//   getImgEmptyArray:'未获取到照片，是否重试',        //图片数组为空（有可能是因为图片尚未上传）
//   downloadMoreImg: '最多可以下载3张图片',           //选择的图片超过3张了
//   downloadNullImg: '请先选择需要下载的图片'         //没有选择任何图片就点击了下载按钮
// }

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//秒数转分秒
const formatSecond = second =>{
  //获取分钟，除以60取整数，得到整数分钟	            
  var minuteTime = parseInt(second / 60);
  //获取秒数，秒数取佘，得到整数秒数	            
  var secondTime = parseInt(second % 60);
  if (minuteTime < 10) {
    minuteTime = '0' + minuteTime;
  }
  if (secondTime < 10) {
    secondTime = '0' + secondTime;
  }
  return minuteTime+':'+secondTime;
}
//判断对象是否为空
const isNullObject = obj => {
  if(obj){
    for (var i in obj) {
      return false;
    }
    return true;
  }
  return false
}
//获取用户openid
const getLoginData = () => {
  return new Promise(function(success,fail){
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: Api.getWxUserId,
          method: 'GET',
          data: {
            code: res.code,
            version: app.globalData.version
          },
          success: function (res) {
            success(res);
          },
          fail: function (res) {
            fail(res);
          }
        })
      }
    })
  });
}

module.exports = {
  formatTime: formatTime,
  Api:Api,
  AppImg:AppImg,
  // AppMsg:AppMsg,
  isNullObject: isNullObject,
  getLoginData:getLoginData,
  formatSecond: formatSecond
}
