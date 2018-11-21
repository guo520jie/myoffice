// components/dialog/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow:false,
    title:'',
    content:'',
    image:'',
    showCancel:true,
    cancelText:'取消',
    confirmText:'确定',
    showImage:false,
    success:function(e){},
    cancel:function(e){},
    complete:function(e){}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideDialog(){
      this.setData({
        isShow:false
      })
    },
    showDialog(obj){
      this.setData({
        isShow:true
      });
      if (obj.title !== undefined) {
        this.setData({
          title: obj.title
        });
      }else{
        this.setData({
          title: ''
        });
      }
      if(obj.content!==undefined){
        this.setData({
          content: obj.content
        });
      }else{
        this.setData({
          content: ''
        });
      }
      if (obj.showCancel !== undefined) {
        this.setData({
          showCancel: obj.showCancel
        });
      }else{
        this.setData({
          showCancel: true
        });
      }
      if (obj.showImage !== undefined) {
        this.setData({
          showImage: obj.showImage
        });
      }else{
        this.setData({
          showImage: false
        });
      }
      if (obj.image !== undefined) {
        this.setData({
          image: obj.image
        });
      }else{
        this.setData({
          image: ''
        });
      }
      if (obj.cancelText !== undefined) {
        this.setData({
          cancelText: obj.cancelText
        });
      }else{
        this.setData({
          cancelText: '取消'
        });
      }
      if (obj.confirmText !== undefined) {
        this.setData({
          confirmText: obj.confirmText
        });
      }else{
        this.setData({
          confirmText: '确定'
        });
      }
      if(obj.success!==undefined){
        this.setData({
          success:obj.success
        })
      }else{
        this.setData({
          success: function (e) {}
        })
      }
      if (obj.cancel !== undefined) {
        this.setData({
          cancel: obj.cancel
        })
      }else{
        this.setData({
          cancel: function (e) {}
        })
      }
      if (obj.complete !== undefined) {
        this.setData({
          complete: obj.complete
        })
      }else{
        this.setData({
          complete: function (e) {}
        })
      }
    },
    _cancelEvent() {
      var data = {
        confirm:false,
        cancel:true
      }
      this.data.success(data);
      this.complete();
    },
    _confirmEvent() {
      var data = {
        confirm: true,
        cancel: false
      }
      this.data.success(data);
      this.complete();
    },
    complete(){
      this.setData({
        isShow:false
      })
      this.data.complete();
    }
  }
})
