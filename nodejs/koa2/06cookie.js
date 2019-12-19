
// cookie的设置和读取
// ctx.cookies.get(name,[optins]):读取上下文请求中的cookie。
// ctx.cookies.set(name,value,[options])：在上下文中写入cookie。

// 写入cookie操作
const Koa = require('koa')
const app = new Koa()

app.use(async(ctx)=>{
    if(ctx.url == '/index'){
        ctx.cookies.set('name','lval',{
            domain:'127.0.0.1',//写入cookie所在的域名
            path:'/index',       // 写cookie所在的路径
            maxAge:1000*60*60*24,   // cookie有效时长
            expires:new Date('2018-12-31'), // cookie失效时间
            httpOnly:false,  // 是否只用于http请求中获取
            overwrite:false  // 是否允许重写
        })
        ctx.body = 'cookie is ok'
    }else{
        // 获取cookie
        if(ctx.cookies.get('name')){
            ctx.body = ctx.cookies.get('name')
        }else{
            ctx.body = 'cookie is defeated'
        }
    }
})


app.listen(3000,()=>{
    console.log('server starting at localhost:3000')
})