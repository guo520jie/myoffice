// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './assets/iconfont/iconfont.css'
import store from './store'
import VueScroller from 'vue-scroller'
// 导入 vux 组件
import { XButton, AlertPlugin, DatetimePlugin, LoadingPlugin, WechatPlugin, ConfirmPlugin } from 'vux'

Vue.use(WechatPlugin)
Vue.use(LoadingPlugin)
Vue.use(DatetimePlugin)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)

Vue.component('x-button', XButton)

Vue.config.productionTip = false
// 自定义组件标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

Vue.use(VueScroller)
// 设置axios请求的默认host
axios.defaults.baseURL = 'https://wechat.kayunzh.com'

// 将axios绑定给vue成为一个属性
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
