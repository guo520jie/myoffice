const Koa = require('koa');
const app = new Koa();
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
        let postdata = await parsePostData(ctx)
        ctx.body = postdata
    }else {
        // 其他请求显示404
        ctx.body = '<h1>404!</h1>'
    }
})

// 将post请求参数拼接成一个字符串
function parsePostData(ctx){
    return new Promise((resolve,reject)=>{
        try{
            let postdata = ''
            // 请求流传送时触发
            ctx.req.on('data',(data)=>{
                postdata+=data
            })
            // 请求结束时触发
            ctx.req.addListener('end',()=>{
                let postData = parseQueryStr(postdata)
                return resolve(postData)
            })
        }catch(error){
            reject(error)
        } 
    })
}

// 字符串封装成JSON对象
function parseQueryStr(queryStr){
    let queryData = {}
    let queryList = queryStr.split('&')
    console.log(queryList)
    for ( let [index,item] of queryList.entries()){
        let itemlist = item.split('=')
        console.log(itemlist)
        // 向queryData对象内添加键值对
        // decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码。
        queryData[itemlist[0]] = decodeURIComponent(itemlist[1])
    }
    return queryData
}

app.listen(3000,()=>{
    console.log('server starting at localhost:3000')
})