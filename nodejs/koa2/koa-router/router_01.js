const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

//参1：请求路径，参2：callback回调函数
router.get('/',(ctx,next)=>{
    ctx.body = 'hello lval'
})
.get('/todo',(ctx,next)=>{
    ctx.body = 'todo pages'
})

// 装载路由
app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3000,()=>{
    console.log('sever starting at localhost:3000')
})