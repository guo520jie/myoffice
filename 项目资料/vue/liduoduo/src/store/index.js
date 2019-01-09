import Vue from 'vue'
import Vuex from 'vuex'
import 'es6-promise/auto'
import axios from 'axios'
Vue.use(Vuex)

// 自定义方法

// 创建uuid
function createUUID (len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  var uuid = []
  var i
  radix = radix || chars.length

  if (len) {
  // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
  // rfc4122, version 4 form
    var r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

const state = {
  uuid: '',
  user: {},
  qrCodeUser:{},
}

const mutations = {
  // 将数据存储到cache中
  setCache: function (state, data) {
    if (data.timeout === undefined) {
      data.timeout = 30 * 24 * 3600 * 1000
    }
    var obj = {
      data: data.value,
      timeout: data.timeout + (new Date()).getTime()
    }
    // var cache = Base64.encode(JSON.stringify(obj));
    var cache = JSON.stringify(obj)
    localStorage.setItem(data.key, cache)
  },
  clearCache: function (state, key) {
    localStorage.removeItem(key)
  },
  setAdminUserInfo (state, data) {
    state.user = data
  },
  setQrCodeUserInfo(state,data){
  	state.qrCodeUser = data;
  }
}

const getters = {
  // 将数据从cache中取出
  getCache: function (state) {
    return function (key) {
      var cache_data = localStorage.getItem(key)
      if (!cache_data) {
        return null
      }
      // var data = JSON.parse(Base64.decode(cache_data))
      var data = JSON.parse(cache_data)
      if (data.timeout === 0 || data.timeout > (new Date()).getTime()) {
        return data.data
      }
      localStorage.removeItem(key)
      return null
    }
  },
  getUUID: function () {
    return state.uuid
  },
  getAdminUserInfo: function () {
    return state.user
  },
  getQrCodeUserInfo:function () {
	  return state.qrCodeUser
  }
}

const actions = {
  /**
  * 检测用户是否登录
  * @param getters
  * @param commit
  * @param state
  * @param callback
  */
  checkLogin: function ({getters, commit, state}, callback) {
    if (!state.uuid) {
      var cache_uuid = getters['getCache']('equipment_uuid')
      if (!cache_uuid) {
        cache_uuid = createUUID()
        commit('setCache', {
          key: 'equipment_uuid',
          value:cache_uuid
        })
      }
      state.uuid = cache_uuid
    }
    axios({
      methods: 'get',
      url: '/mfw/xiaoliwu/backend/Login/uuidLogin',
      params: {
        uid: state.uuid
      }
    }).then(res => {
      if (res.data.code === 0) {
        commit('setAdminUserInfo',res.data.user);
      }
      if (callback) {
        callback(res)
      }
    }).catch((res) => {
      console.log('log2', res)
    })
  }
}

export default new Vuex.Store({
  state, getters, mutations, actions
})
