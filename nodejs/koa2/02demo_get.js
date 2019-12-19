const Koa = require('koa');
const app = new Koa();
app.use(async(ctx)=>{
    // ctx 上下文对象， request 和 response 对象都被封装在ctx对象内
    let url = ctx.url; //请求的url路径
    let request = ctx.request;
    // query：返回的是格式化好的参数对象。
    // querystring：返回的是请求字符串。
    let req_query = request.query
    let req_querystring = request.querystring
    ctx.body = {
        url,
        req_query,
        req_querystring
    }
})
app.listen(3000,()=>{
    console.log('server starting at localhost:3000')
})

// 直接从ctx中获取Get请求
// request 和 response 对象都被封装在ctx对象内因此我们也可以直接从ctx中获取get数据
// 比如上面的ctx.request可以简写为ctx,获取query参数对象可以直接写为ctx.query