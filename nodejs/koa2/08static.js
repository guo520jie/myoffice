const Koa = require('koa')
// 引入node的path模块
const path = require('path')
// koa-static中间件，用于处理静态文件
const static = require('koa-static')

const app = new Koa()

// 存放静态文件的目录
const staticPath = '/static'

// 使用中间件，利用path模块的方法拼接出静态文件目录的绝对路径
app.use(static(path.join(__dirname,staticPath)))

app.use(async(ctx)=>{
    ctx.body = 'hello word'
})

app.listen(3000,()=>{
    console.log('server starting at loaclhost:3000')
})