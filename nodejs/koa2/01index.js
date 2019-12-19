const Koa = require('koa')
const app = new Koa()

app.use(async(ctx)=>{
    ctx.body = 'hello lval'
})
app.listen(3000)
console.log('run localhost:3000')