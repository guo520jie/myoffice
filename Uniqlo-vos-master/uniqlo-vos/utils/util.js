const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join("-");
  // return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};
const fun_date = aa => {
  var date1 = new Date(),
    time1 =
      date1.getFullYear() +
      "-" +
      (date1.getMonth() + 1) +
      "-" +
      date1.getDate(); //time1表示当前时间
  var date2 = new Date(date1);
  date2.setDate(date1.getDate() + aa);
  var time2 =
    date2.getFullYear() +
    "-" +
    (date2.getMonth() + 1 < 10
      ? "0" + (date2.getMonth() + 1)
      : date2.getMonth() + 1) +
    "-" +
    (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
  return time2;
};

const getNewData = function(dateTemp, days) {
  var dateTemp = dateTemp.split("-");
  var nDate = new Date(dateTemp[1] + "-" + dateTemp[2] + "-" + dateTemp[0]); //转换为MM-DD-YYYY格式
  var millSeconds = Math.abs(nDate) + days * 24 * 60 * 60 * 1000;
  var rDate = new Date(millSeconds);
  var year = rDate.getFullYear();
  var month = rDate.getMonth() + 1;
  if (month < 10) month = "0" + month;
  var date = rDate.getDate();
  if (date < 10) date = "0" + date;
  return year + "-" + month + "-" + date;
};
//节流
const throttle = function(func, delay) {
  let timer = null;
  return function() {
    let context = this;
    let args = arguments;
    if (!timer) {
      timer = setTimeout(function() {
        func.apply(context, args);
        timer = null;
      }, delay);
    }
  };
};
//防抖
const debounce = (fn, wait) => {
  console.log(fn, wait);
  let timeout = null;
  return function() {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
    console.log(timeout);
  };
};

module.exports = {
  formatTime: formatTime,
  getDateNum: fun_date,
  getNewData: getNewData,
  throttle,
  debounce
};
