const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const app = new Koa();
const router = require('koa-router')()
app.use(static(__dirname, '/'));

// app.use(bodyParser())
// 手写bodyParser实现
app.use(async (ctx,next) => {
  let bodyData = [],_body;
  await new Promise(resolve => {
    ctx.request.req.on('data', function(data){
      bodyData.push(data)
      console.log(data.toString())
    });
    ctx.request.req.on('end', function(){
      _body = Buffer.concat(bodyData);
      resolve()
    })
  })
  ctx.request.body = _body.toString()
  await next()
})
router.post('/add', async (ctx, next) => {
  console.log('body', ctx.request.body)
  ctx.body = ctx.request.body
  next()
})
app.use(router.routes())
app.listen(3000, function(){
  console.log('server listen in 3000')
})