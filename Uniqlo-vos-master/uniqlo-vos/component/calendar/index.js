const app = getApp();

const MODES = {
  normal: "normal",
  picker: "picker",
  pickerRange: "pickerRange"
};
const LANGUAGES = {
  en: "EN",
  zh: "ZH",
  jp: "JP"
};
import util from "../../utils/util.js";
const SELECTEDMODE = {
  square: "square",
  round: "round"
};

const MONTHS_EN = [
  "",
  "Jan ",
  "Feb ",
  "Mar ",
  "Apr ",
  "May ",
  "Jun ",
  "Jul ",
  "Aug ",
  "Sept ",
  "Oct ",
  "Nov ",
  "Dec "
];
const WEEKDAYS_ZH = ["日", "一", "二", "三", "四", "五", "六"];
const WEEKDAYS_EN = ["SUN", "MON", "TUES", "WED", "THUR", "FRI", "SAT"];
const WEEKDAYS_JP = ["日", "一", "二", "三", "四", "五", "六"];

Component({
  properties: {
    mode: {
      type: String,
      value: "normal"
    },
    msg: {
      type: String,
      value: "自定义"
    },
    bottomPadding: {
      type: Boolean,
      value: true
    },
    showTime: {
      type: Boolean,
      value: true
    },
    activationIndex: {
      type: Number
    },
    placeholder: {
      type: String,
      value: "请选择日期"
    },
    title: {
      type: String,
      value: ""
    },
    weekdays: {
      type: Array,
      value: []
    },
    language: {
      type: String,
      value: "ZH"
    },
    selectedMode: {
      type: String,
      value: "round"
    },
    showMoreMonths: {
      // 是否上/下月
      type: Boolean,
      value: true
    },
    showMoreDays: {
      // 是否显示非本月的日期
      type: Boolean,
      value: true
    },
    showDot: {
      // 是否日期下的小点
      type: Boolean,
      value: true
    },
    year: {
      type: Number,
      value: -1
    },
    month: {
      // 注意，这里的month从1开始
      type: Number,
      value: -1
    },
    selectedDate: {
      type: String,
      value: ""
    },
    beginDate: {
      type: String,
      value: wx.getStorageSync("star") || util.getDateNum(-7)
    },
    endDate: {
      type: String,
      value: wx.getStorageSync("end") || util.formatTime(new Date())
    },
    daysStyle: {
      type: Array,
      value: []
    },
    dotColor: {
      type: String,
      value: "#f00"
    },
    dotDays: {
      type: Array,
      value: []
    }
  },
  data: {
    initFinished: false,
    selectedClassName: "",
    currenDate: null, // 当前显示月份的第一天
    days: [],
    beginDateObj: null,
    endDateObj: null,
    formatValue: "",
    showCalendar: false,
    isok: "",
    star: "",
    end: ""
  },
  observers: {
    dotDays: function(dotDays) {
      if (this.data.initFinished) {
        this.refreshCalendar();
      }
    },
    daysStyle: function() {
      if (this.data.initFinished) {
        this.refreshCalendar();
      }
    },
    selectedDate: function() {
      if (this.data.initFinished) {
        this.refreshCalendar();
      }
    }
  },
  created: function() {
    console.log("qawsertyuiop[");
    app.globalData.event.subscribeOn("back", () => {
      this.setData({
        showCalendar: false
      });
    });
    let beginDate = wx.getStorageSync("star") || util.getDateNum(-7);
    let endDate = wx.getStorageSync("end") || util.formatTime(new Date());
    this.setData({
      beginDate,
      endDate
    });
  },
  attached: function() {
    let lang = wx.getStorageSync("lang");
    console.log(this.data.language, lang);
    let selectedClassName;
    if (SELECTEDMODE.square == this.data.selectedMode) {
      selectedClassName = "day-selected-square";
    } else {
      selectedClassName = "day-selected-round";
    }
    if (this.data.mode == MODES.pickerRange) {
      // 范围选择模式，不存在被选中的单一日期,
      // console.log("vbnm,.")
      if (this.data.beginDate != "" && this.data.endDate != "") {
        let beginDateObj = new Date(this.data.beginDate.replace("-", "/"));
        let endDateObj = new Date(this.data.endDate.replace("-", "/"));
        // let formatValue = this.formatDate(beginDateObj) + " " + '--' + " " + this.formatDate(endDateObj)
        let formatValue =
          this.formatDate(this.data.beginDate) +
          this.formatDate(this.data.endDate);
        let star = this.formatDate(this.data.beginDate);
        let end = this.formatDate(this.data.endDate);
        this.setData({
          formatValue,
          beginDateObj,
          endDateObj,
          star,
          end
        });
      }
      this.setData({
        selectedDate: ""
      });
    } else {
      this.setData({
        formatValue: this.data.selectedDate
      });
    }
    let now = new Date();
    let year, month;
    if (this.data.year != -1 && this.data.month != -1) {
      year = this.data.year;
      month = this.data.month;
    } else {
      year = now.getFullYear();
      month = now.getMonth() + 1;
    }

    let currenDate = new Date(year + "/" + month + "/1");
    let beginDate = wx.getStorageSync("star") || util.getDateNum(-7);
    let endDate = wx.getStorageSync("end") || util.formatTime(new Date());
    let weekdays = WEEKDAYS_ZH;
    switch (lang) {
      case "1":
        weekdays = WEEKDAYS_EN;
        this.setData({
          isok: "confirm"
        });
        break;
      case "0":
        weekdays = WEEKDAYS_ZH;
        this.data.isok = "确认";
        this.setData({
          isok: "确认"
        });
        break;
      case "2":
        weekdays = WEEKDAYS_JP;
        this.data.isok = "確認";
        this.setData({
          isok: "確認"
        });
        break;
      default: {
        weekdays = WEEKDAYS_ZH;
        this.setData({
          isok: "确认"
        });
        break;
      }
    }
    this.setData({
      initFinished: true,
      currenDate,
      weekdays,
      beginDate,
      endDate,
      selectedClassName
    });
    this.refreshCalendar();
  },
  methods: {
    refreshCalendar: function() {
      const now = new Date();
      console.log(this.data.language);
      let currenDate = this.data.currenDate;
      let year = currenDate.getFullYear();
      let month = currenDate.getMonth() + 1;
      let days = [];
      let days_pre = [];
      let days_next = [];
      let length_days = this.getMonthDayCount(currenDate);
      // 本月的天数数据
      for (let i = 0; i < length_days; i++) {
        let date = new Date(currenDate.getTime() + 86400000 * i);
        let id = this.formatDate(date);
        let day = {
          id: id,
          date: date,
          currentMonth: true
        };
        days.push(day);
      }
      let d_first_day = this.getFirstDay(currenDate);
      let lenght_pre = d_first_day.getDay();
      for (let i = 0; i < lenght_pre; i++) {
        let date = new Date(currenDate.getTime() - 86400000 * (lenght_pre - i));
        let id = this.formatDate(date);
        let day = {
          id: id,
          date: date,
          currentMonth: false
        };

        days_pre.push(day);
      }
      days = [...days_pre, ...days];
      let lenght_next = Math.abs((days.length % 7) - 7);
      lenght_next = lenght_next == 7 ? 0 : lenght_next;
      let d_next_month_first_day = this.getNextMonthFirstDay(currenDate);

      for (let i = 0; i < lenght_next; i++) {
        let date = new Date(d_next_month_first_day.getTime() + 86400000 * i);
        let id = this.formatDate(date);
        let day = {
          id: id,
          date: date,
          currentMonth: false
        };
        days_next.push(day);
      }
      days = [...days, ...days_next];
      const nowFormat = this.formatDate(now.getTime());
      // 统一处理一些特殊属性
      days.forEach(element => {
        element.isToday = element.id === nowFormat;
        if (element.isToday) {
          element.className = "today";
        }
        if (element.currentMonth) {
          element.text = "" + element.date.getDate();
          element.clickable = true;
        } else {
          if (this.data.showMoreDays) {
            element.text = "" + element.date.getDate();
            element.clickable = true;
          } else {
            element.text = "";
            element.clickable = false;
          }
        }
        if (this.data.dotDays.includes(element.id)) {
          element.showDot = true;
          element.dotColor = this.data.dotColor;
        }
        if (this.data.beginDateObj != null && this.data.endDateObj != null) {
          const start = this.data.beginDateObj.getTime();
          const end = this.data.endDateObj.getTime();
          if (start < element.date.getTime() && element.date.getTime() < end) {
            element.inRange = true;
          } else {
            element.inRange = false;
          }
          if (element.date.getTime() == this.data.beginDateObj.getTime()) {
            element.rangeClassName += " day-range-start";
          }
          if (element.date.getTime() == this.data.endDateObj.getTime()) {
            element.rangeClassName += " day-range-end";
          }
        } else {
          element.inRange = false;
        }
        if (element.inRange) {
          element.isToday = false;
          element.rangeClassName = "day-in-range";
        }
        let selectedDate = this.data.selectedDate;
        let beginDate =
          this.data.beginDateObj != null
            ? this.formatDate(this.data.beginDateObj.getTime())
            : "";
        let endDate =
          this.data.endDateObj != null
            ? this.formatDate(this.data.endDateObj.getTime())
            : "";
        if (
          element.id == selectedDate ||
          element.id == beginDate ||
          element.id == endDate
        ) {
          element.className = this.data.selectedClassName;
        }
        element.style = this.getStyleById(element.id);
      });
      let lang = wx.getStorageSync("lang");
      let title = `${year}年 ${month}月`;
      switch (lang) {
        case "1":
          title = `${MONTHS_EN[month]} ${year}`;
          break;
        default:
          title = `${year}年 ${month}月`;
          break;
      }

      this.setData({
        title,
        year,
        month,
        days
      });
    },
    getStyleById: function(id) {
      let styleArr = this.data.daysStyle;
      for (let i = 0; i < styleArr.length; i++) {
        if (styleArr[i].id == id) {
          return styleArr[i].style;
        }
      }
      return "";
    },
    getFirstDay: function(date) {
      let year = date.getFullYear();
      let month = date.getMonth();
      return new Date(year + "/" + (month + 1) + "/1");
    },
    getPreMonthFirstDay: function(date) {
      let year = date.getFullYear();
      let month = date.getMonth();
      if (month == 0) {
        return new Date(year - 1 + "/12/01");
      } else {
        return new Date(year + "/" + month + "/01");
      }
    },
    getNextMonthFirstDay: function(date) {
      let year = date.getFullYear();
      let month = date.getMonth();
      if (month == 11) {
        return new Date(year + 1 + "/01/01");
      } else {
        return new Date(year + "/" + (month + 2) + "/01");
      }
    },
    getMonthDayCount: function(date) {
      let year = date.getFullYear();
      let month = date.getMonth();
      // 日期所在月份的第一天
      let d_first_day = new Date(year + "/" + (month + 1) + "/1");
      let d_pre_month_last_day = new Date(d_first_day.getTime() - 86400000);
      let d_next_month_first_day;
      if (month == 11) {
        d_next_month_first_day = new Date(year + 1 + "/01/01");
      } else {
        d_next_month_first_day = new Date(year + "/" + (month + 2) + "/01");
      }
      return (
        (d_next_month_first_day.getTime() - d_first_day.getTime()) / 86400000
      );
    },
    pre: function() {
      let currenDate = this.getPreMonthFirstDay(this.data.currenDate);
      this.setData({
        currenDate
      });
      this.refreshCalendar();
      this.triggerEvent("OnMonthChange", currenDate);
    },
    next: function() {
      let currenDate = this.getNextMonthFirstDay(this.data.currenDate);
      this.setData({
        currenDate
      });
      this.refreshCalendar();
      this.triggerEvent("OnMonthChange", currenDate);
    },
    showPicker: function() {
      this.setData({
        showCalendar: true
      });
      let obj = {
        beginDate: this.formatDate(this.data.beginDateObj),
        endDate: this.formatDate(this.data.endDateObj),
        isok: false
      };
      this.triggerEvent("getdata", obj);
    },
    back: function() {
      this.setData({
        showCalendar: false
      });
      let obj = {
        beginDate: this.formatDate(this.data.beginDateObj),
        endDate: this.formatDate(this.data.endDateObj),
        isok: true
      };
      app.globalData.event.emit("getTime", obj);
      this.triggerEvent("getdata", obj);
    },
    onDayClick: function(event) {
      let index = event.currentTarget.dataset.index;
      let day = this.data.days[index];
      if (!day.clickable) {
        return;
      }
      if (this.data.mode == MODES.normal || this.data.mode == MODES.picker) {
        let selectedDate = this.formatDate(day.date);
        let formatValue = this.formatDate(day.date);
        let star = "";
        let end = "";
        this.setData({
          selectedDate,
          formatValue
        });
        this.triggerEvent("OnDayClick", day);
      } else if (this.data.mode == MODES.pickerRange) {
        console.log("选择范围模式");
        if (this.data.beginDateObj == null) {
          this.setData({
            beginDateObj: day.date
          });
        } else if (this.data.endDateObj == null) {
          let formatValue;
          // 不管用户怎么选，小的都是开始日期
          if (day.date.getTime() < this.data.beginDateObj.getTime()) {
            let star = this.formatDate(day.date);
            let end = this.formatDate(this.data.beginDateObj);
            formatValue =
              this.formatDate(day.date) +
              " " +
              "--" +
              " " +
              this.formatDate(this.data.beginDateObj);
            this.setData({
              beginDateObj: day.date,
              endDateObj: this.data.beginDateObj,
              formatValue,
              star,
              end
            });
          } else {
            let star = this.formatDate(this.data.beginDateObj);
            let end = this.formatDate(day.date);
            formatValue =
              this.formatDate(this.data.beginDateObj) +
              "  " +
              "--" +
              "  " +
              this.formatDate(day.date);
            this.setData({
              endDateObj: day.date,
              formatValue,
              star,
              end
            });
          }
          let result = {
            begin: this.data.beginDateObj,
            end: this.data.endDateObj
          };
          this.triggerEvent("OnRangeComplete", result);
        } else {
          this.setData({
            beginDateObj: null,
            endDateObj: null
          });
        }
      }
      wx.setStorageSync("star", this.formatDate(this.data.beginDateObj));
      wx.setStorageSync("end", this.formatDate(this.data.endDateObj));
      this.refreshCalendar();
    },
    formatDate: function(time) {
      var d = new Date(time);
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      return (
        year +
        "/" +
        (month < 10 ? "0" + month : month) +
        "/" +
        (day < 10 ? "0" + day : day)
      );
    },
    sendDate: function(time) {
      var d = new Date(time);
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      return (
        year +
        "/" +
        (month < 10 ? "0" + month : month) +
        "/" +
        (day < 10 ? "0" + day : day)
      );
    }
  }
});
