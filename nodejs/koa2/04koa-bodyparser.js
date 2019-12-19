const Koa = require('koa');
const app = new Koa();
// 引入koa-bodyparser中间件，这个中间件可以将post请求的参数转为json格式返回
const bodyParser = require('koa-bodyparser');
// 使用中间件后，可以用ctx.request.body进行获取POST请求参数，中间件自动给我们解析为json
app.use(bodyParser());
// request.method可以获取请求方法。get，post或者其他类型(request对象被封在ctx内，所以也可以ctx.method获取)
app.use(async(ctx)=>{
    if(ctx.url === '/' && ctx.method === 'GET'){
        let html = `
            <h1>Koa2 request post demo</h1>
            <form method="POST" action="/">
            <p>userName</p>
            <input name="userName" /> <br/>
            <p>age</p>
            <input name="age" /> <br/>
            <p>webSite</p>
            <input name='webSite' /><br/>
            <button type="submit">提交到本页</button>
            </form>
        `
        ctx.body = html
    }else if (ctx.url === '/' &&ctx.method === 'POST'){
        let postdata = ctx.request.body
        ctx.body = postdata
    }else {
        // 其他请求显示404
        ctx.body = '<h1>404!</h1>'
    }
})


app.listen(3000,()=>{
    console.log('server starting at localhost:3000')
})