Page({
  data: {
    index: 0,
    multiArray: [],
    objectMultiArray: [
    ],
    multiIndex: [0, 0, 0, 0, 0, 0],
    // date: '2016-09-01',
    start: 2000,
    end: 2050,
    year: [],
    month: [],
    day: [],
    hour: [],
    minute: []
  },
  getYear: function () {
    var year = [];
    for (var i = this.data.start; i <= this.data.end; i++) {
      year.push(i + '年')
    }
    return year;
  },
  getMonth: function () {
    var month = [];
    for (var i = 1; i <= 12; i++) {
      var str = i + '月';
      if (i < 10) {
        str = '0' + i + '月';
      }
      month.push(str);
    }
    return month;
  },
  getDay: function (year, month) {
    var month = parseInt(month, 10);
    var d = new Date(year, month, 0);
    console.log(d.getDate())
    var day = []
    for (var i = 1; i <= d.getDate(); i++) {
      var str = i + '日';
      if (i < 10) {
        str = '0' + i + '日';
      }
      day.push(str);
    }
    return day;
  },
  getHour: function () {
    var hour = []
    for (var i = 0; i <= 23; i++) {
      var str = i + '时';
      if (i < 10) {
        str = '0' + i + '时';
      }
      hour.push(str);
    }
    return hour;
  },
  getMinute: function () {
    var minute = []
    for (var i = 0; i <= 59; i++) {
      var str = i + '分';
      if (i < 10) {
        str = '0' + i + '分';
      }
      minute.push(str);
    }
    return minute;
  },
  // 秒
  // getSecond: function () {
  //   var second = []
  //   for (var i = 0; i <= 59; i++) {
  //     var str = i + '秒';
  //     if (i < 10) {
  //       str = '0' + i + '秒';
  //     }
  //     second.push(str);
  //   }
  //   return second;
  // },
  setDefault: function (year, month, day, hour, minute) {
    // console.log(year, month, day, hour, minute, second)
    var d = new Date();
    // console.log(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes())
    var defaultData = this.data.multiIndex;
    if (!year) {
      year = d.getFullYear();
    }
    if (year >= this.data.start && year <= this.data.end) {
      defaultData[0] = year - this.data.start
    }
    if (!month) {
      month = d.getMonth() + 1;
    }
    if (month >= 1 && month <= 12) {
      defaultData[1] = month - 1;
    }
    if (!day) {
      day = d.getDate();
    }
    var dayData = this.getDay(year, month);
    if (day >= 1 && day <= dayData.length) {
      defaultData[2] = day - 1;
    }
    if (!hour) {
      hour = 0;
    }
    if (hour >= 0 && hour <= 59) {
      defaultData[3] = hour;
    }
    if (!minute) {
      minute = 0;
    }
    if (minute >= 0 && minute <= 59) {
      defaultData[4] = minute;
    }
    // if (!second) {
    //   second = 0;
    // }
    // if (second >= 0 && second <= 59) {
    //   defaultData[5] = second;
    // }
    this.setData({
      multiIndex: defaultData
    })
  },
  onShow: function () {
    var data = [];
    var year = this.getYear();
    var month = this.getMonth();
    var day = this.getDay(this.data.start, 1)
    var hour = this.getHour();
    var minute = this.getMinute();
    // var second = this.getSecond();
    data.push(year);
    data.push(month)
    data.push(day)
    data.push(hour)
    data.push(minute)
    // data.push(second)
    var d = new Date();
    this.setDefault(d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes())
    this.setData({
      multiArray: data,
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
      // second: second
    });
  },
  // bindPickerChange: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     index: e.detail.value
  //   })
  // },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        var day = this.getDay(e.detail.value + this.data.start, data.multiIndex[1] + 1)
        this.setData({
          day: day
        });
        data.multiArray[2] = day;
        if (data.multiIndex[2] + 1 >= day.length) {
          data.multiIndex[2] = day.length - 1;
        }
        break;
      case 1:
        var day = this.getDay(data.multiIndex[0] + this.data.start, e.detail.value + 1)
        this.setData({
          day: day
        });
        data.multiArray[2] = day;
        if (data.multiIndex[2] + 1 >= day.length) {
          data.multiIndex[2] = day.length - 1;
        }
        break;
    }
    this.setData(data);
  },
  // bindDateChange: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     date: e.detail.value
  //   })
  // },
//   bindTimeChange: function (e) {
//     console.log('picker发送选择改变，携带值为', e.detail.value)
//     this.setData({
//       time: e.detail.value
//     })
//   },
//   bindRegionChange: function (e) {
//     console.log('picker发送选择改变，携带值为', e.detail.value)
//     this.setData({
//       region: e.detail.value
//     })
//   }
})