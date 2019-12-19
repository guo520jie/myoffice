const Koa = require('koa')
const path = require('path')
const views = require('koa-views')
const app = new Koa()


app.use(views(path.join(__dirname,'./view'),{
    extension:'ejs'
}))

app.use(async(ctx)=>{
    let title = 'hello lval'
    await ctx.render('index',{title})
})

app.listen(3000,()=>{
    console.log('server starting at localhost:3000')
})