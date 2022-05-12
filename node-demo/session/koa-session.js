const Koa = require('koa')
const session = require('koa-session');

const app = new Koa();
app.keys = ['some secret hurr'];  // 这个是配合signed属性的签名key

const SESSION_CONFIG = {
    key: 'koa:sess', /**  cookie的key。 (默认是 koa:sess) */
    maxAge: 4000,   /**  session 过期时间，以毫秒ms为单位计算 。*/
    autoCommit: true, /** 自动提交到响应头。(默认是 true) */
    overwrite: true, /** 是否允许重写 。(默认是 true) */
    httpOnly: true, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
    signed: true, /** 是否签名。(默认是 true) */
    rolling: true, /** 是否每次响应时刷新Session的有效期。(默认是 false) */
    renew: false, /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
};
//注册
app.use(session(SESSION_CONFIG,app))

app.use(ctx => {
    if(ctx.path === '/favicon.ico') return;

    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = '第' + n + '访问'
})

app.listen(3000,() => {
    console.log('server listen in 3000');
})