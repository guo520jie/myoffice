import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login'
import Back from '@/components/back'
import Convert from '@/components/convert'
import Success from '@/components/success'
import Query from '@/components/query'
import Chosedate from '@/components/chosedate'
import Defeated from '@/components/defeated'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title: 'helloword'
      }
    },
    {
      path: '/',
      component: Login,
      meta: {
        title: '礼哆哆商家后台'
      }
    },
    {
      path: '/back',
      component: Back,
      meta: {
        title: '礼哆哆商家后台'
      }
    },
    {
      path: '/convert',
      component: Convert,
      meta: {
        title: '积分核销'
      }
    },
    {
      path: '/success',
      component: Success,
      meta: {
        title: '礼哆哆商家后台'
      }
    },
    {
      path: '/defeated',
      component: Defeated,
      meta: {
        title: '礼哆哆商家后台'
      }
    },
    {
      path: '/query',
      component: Query,
      meta: {
        title: '核销查询'
      }
    },
    {
      path: '/chosedate',
      component: Chosedate,
      meta: {
        title: '核销查询'
      }
    }
  ]
})
