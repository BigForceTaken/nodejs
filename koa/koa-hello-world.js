const Koa = require('koa');
const router = require('koa-router')();
const path = require('path')
const serve = require('koa-static');
const app = new Koa();
// 静态资源托管
app.use(async (ctx,next) => {
    let start = Date.now();
    await next();
    let time = Date.now() - start;
    console.log(`${ctx.url} 请求 花费 ${time} ms`);
})
app.use(serve(path.join(__dirname,'./static')))

router.get('/list',async (ctx,next) => {
    ctx.body = 'koa list';
})
router.get('/json',async (ctx,next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})

app.use(router.routes())

app.listen(3000)