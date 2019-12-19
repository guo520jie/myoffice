const Koa = require('koa')
const app = new Koa()
const fs = require('fs')


function render(page){
    return new Promise((reslove,resject)=>{
        let pageUrl = `./page/${page}`
        // 以binary二进制的方式读取文章内容
        fs.readFile(pageUrl,'binary',(err,data)=>{
            if(err){
                // 读取错误返回错误信息
                resject(err)
            }else{
                // 读取成功返回读取数据
                reslove(data)
            }
        })
    })
}

async function router(url){
    let page = '404.html'
    switch(url){
        case '/':
            page = 'index.html';
            break;
        case '/index':
            page = 'index.html'
            break
        case '/todo':
            page = 'todo.html'
            break
        case '/404':
            page = '404.html'
            break
        default:
            break
    }
    let html = render(page)
    return html 
}

app.use(async(ctx)=>{
    let url = ctx.request.url
    //  在异步函数前面加上await，函数执行就会等待用await声明的异步函数执行完毕之后，在往下执行
    let html = await router(url)
    ctx.body = html
})

app.listen(3000,()=>{
    console.log('server starting at localhost:3000')
})