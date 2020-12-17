// component/progress/progress.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    height: {
      type: String,
      value: "40rpx"
    },
    width: {
      type: String,
      value: "100%"
    },
    // 已完成数量
    actionNum: {
      type: Number,
      value: 30
    },
    // 总数
    totalNum: {
      type: Number,
      value: 60
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  created() {
    // this.getPercentage();
  },
  attached() {
    this.getPercentage();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //计算百分比
    getPercentage() {
      let { actionNum, totalNum } = this.data;
      // if(){

      // }

      let percentage = this.data.actionNum / this.data.totalNum;
      console.log(this.data.totalNum);
      console.log(this.data.actionNum);
    }
  }
});
