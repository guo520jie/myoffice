let config = process.env;
import Api from "@/utils/api";
function getUserid() { //获取uid
  var ua = window.navigator.userAgent.toLowerCase(); //判断浏览器的类型\n
  var user_info = localStorage.getItem("user_info") || null;
  if (isNativeApp()) { //app环境
    var uid = user_info && user_info.uid || getQueryString("uid");
    if (uid && uid != ",") {
      if (uid.indexOf(",") != -1) return uid.split(",")[0];
      return uid;
    } else {
      window.location.href = 'plnliang://index';
    }
  } else if (isWxPlus()) { //小程序环境
    var uid = user_info && user_info.uid || getQueryString("uid");
    if (uid) {
      return uid;
    } else {
      wx.miniProgram.navigateTo({
        url: "/pages/noLogin/noLogin" //跳转小程序授权页面
      })
    }
  } else {
    return user_info && user_info.uid || getQueryString("uid");
  }
  return null;
}

function isWxWeb() { //判断微信环境
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

function getQueryString(name, str) { //获取URL参数
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = (str || window.location.hash).substr((window.location.hash.indexOf('?')) + 1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

function login() { //需要登录
  if (isNativeApp()) { //app环境
    window.location.href = 'plnliang://login';
  } else if (isWxPlus()) { //小程序环境
    wx.miniProgram.navigateTo({
      url: "/pages/noLogin/noLogin"
    })
  } else {
    window.location.href = config.WEB_ROOT + '#/login';
  }
}


function isNativeApp() { //判断原生App
  var ua = window.navigator.userAgent.toLowerCase();
  var regx = /pinliang/
  if (regx.test(ua)) {
    return true;
  } else {
    return false;
  }
}

function isWxPlus() { //判断小程序
  return (window.__wxjs_environment === 'miniprogram');
}


function object2query(o) { //拼接参数
  var r = [];
  for (var key_ in o) {
    r.push(`${key_}=${o[key_]}`);
  }
  return r.join("&");
}
//是否有登录信息
function getUserInfo() {
  try {
    var value = localStorage.getItem('user_info')
    if (value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}
//是否获取到opendi
function getOpenId() {
  try {
    var value = localStorage.getItem('openid')
    if (value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}
//检查验证码
function validatecode(code) {
  if (code.length == 0) {
    return false;
  }
  if (code.length != 6) {
    return false;
  }
  var myreg = /^[0-9]*$/;
  if (!myreg.test(code)) {
    return false;
  }
  return true;
}
//手机号码验证封装
function validatemobile(mobile) {
  if (mobile.length == 0) {
    return false;
  }
  if (mobile.length != 11) {
    return false;
  }
  var myreg = /^1[0-9]\d{9}$/;
  if (!myreg.test(mobile)) {
    return false;
  }
  return true;
}
// 邮箱验证
function checkEmail(email) {
  let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
  if (str.test(email)) {
    return true
  } else {
    // showtoast('请填写正确的邮箱号')
    return false
  }
}
//密码格式验证
function checkPassword(pass) {
  // let str = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/;
  let str = /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])).{6,16}$/;
  if (str.test(pass)) {
    return true
  } else {
    // showtoast('请填写正确的密码')
    return false
  }
}

function showtoast(val, type, duration, center) { //toast封装
  if (val) {
    _vue.$message({
      message: val, //提示的文案
      duration: duration || 1500, //显示的时间
      type: type || 'success', //success/warning/info/error
      center: center || false //显示的位置
    })
  }
}

function getApi(_api) {
  return config.API_ROOT + Api[_api];
}

function isInteger(obj) { //是否为一个整数
  return Math.floor(obj) === obj
}

function toInteger(floatNum) {
  var ret = {
    times: 1,
    num: 0
  }
  if (isInteger(floatNum)) {
    ret.num = floatNum
    return ret
  }
  var strfi = floatNum + ''
  var dotPos = strfi.indexOf('.')
  var len = strfi.substr(dotPos + 1).length
  var times = Math.pow(10, len)
  var intNum = parseInt(floatNum * times + 0.5, 10)
  ret.times = times
  ret.num = intNum
  return ret
}

function operation(a, b, op) {
  var o1 = toInteger(a)
  var o2 = toInteger(b)
  var n1 = o1.num
  var n2 = o2.num
  var t1 = o1.times
  var t2 = o2.times
  var max = t1 > t2 ? t1 : t2
  var result = null
  switch (op) {
    case 'add':
      if (t1 === t2) { // 两个小数位数相同
        result = n1 + n2
      } else if (t1 > t2) { // o1 小数位 大于 o2
        result = n1 + n2 * (t1 / t2)
      } else { // o1 小数位 小于 o2
        result = n1 * (t2 / t1) + n2
      }
      return result / max
    case 'subtract':
      if (t1 === t2) {
        result = n1 - n2
      } else if (t1 > t2) {
        result = n1 - n2 * (t1 / t2)
      } else {
        result = n1 * (t2 / t1) - n2
      }
      return result / max
    case 'multiply':
      result = (n1 * n2) / (t1 * t2)
      return result
    case 'divide':
      result = (n1 / n2) * (t2 / t1)
      return result
  }
}

// 加减乘除的四个接口
function add(a, b) {
  return operation(a, b, 'add')
}

function subtract(a, b) {
  return operation(a, b, 'subtract')
}

function multiply(a, b) {
  return operation(a, b, 'multiply')
}

function divide(a, b) {
  return operation(a, b, 'divide')
}

function toPage(url) { //跳转页面
  _vue.$router.push(url)
}

function countdown(endtime) { //处理倒计时endtime需要毫秒//endtime=new Date(Time).getTime())自行转换
  var enddate = endtime;
  var date = enddate;
  if (date <= 0) {
    return null;
  }
  var days = date / 1000 / 60 / 60 / 24;
  var daysRound = Math.floor(days); //对一个数进行下舍入。
  var hours = date / 1000 / 60 / 60 - (24 * daysRound);
  var hoursRound = Math.floor(hours);
  var minutes = date / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
  var minutesRound = Math.floor(minutes);
  var seconds = date / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
  var secondsRound = Math.floor(seconds);
  return [addZero(daysRound), addZero(hoursRound), addZero(minutesRound), addZero(secondsRound)];
}

function saveKey(name, obj, $expiration_time = null) { //保存数据
  if (obj && typeof obj == "object") {
    if ($expiration_time) {
      obj.$expiration_time = $expiration_time;
    }
    localStorage.setItem(name, JSON.stringify(obj));
  } else if (obj && typeof obj == "string") {
    if ($expiration_time) {
      obj = obj + '_' + $expiration_time;
    }
    localStorage.setItem(name, obj);
  } else {
    localStorage.removeItem(name);
  }
}

function addZero(numbers) { //小于10前面加一个零
  if (numbers < 10) {
    return "0" + numbers
  }
  return numbers;
}

function downLoadUrl() {
  return config.API_ROOT + Api['commonDload'] + '?id=';
}
function getItem(name, exp) { //获取数据
  //var dataObjData=getItem(name,1000);//过期时间为1秒
  //var dataObjData=getItem(name,1000*60);//过期时间为1分钟
  //var dataObjData=getItem(name,1000*60*60);//过期时间为1小时
  //var Obj=getItem(name,1000*60*60*24);//过期时间为24小时
  //var dataObjData=get(name,1000*60*60*24*7);//过期时间为1周
  try {
    var value = localStorage.getItem(name)
    if (value && value.indexOf('{') > -1) {
      return objparse(name, value, exp) || null
    } else {
      var $expiration_time = value.split('_')[1];
      if (value && $expiration_time && exp) {
        if (new Date().getTime() - $expiration_time > exp) {
          console.log('信息已过期');
          localStorage.removeItem(name);
          return null
        }
      } else {
        return value || null
      }
    }
  } catch (e) {
    return null;
  }
}
var queryconcat = function (obj) { //url拼接参数
  if (typeof obj == "object") {
    var keys = Object.keys(obj);
    var results = [];
    for (var i = 0; i < keys.length; i++) {
      var keyName = keys[i];
      results.push(`${keyName}=${obj[keyName]}`);
    }
    return results.join("&");
  }
  return 'test=undefined'
}
var jsUrlHelper = {// 修改url 参数 移除url参数
  putUrlParam: function (url, ref, value) {
    // 如果没有参数
    if (url.indexOf('?') == -1)
      return url + "?" + ref + "=" + value;

    // 如果不包括此参数
    if (url.indexOf(ref) == -1)
      return url + "&" + ref + "=" + value;

    var arr_url = url.split('?');

    var base = arr_url[0];

    var arr_param = arr_url[1].split('&');

    for (var i = 0; i < arr_param.length; i++) {

      var paired = arr_param[i].split('=');

      if (paired[0] == ref) {
        paired[1] = value;
        arr_param[i] = paired.join('=');
        break;
      }
    }

    return base + "?" + arr_param.join('&');
  },
  delUrlParam: function (url, ref) {
    if (url.indexOf(ref) == -1)
      return url;
    var queryIndex = url.lastIndexOf("?");
    var hashIndex = url.lastIndexOf("#");
    var arr_url = url.substring(queryIndex + 1, url.length)
    var base = url.substring(0, queryIndex + 1);
    var arr_param = arr_url.split('&');
    var temp = true;
    var newLength = arr_param.length;
    for (var j = 0, q = 0; j < newLength; j++ , q++) {//删除一个q--，下标变化//可使用倒叙，下标正常。
      var paired = arr_param[q].split('=');
      if (paired[0] == ref) {
        temp = false;
        arr_param.splice(q, 1);
        q--;
      }
    }
    if (temp) {
      return url;
    } else {
      return base + arr_param.join('&');
    }
  }
};
//拆分数组 
function groupArr(array, subGroupLength) {//对象数组，分为的个数
  let index = 0;
  let newArray = [];
  while (index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength));
  }
  return newArray;
}
function numTransforms(value){
  let newValue = ['', '', ''];
  let fr = 1000;
  const ad = 1;
  let num = 3;
  const fm = 1;
  while (value / fr >= 1) {
    fr *= 10;
    num += 1;
    // console.log('数字', value / fr, 'num:', num);
  }
  if (num <= 4) { // 千
    newValue[1] = '';
    newValue[0] = value + '';
  } else if (num <= 8) { // 万
    const text1 = parseInt(num - 4) / 3 > 1 ? '千万' : '万';
    const fm = '万' === text1 ? 10000 : 10000000;
    newValue[1] = text1;
    newValue[0] = parseInt((value / fm) + '');

    // newValue[1] = '';
    // newValue[0] = value + '';
  } else if (num <= 16) {// 亿
    let text1 = (num - 8) / 3 > 1 ? '千亿' : '亿';
    text1 = (num - 8) / 4 > 1 ? '万亿' : text1;
    text1 = (num - 8) / 7 > 1 ? '千万亿' : text1;
    // tslint:disable-next-line:no-shadowed-variable
    let fm = 1;
    if ('亿' === text1) {
      // fm = 100000000;
      fm = 100000000;
    } else if ('千亿' === text1) {
      fm = 100000000000;
    } else if ('万亿' === text1) {
      fm = 1000000000000;
    } else if ('千万亿' === text1) {
      fm = 1000000000000000;
    }
    newValue[1] = text1;
    newValue[0] = parseFloat(value / fm).toFixed(2);
    // newValue[0] = value / fm+ '';
  }
  if (value < 1000) {
    newValue[1] = '';
    newValue[0] = value + '';
  }
  return newValue.join('');
}

function numTransform(value) {
  let newValue = ['', '', ''];
  let fr = 1000;
  const ad = 1;
  let num = 3;
  const fm = 1;
  while (value / fr >= 1) {
    fr *= 10;
    num += 1;
    // console.log('数字', value / fr, 'num:', num);
  }
  if (num <= 4) { // 千
    newValue[1] = '';
    newValue[0] = value + '';
  } else if (num <= 8) { // 万
    // const text1 = parseInt(num - 4) / 3 > 1 ? '千万' : '万';
    // const fm = '万' === text1 ? 10000 : 10000000;
    // newValue[1] = text1;
    // newValue[0] = parseInt((value / fm) + '');

    newValue[1] = '';
    newValue[0] = value + '';
  } else if (num <= 16) {// 亿
    let text1 = (num - 8) / 3 > 1 ? '千亿' : '亿';
    text1 = (num - 8) / 4 > 1 ? '万亿' : text1;
    text1 = (num - 8) / 7 > 1 ? '千万亿' : text1;
    // tslint:disable-next-line:no-shadowed-variable
    let fm = 1;
    if ('亿' === text1) {
      // fm = 100000000;
      fm = 100000000;
    } else if ('千亿' === text1) {
      fm = 100000000000;
    } else if ('万亿' === text1) {
      fm = 1000000000000;
    } else if ('千万亿' === text1) {
      fm = 1000000000000000;
    }
    newValue[1] = text1;
    newValue[0] = parseFloat(value / fm).toFixed(2);
    // newValue[0] = value / fm+ '';
  }
  if (value < 1000) {
    newValue[1] = '';
    newValue[0] = value + '';
  }
  return newValue.join('');
}

function showLoading(text,lock,bg){
  _vue.loading.service({
    lock: lock||true,
    text: text||'加载中……',
    background: bg||'rgba(0, 0, 0, 0.7)',
    // target: document.querySelector('.main-content')//设置加载动画区域
  });
}

function hideLoading(){
  _vue.loading.service().close();
}

/*函数节流*/
function throttle(fn, interval) {
  var enterTime = 0;//触发的时间
  var gapTime = interval || 300 ;//间隔时间，如果interval不传，则默认300ms
  return function() {
    var context = this;
    var backTime = new Date();//第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context,arguments);
      enterTime = backTime;//赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}

/*函数防抖*/
function debounce(fn, interval) {
  var timer;
  var gapTime = interval || 1000;//间隔时间，如果interval不传，则默认1000ms
  return function() {
    clearTimeout(timer);
    var context = this;
    var args = arguments;//保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function() {
      fn.call(context,args);
    }, gapTime);
  };
}
export default {
  throttle,
  debounce,
  numTransforms,
  showLoading,
  hideLoading,
  getQueryString,
  isWxPlus,
  isNativeApp,
  getUserid,
  login,
  object2query,
  getUserInfo,
  getOpenId,
  // getOpenIdApi,
  isWxWeb,
  validatemobile,
  checkEmail,
  showtoast,
  getApi,
  add,
  subtract,
  multiply,
  divide,
  toPage,
  countdown,
  downLoadUrl,
  queryconcat,
  jsUrlHelper,
  checkPassword,
  validatecode,
  saveKey,
  getItem,
  groupArr,
  numTransform
}