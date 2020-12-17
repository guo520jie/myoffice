// pages/globalQuestion/globalQuestion.js
import wxModal from '../../utils/wxModal'
import api from '../../api/request'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    questionList: [],
    questionIndex: 0,
    actionIndex: 0,
    goods: [], //商品对象,
    nextNavigateTo: '/pages/globalDetails/globalDetails', //组件跳转路径
    hideBack: false,
    hideNext: true,
    imgList: [], //临时存储图片地址
    upLoadImgList: [], //后端返回图片地址
    optionId: [],
    modal: false,
    focusIndex: '',
    customColor: '请填写3位以内数字.',
    customSize: '请填写4位以内数字.',
    actionColor: false,
    actionSize: false,
    curCheckBox: '', //当前点击多行输入盒子
    elementHeight: ''
  },

  //同意
  hideModal() {
    wx.setStorageSync('voicePrompt', true)
    this.setData({
      modal: false
    })
  },
  //不同意提示
  noVoicePrompt() {
    wx.navigateBack({
      delta: 1
    })
  },
  //上传图片start
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: async res => {
        let index = e.currentTarget.dataset.index
        if (res.confirm) {
          let id = this.data.upLoadImgList[index].id || ''
          let newImageList = [...this.data.upLoadImgList]
          newImageList.splice(index, 1)
          if (!id) {
            this.setData({
              upLoadImgList: newImageList,
              imgList: newImageList
            })
            return
          }
          let params = {
            suffix: id,
            method: 'DELETE'
          }
          let data = await api.deleteUploadImge(params)
          if (data.resp_code === 0) {
            this.setData({
              upLoadImgList: newImageList,
              imgList: newImageList
            })
          }
        }
      }
    })
  },
  ChooseImage() {
    wx.setStorageSync('isEnterSubmitSuccessPage', false)
    wxModal.loading()
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: res => {
        console.log(res)
        this.setData({
          imgList: this.data.imgList.concat({ imgUrl: res.tempFilePaths[0] })
        })
        wxModal.loading()
        this.upLoadImage(res.tempFilePaths[0])

        // if (this.data.imgList.length != 0) {
        //   this.setData({
        //     imgList: this.data.imgList.concat({ imgUrl: res.tempFilePaths[0] })
        //   });
        // } else {
        //   this.setData({
        //     imgList: [{ imgUrl: res.tempFilePaths[0] }]
        //   });
        // }
      },
      fail: function(res) {
        // wxModal.alert('服务错误..')
        wxModal.loaded()
        console.log(res)
      }
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    })
  },
  // 上传图片
  async upLoadImage(filePath) {
    let { upLoadImgList } = this.data
    wx.uploadFile({
      url: api.uploadImage,
      filePath: filePath,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data',
        Authorization: wx.getStorageSync('token')
      },
      success: res => {
        let result = JSON.parse(res.data)
        if (result.resp_code === 1) {
          wxModal.loaded()
          wxModal.alert(result.resp_msg)
        } else {
          if (upLoadImgList.length >= 5) {
            wxModal.alert('最多中能上传5张哦.')
          } else {
            upLoadImgList.push({ imgUrl: result.datas.url })
          }
          this.setData({
            upLoadImgList
          })
          wxModal.loaded()
        }
      },
      fail: function(res) {
        wxModal.loaded()
        wxModal.alert('服务错误..')
        console.log(res)
      }
    })
  },
  // 保存用户图片
  async saveUploadImge() {
    let { upLoadImgList, questionObj } = this.data
    let { qsId, qusuId } = questionObj
    let params = {
      query: {
        qsId,
        qusuId,
        imgUrlArray: upLoadImgList
      },
      headerType: 'application/json'
    }
    let res = await api.saveUploadImge(params)
    this.setData({
      imgList: [],
      upLoadImgList: []
    })
  },
  //上传图片end
  selectItem(e) {
    let { index } = e.currentTarget.dataset
    this.setData({
      actionIndex: +index
    })
    console.log(index)
  },
  //扫码
  async onScan() {
    wxModal.loading()
    this.setData({
      goods: []
    })
    wx.scanCode({
      success: res => {
        let code = res.result
        this.CodeDeal(code)
      },
      fail: res => {
        console.log(res)
        wxModal.loaded()
      }
    })
  },
  //扫码调用接口
  async CodeDeal(goodsCode) {
    console.log('goodsCode===================', goodsCode)
    let params = {
      query: {
        code: goodsCode
      },
      method: 'GET'
    }
    let res = await api.globalScanCode(params)
    console.log(res)
    if (res.datas.length > 0) {
      wxModal.loaded()
      this.setData({
        goods: res.datas
      })
    }
  },
  // 清除商品信息
  clearScan() {
    this.setData({
      goods: []
    })
  },
  //获取录音内容
  getRecordMsg(e) {
    // let { optionId } = this.data;
    // if (!optionId) {
    //   if (Array.isArray(optionId) && optionId.length > 0) {
    //   }
    //   return;
    // }
    let { questionList, questionIndex, actionIndex } = this.data
    let { subjectType } = questionList[questionIndex]
    let text =
      questionList[questionIndex].psqItemOptionList[actionIndex].userAudioText
    if (
      questionList[questionIndex].psqItemOptionList[actionIndex].isCheck ||
      subjectType === 3
    ) {
      if (text) {
        questionList[questionIndex].psqItemOptionList[
          actionIndex
        ].userAudioText = text + e.detail + ''
      } else {
        console.log(e.detail)
        console.log(questionList[questionIndex].psqItemOptionList[actionIndex])
        questionList[questionIndex].psqItemOptionList[
          actionIndex
        ].userAudioText = e.detail + ''
      }
    }
    this.setData({ questionList: questionList })
  },
  //获取图片
  async getUserUploadImage(data) {
    let { formId, qsId } = data
    let params = {
      method: 'GET',
      query: {
        formId,
        qsId
      }
    }
    let res = await api.getUserUploadImage(params)
    if (res.resp_code === 0) {
      this.setData({
        upLoadImgList: res.datas,
        imgList: res.datas
      })
    }
  },
  //获取当前点击的语音盒子
  getCurCheckBox(e) {
    let { index } = e.target.dataset
    this.setData({
      curCheckBox: index,
      focusIndex: index
    })
  },
  //选中选项插入语音输入
  focusVoiceContent(e) {
    let { index } = e.currentTarget.dataset
    this.setData({
      focusIndex: index
    })
  },
  //失去焦点触发
  blurVoiceContent() {
    this.setData({
      curCheckBox: ''
    })
  },
  //选项输入文字
  onChangeVoiceContent(e) {
    let { value } = e.detail
    let { questionObj, actionIndex, focusIndex } = this.data
    let newActionIndex = actionIndex
    if (focusIndex !== '') {
      newActionIndex = focusIndex
    }
    questionObj.psqItemOptionList[newActionIndex].userAudioText = value
    this.setData({
      questionObj: questionObj
    })
  },
  // 主观题输入
  onChangeOptionAudioText(e) {
    let { value } = e.detail
    let { questionObj, actionIndex } = this.data
    let { subjectType } = questionObj
    if (subjectType === 3) {
      questionObj.psqItemOptionList[actionIndex].userAudioText = value
    }
    this.setData({ questionObj: questionObj })
  },
  // 保存用户商品信息
  async saveUserScanProduct() {
    let { questionObj, goods } = this.data
    let params = {
      query: {
        qusuId: questionObj.qusuId,
        formId: questionObj.formId,
        plu: goods[0] ? goods[0].pluId : '',
        ...goods[0]
      },
      headerType: 'application/json'
    }
    console.log(params)
    let res = await api.saveUserScanProduct(params)
    if (res.resp_code === 0) {
      this.goods = []
    }
    // console.log(res);
  },
  // 提交用户答案
  async saveUserQuestionAnswer() {
    let {
      orderv,
      qsId,
      qusuId,
      subPoolId,
      subjectType,
      userAudioText,
      psqItemOptionList,
      jumpConfigList,
      questionCount
    } = this.data.questionObj
    let { actionIndex, upLoadImgList, optionId } = this.data
    let jumpType
    let isOver
    if (jumpConfigList.length > 0) {
      if (+subjectType === 1) {
        jumpType = jumpConfigList.find(item => item.jumpOptionId === optionId)
          .jumpType
        console.log(jumpType)
      } else {
        jumpType = jumpConfigList[actionIndex].jumpType
      }
      isOver = jumpType === 2 ? 1 : 0
    }
    isOver = isOver || questionCount === orderv ? 1 : 0 // 1 结束 0 未结束 ( 答题 )
    let questionObj = {
      orderv, //题目序号
      qsId, //组卷编号
      qusuId, //问卷编号
      subPoolId, //题目池编号
      subjectType, //题目类型
      userAudioText, //语音文本内容
      userChooseList: [], //用户选择的选项数据
      userScore: '' //打分
    }
    psqItemOptionList.forEach(item => {
      if (subjectType === 3) {
        questionObj.userChooseList.push({
          userAudioText: item.userAudioText || '',
          optionId: item.optionId
        })
      } else if (item.isCheck) {
        questionObj.userChooseList.push({
          userAudioText: item.userAudioText || '',
          optionId: item.optionId
        })
      }
    })
    let params = {
      query: questionObj,
      headerType: 'application/json'
    }
    let res = await api.saveUserQuestionAnswer(params)
    let { resp_code, datas } = res
    if (resp_code === 0) {
      if (upLoadImgList.length > 0) {
        this.saveUploadImge()
      }
      if (orderv === questionCount || isOver === 1) {
        wx.navigateTo({
          url: `/pages/submitSuccess/submitSuccess?id=${qusuId}&formId=${datas}`
        })
        return
      }
      if (orderv != questionCount) {
        this.getGlobalNextQuestion()
      }
    }
  },
  //获取录音内容
  getRecordMsg(e) {
    let { questionObj, actionIndex, optionId, focusIndex } = this.data
    let currentInput = ''
    let newActionIndex = actionIndex
    if (focusIndex !== '') {
      newActionIndex = focusIndex
    }
    //  判断是否多选
    if (
      Array.isArray(optionId) &&
      focusIndex === '' &&
      questionObj.subjectType !== 3
    ) {
      //取最后一位选项 ID
      currentInput = optionId[optionId.length - 1]
      let currentItem = questionObj.psqItemOptionList.filter(item => {
        return item.optionId == currentInput
      })
      //比对 插入语音
      if (currentItem[0].userAudioText) {
        currentItem[0].userAudioText =
          currentItem[0].userAudioText + e.detail + ''
      } else {
        currentItem[0].userAudioText = e.detail + ''
      }
    } else {
      console.log('userAudioText', newActionIndex)
      let text = questionObj.psqItemOptionList[newActionIndex].userAudioText
      if (questionObj.subjectType === 3) {
        if (text) {
          questionObj.psqItemOptionList[newActionIndex].userAudioText =
            text + e.detail + ''
        } else {
          questionObj.psqItemOptionList[newActionIndex].userAudioText =
            e.detail + ''
        }
      } else if (questionObj.psqItemOptionList[newActionIndex].isCheck) {
        if (text) {
          questionObj.psqItemOptionList[newActionIndex].userAudioText =
            text + e.detail + ''
        } else {
          questionObj.psqItemOptionList[newActionIndex].userAudioText =
            e.detail + ''
        }
      }
    }
    this.setData({ questionObj: questionObj })
    console.log('录音内容', e.detail)
  },
  //下一题 请求
  async getGlobalNextQuestion(init) {
    let { questionObj, optionId } = this.data
    let optionIdArr = []
    let params = {
      method: 'GET'
    }
    if (!init) {
      params.query = {
        qusuId: questionObj.qusuId,
        subjectId: questionObj.subPoolId,
        optionId: Array.isArray(optionId) ? optionId[0] : optionId
      }
      if (questionObj.subjectType === 3) {
        params.query.optionId = questionObj.psqItemOptionList[0].optionId
      }
    }
    let res = await api.getGlobalNextQuestion(params)
    if (res.resp_code === 0) {
      // 初始化数据
      this.setData({
        optionId: '',
        actionIndex: 0
      })
      //记录已提交选项并且赋值
      res.datas.psqItemOptionList.forEach((el, index) => {
        if (el.isCheck) {
          switch (+res.datas.subjectType) {
            //多选
            case 0:
              optionIdArr.push(el.optionId)
              this.setData({
                optionId: optionIdArr
              })
              break
            //单选
            case 1:
              this.setData({
                optionId: el.optionId
              })
              break
            //主观题
            case 3:
              this.setData({
                optionId: el.optionId
              })
              break
            default:
              break
          }
          this.setData({
            actionIndex: index
          })
        }
      })
      this.getUserUploadImage(res.datas)
      this.setData({
        questionObj: res.datas
      })
    }
    this.drowsyUserInfo()
  },
  //下一题 事件
  next() {
    let {
      subIsNull,
      subjectType,
      orderv,
      psqItemOptionList
    } = this.data.questionObj
    let { optionId, actionIndex, goods } = this.data
    //判断Global问卷 第一题扫码商品
    if (orderv === 1) {
      if (goods.length <= 0 && actionIndex != 2) {
        wxModal.alert('请扫描商品..')
        return
      }
      this.saveUserScanProduct()
    }
    //判断必选题
    if (subIsNull === 0) {
      // 判断单选
      if (subjectType === 1 && !optionId) {
        wxModal.alert('此题必选')
        return
      }
      // 判断现选项
      if (subjectType === 0 && optionId.length <= 0) {
        wxModal.alert('此题必选')
        return
      }
      //判断主观题
      if (subjectType === 3 && !psqItemOptionList[0].userAudioText) {
        wxModal.alert('此题必选')
        return
      }
    }
    this.saveUserQuestionAnswer()
  },
  //上一题 请求'
  async getGlobalLastQuestion() {
    let { questionObj, optionId } = this.data
    let optionIdArr = []
    let params = {
      method: 'GET',
      query: {
        qusuId: questionObj.qusuId,
        subjectId: questionObj.subPoolId
      }
    }
    let res = await api.getGlobalLastQuestion(params)
    if (res.resp_code === 0) {
      //记录已提交选项并且赋值
      res.datas.psqItemOptionList.forEach((el, index) => {
        if (el.isCheck) {
          switch (+res.datas.subjectType) {
            //多选
            case 0:
              optionIdArr.push(el.optionId)
              this.setData({
                optionId: optionIdArr
              })
              break
            //单选
            case 1:
              this.setData({
                optionId: el.optionId
              })
              break
            //主观题
            case 3:
              this.setData({
                optionId: el.optionId
              })
              break
            default:
              break
          }
          this.setData({
            actionIndex: index
          })
        }
      })
      this.getUserUploadImage(res.datas)
      this.setData({
        questionObj: res.datas
      })
    }
    this.drowsyUserInfo()
  },
  // 上一题 事件
  back() {
    let { orderv } = this.data.questionObj
    if (orderv === 1) {
      wxModal.alert('当前已经是第一题咯..')
      return
    }
    this.getGlobalLastQuestion()
  },
  //选项判断
  radioChange: function(e) {
    let { item, index } = e.currentTarget.dataset
    let { questionObj, optionId } = this.data
    let subjectType = questionObj.subjectType
    let maxChooseNum = questionObj.maxChooseNum

    this.setData({
      actionIndex: index,
      focusIndex: ''
    })
    console.log(
      'radio发生change事件，携带value值为：',
      item.optionId,
      item.optionTitle
    )

    let newItem = questionObj.psqItemOptionList.find(
      el => el.optionId === item.optionId
    )
    if (newItem.isCheck) {
      item.isCheck = false
    } else {
      if (subjectType === 0 && optionId.length >= maxChooseNum) {
        wxModal.alert(`当前题目最多只能选${maxChooseNum}哦.`)
        return
      } else {
        item.isCheck = true
      }
    }

    questionObj.psqItemOptionList.forEach((i, index) => {
      if (subjectType === 1) {
        //单选判断 清除选项
        delete i.isCheck
      }
      // 点击两次清除选项
      if (i.optionId === item.optionId) {
        if (i.isCheck) {
          item.isCheck = false
        }
        questionObj.psqItemOptionList[index] = item
      }
    })

    switch (subjectType) {
      //单选
      case 1:
        this.setData({
          optionId: item.optionId,
          questionObj: questionObj
        })
        break
      //多选
      case 0:
        //set 数组去重
        // let optionId = [...new Set(this.data.optionId)];
        let newArr = optionId && optionId.length > 0 ? optionId : []
        if (newArr.length <= 0) {
          newArr.push(item.optionId)
        } else {
          let index = newArr.indexOf(item.optionId)
          if (index === -1) {
            newArr.push(item.optionId)
          } else {
            newArr.splice(index, 1)
          }
        }
        this.setData({
          optionId: newArr,
          questionObj: questionObj
        })
        break
      default:
        break
    }
  },
  //图片放大
  previewImage() {
    let { productMainCover } = this.data.goods[0]
    wx.previewImage({
      urls: [productMainCover]
    })
  },
  //生成水印浮层
  drowsyUserInfo: function() {
    let query = wx.createSelectorQuery()
    query
      .select('.container')
      .boundingClientRect(rect => {
        console.log(rect)
        this.setData({
          elementHeight: rect.height + 'px'
        })
      })
      .exec()

    let { name, userId } = JSON.parse(wx.getStorageSync('userInfo'))
    let name_xx = `${name} ${userId}`
    console.log(name_xx, 'name_xx')
    let ctx = wx.createCanvasContext('myCanvas1')
    ctx.rotate((45 * Math.PI) / 180) //设置文字的旋转角度，角度为45°；

    //对斜对角线以左部分进行文字的填充
    for (let j = 1; j < 35; j++) {
      //用for循环达到重复输出文字的效果，这个for循环代表纵向循环
      ctx.beginPath()
      ctx.setFontSize(20)
      ctx.setFillStyle('rgba(169,169,169,.2)')

      ctx.fillText(name_xx, 0, 100 * j)
      for (let i = 1; i < 35; i++) {
        //这个for循环代表横向循环，
        ctx.beginPath()
        ctx.setFontSize(20)
        ctx.setFillStyle('rgba(169,169,169,.2)')
        ctx.fillText(name_xx, 180 * i, 100 * j)
      }
    } //两个for循环的配合，使得文字充满斜对角线的左下部分

    //对斜对角线以右部分进行文字的填充逻辑同上
    for (let j = 0; j < 35; j++) {
      ctx.beginPath()
      ctx.setFontSize(20)
      ctx.setFillStyle('rgba(169,169,169,.2)')

      ctx.fillText(name_xx, 0, -100 * j)
      for (let i = 1; i < 35; i++) {
        ctx.beginPath()
        ctx.setFontSize(20)
        ctx.setFillStyle('rgba(169,169,169,.2)')
        ctx.fillText(name_xx, 180 * i, -100 * j)
      }
    }
    ctx.draw()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.drowsyUserInfo()
    if (!wx.getStorageSync('voicePrompt')) {
      this.setData({
        modal: true
      })
    }
    this.getGlobalNextQuestion('init')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let isEnterSubmitSuccessPage = wx.getStorageSync('isEnterSubmitSuccessPage')
    let { formId, qsId } = this.data.questionObj
    if (isEnterSubmitSuccessPage && formId && qsId) {
      this.getUserUploadImage({ formId, qsId })
      // this.getGlobalLastQuestion()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
