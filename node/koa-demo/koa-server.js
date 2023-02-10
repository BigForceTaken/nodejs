const Koa = require('./lib/new-koa')

const app = new Koa();

// app.use((req,res) => {
//   res.end('hello koa1')
// })

// const delay = () => Promise.resolve(resolve => setTimeout(() => resolve(), 2000));


// app.use(async (ctx, next) => {
//     ctx.body = "1";
//     await next();
//     ctx.body += "5";
// });

// app.use(async (ctx, next) => {
//     ctx.body += "2";
//     await delay();
//     await next();
//     ctx.body += "4";
// });


// app.use(ctx => {
//   ctx.body += "3";
// })
const Router = require('./lib/koa-router')
const router = new Router()

router.get('/index', async ctx => { ctx.body = 'index page'; });
router.get('/post', async ctx => { ctx.body = 'post page'; });
router.get('/list', async ctx => { ctx.body = 'list page'; });
router.post('/index', async ctx => { ctx.body = 'post page'; });

// 路由实例输出父中间件 router.routes()
app.use(router.routes());

app.listen(3000, ()=>{
  console.log('koa server listen in 3000')
})