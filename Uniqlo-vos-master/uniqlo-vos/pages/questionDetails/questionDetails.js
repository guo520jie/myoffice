// pages/globalDetails/globalDetails.js
import api from '../../api/request'
import wxModal from '../../utils/wxModal'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    questionIndex: 0,
    loading: false,
    goods: {},
    isSpeaking: false,
    optionId: [],
    userAudioText: '',
    questionId: '', //问卷 id
    lastIndex: '', //跳转上一题所在 INDEX,
    hideBack: false,
    hideNext: true,
    imgList: [], //临时存储图片地址
    upLoadImgList: [], //后端返回图片地址
    questionObj: {},
    modal: false,
    actionIndex: 0, //当前题目选项,
    focusIndex: '',
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
          console.log(newImageList)
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
          let res = await api.deleteUploadImge(params)
          if (res.resp_code === 0) {
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
    let newImage = []
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: res => {
        this.setData({
          imgList: this.data.imgList.concat({ imgUrl: res.tempFilePaths[0] })
        })
        wxModal.loading()
        this.upLoadImage(res.tempFilePaths[0])
        // if (this.data.imgList.length != 0) {
        //   this.setData({
        //     imgList: this.data.imgList.concat({ imgUrl: res.tempFilePaths[0] })
        //   })
        // } else {
        //   newImage.push({ imgUrl: res.tempFilePaths[0] })
        //   this.setData({
        //     imgList: newImage
        //   })
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
  async getGoodsDetails() {
    let { productCode } = this.data.questionObj
    if (!productCode) {
      this.setData({
        goods: ''
      })
      return
    }

    let params = {
      query: {
        code: productCode
      },
      method: 'GET'
    }

    let res = await api.searchProductByCodes(params)

    this.setData({
      goods: res.datas
    })
  },
  //获取当前点击的语音盒子
  getCurCheckBox(e) {
    let { index } = e.target.dataset
    this.setData({
      curCheckBox: index,
      focusIndex: index
    })
  },
  //失去焦点触发
  blurVoiceContent() {
    this.setData({
      curCheckBox: ''
    })
  },
  //选中选项插入语音输入
  focusVoiceContent(e) {
    let { index } = e.currentTarget.dataset
    this.setData({
      focusIndex: index
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
  //图片放大
  previewImage() {
    let { productMainCover } = this.data.goods[0]
    let { productImg } = this.data.questionObj
    wx.previewImage({
      urls: [productImg || productMainCover]
    })
  },

  //下一题 请求
  async getPsqItemUserNextQuestion(id) {
    let { questionObj, optionId } = this.data
    let optionIdArr = []
    let params = {
      method: 'GET',
      query: {}
    }
    if (id) {
      params.query = {
        qusuId: id
      }
    } else {
      params.query = {
        qusuId: questionObj.qusuId,
        subjectId: questionObj.subPoolId,
        optionId: Array.isArray(optionId) ? optionId[0] : optionId
      }
    }
    let res = await api.getPsqItemUserNextQuestion(params)
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
      this.getGoodsDetails()
    }
    this.drowsyUserInfo()
  },
  //下一题 事件
  next() {
    let { subIsNull, subjectType, orderv } = this.data.questionObj
    let { optionId, userAudioText } = this.data
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
  async getPsqItemUserLastQuestion() {
    let { questionObj, optionId } = this.data
    let params = {
      method: 'GET',
      query: {
        qusuId: questionObj.qusuId,
        subjectId: questionObj.subPoolId
      }
    }
    let optionIdArr = []
    let res = await api.getPsqItemUserLastQuestion(params)
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
      this.getGoodsDetails()
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
    this.getPsqItemUserLastQuestion()
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
    let { actionIndex, imgList, optionId } = this.data
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
    console.log(res)
    if (resp_code === 0) {
      if (imgList.length > 0) {
        this.saveUploadImge()
      }
      if (orderv === questionCount || isOver === 1) {
        wx.navigateTo({
          url: `/pages/submitSuccess/submitSuccess?id=${qusuId}&formId=${datas}`
        })
        return
      }
      this.setData({
        actionIndex: 0
      })
      if (orderv != questionCount) {
        this.getPsqItemUserNextQuestion()
      }
    }
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
    // wx.setStorageSync("isEnterSubmitSuccessPage", false);
    this.drowsyUserInfo()

    if (!wx.getStorageSync('voicePrompt')) {
      this.setData({
        modal: true
      })
    }
    let { id } = options
    this.getPsqItemUserNextQuestion(id)
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
      // this.getPsqItemUserLastQuestion()
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
