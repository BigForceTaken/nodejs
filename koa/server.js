const Koa = require('./lib/xwKoa');
const Router = require('./lib/Router')
const static = require('./lib/static')

// const Koa = require('koa')
const app = new Koa()
const router = new Router();
// 黑名单
app.use(require("./lib/iptable"));

// 静态服务器
app.use(static(__dirname + '/public'));

// 路由
router.get('/index', async ctx => {
 console.log('index,xx')
 ctx.body = 'index page';
});
router.get('/post', async ctx => { ctx.body = 'post page'; });
router.get('/list', async ctx => { ctx.body = 'list page'; });
router.post('/index', async ctx => { ctx.body = 'post page'; });
// 路由实例输出父中间件 router.routes()
app.use(router.routes());
// 中间件
app.use((ctx, next) => {
    console.log(1)
    ctx.body = [{name: 'tom'}]
    next()
    console.log(5)
})
app.use((ctx,next) => {
    console.log(2)
    next()
    console.log(4)
})
// app.use((ctx, next) => {
//     console.log(3)
// // 同步sleep
// //   const expire = Date.now() + 100;
// //   while (Date.now() < expire)
//   // ctx.body && ctx.body.push(
//   //   {
//   //     name:'jerry'
//   //   }
//   // )
//   console.log('url' + ctx.url)
//   if (ctx.url === '/html') {
//     ctx.type = 'text/html;charset=utf-8'
//     ctx.body = `<b>我的名字是:${ctx.body[0].name}</b>`
//  }
// })
app.listen(3000, '0.0.0.0', () => {
 console.log("监听端口3000");
});
// const app = new koa();
// app.use(async (ctx, next) => {
//     const start = Date.now();
//     await next();
//     console.log('response time: ',Date.now() - start)
// })
// app.use( async (ctx, next) => {
//     const start = Date.now();
//     await next();
//     console.log('loger time: ', Date.now() - start)
// })
// app.use(ctx => {
//     // console.log(ctx);
//     ctx.type = 'application/json'
//     // ctx.req.setHeader('Content-Type', 'application/json')
//     ctx.body = JSON.stringify({ name: 'zhao'})
// })
// app.listen(3000, ()=> {
//     console.log('server listen in 3000')
// })