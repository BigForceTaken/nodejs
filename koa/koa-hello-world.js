const Koa = require('koa');
const app = new Koa();

app.use( async (ctx,next) => {
    await next()
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
}).use( async (ctx,next) => {
    const start = Date.now();
    await next();
    let rt = Date.now() - start;
    ctx.set('X-Response-Time', `${rt}ms`)
}).use(async (ctx,next) => {
    ctx.body = "Hello ";
    await next();
}).use(async (ctx) => {
    ctx.body = ctx.body + " World!"
})
console.log("env", app.env);
app.listen(3000)