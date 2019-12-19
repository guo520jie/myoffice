const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
// 实例化router时可以设置prefix属性增加层级
// const router = new Router({
//     prefix:'/lval'
// })

// 子路由home
let home = new Router()
home.get('/lval',(ctx,next)=>{
    ctx.body = 'home lval'
})
.get('/todo',(ctx,next)=>{
    ctx.body = 'home todo'
})

// 子路由page
let page = new Router()
page.get('/lval',(ctx,next)=>{
    ctx.body = 'page lval'
})
.get('/todo',(ctx,next)=>{
    ctx.body = 'page todo'
})

// 装载子路由
let router = new Router()
router.use('/home',home.routes(),home.allowedMethods());
router.use('/page',page.routes(),page.allowedMethods())



// 装载路由中间件
app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3000,()=>{
    console.log('sever starting at localhost:3000')
})