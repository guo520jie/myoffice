
function withData(param) {
  return param < 10 ? '0' + param : '' + param;
}
// 年
function withDataYear(param) {
  return param < 10 ? '0' + param + '年' : '' + param + '年';
}
// 月
function withDataMonth(param) {
  return param < 10 ? '0' + param + '月' : '' + param + '月';
}
// 日
function withDataDay(param) {
  return param < 10 ? '0' + param + '日' : '' + param + '日';
}
//时
function withDataHour(param) {
  return param < 10 ? '0' + param + '时' : '' + param + '时';
}
//分
function withDataMinu(param) {
  return param < 10 ? '0' + param + '分' : '' + param + '分';
}
// function getLoopArray(start, end) {
//   var start = start || 0;
//   var end = end || 1;
//   var array = [];
//   for (var i = start; i <= end; i++) {
//     array.push(withData(i));
//   }
//   return array;
// }

// 年
function getLoopArrayYear(start, end) {
  var start = start || 0;
  var end = end || 1;
  var array = [];
  for (var i = start; i <= end; i++) {
    array.push(withDataYear(i));
  }
  return array;
}
// 月
function getLoopArrayMonth(start, end) {
  var start = start || 0;
  var end = end || 1;
  var array = [];
  for (var i = start; i <= end; i++) {
    array.push(withDataMonth(i));
  }
  return array;
}
// 日
function getLoopArrayDay(start, end) {
  var start = start || 0;
  var end = end || 1;
  var array = [];
  for (var i = start; i <= end; i++) {
    array.push(withDataDay(i));
  }
  return array;
}
// 时
function getLoopArrayHour(start, end) {
  var start = start || 0;
  var end = end || 1;
  var array = [];
  for (var i = start; i <= end; i++) {
    array.push(withDataHour(i));
  }
  return array;
}
// 分
function getLoopArrayMinu(start, end) {
  var start = start || 0;
  var end = end || 1;
  var array = [];
  for (var i = start; i <= end; i++) {
    array.push(withDataMinu(i));
  }
  return array;
}
function getMonthDay(year, month) {
  let yearnum = year.slice(0, year.length - 1)
  let newyear = +yearnum
  // console.log(newyear)
  console.log(newyear)
  var flag = newyear % 400 == 0 || (newyear % 4 == 0 && newyear % 100 != 0);
  var array = null

  switch (month) {
    case '01月':
    case '03月':
    case '05月':
    case '07月':
    case '08月':
    case '10月':
    case '12月':
      array = getLoopArrayDay(1, 31)
      break;
    case '04月':
    case '06月':
    case '09月':
    case '11月':
      array = getLoopArrayDay(1, 30)
      break;
    case '02月':
      array = flag ? getLoopArrayDay(1, 29) : getLoopArrayDay(1, 28)
      break;
    default:
      array = '月份格式不正确，请重新输入！'
  }
  console.log(flag)
  return array;
}
function getNewDateArry() {
  // 当前时间的处理
  var newDate = new Date();
  var year = withData(newDate.getFullYear()),
    mont = withDataMonth(newDate.getMonth() + 1),
    date = withDataDay(newDate.getDate()),
    hour = withDataHour(newDate.getHours()),
    minu = withDataMinu(newDate.getMinutes()),
    seco = withData(newDate.getSeconds());

  return [year, mont, date, hour, minu, seco];
}
function dateTimePicker(startYear, endYear, date) {
  // 返回默认显示的数组和联动数组的声明
  var dateTime = [], dateTimeArray = [[], [], [], [], [], []];
  var start = startYear || 1978;
  var end = endYear || 2100;
  // 默认开始显示数据
  // var defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : getNewDateArry();
  var defaultDate = getNewDateArry();
  // 处理联动列表数据
  /*年月日 时分秒*/
  dateTimeArray[0] = getLoopArrayYear(start, end);
  // dateTimeArray[0] = getLoopArray(start, end);
  dateTimeArray[1] = getLoopArrayMonth(1, 12);
  dateTimeArray[2] = getMonthDay(defaultDate[0], defaultDate[1]);
  dateTimeArray[3] = getLoopArrayHour(0, 23);
  dateTimeArray[4] = getLoopArrayMinu(0, 59);
  // dateTimeArray[5] = getLoopArray(0, 59);

  dateTimeArray.forEach((current, index) => {
    dateTime.push(current.indexOf(defaultDate[index]));
  });

  return {
    dateTimeArray: dateTimeArray,
    dateTime: dateTime
  }
}

module.exports = {
  dateTimePicker: dateTimePicker,
  getMonthDay: getMonthDay
}