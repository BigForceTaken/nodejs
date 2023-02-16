const Koa = require('koa')
const session = require('koa-session')
const cors = require('koa2-cors');
const router = require('koa-router')()
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const app = new Koa();
app.keys = ['some secret'];

const CONFIG = {
  key: 'sid:'
}
app.use(static(__dirname + '/'));
app.use(cors({ // 允许携带cookie
  credentials: true
}))
app.use(bodyParser())
app.use(session(CONFIG,app))
app.use((ctx,next) => {
  if(ctx.url === '/login') {
    next()
  } else {
    if(!ctx.session.userInfo) {
      ctx.body = {msg: 'login failed'}
    } else {
      next()
    }
  }
})
router.post('/login',(ctx,next) =>{
  const { body } = ctx.request;
  console.log(body)
  ctx.session.userInfo = body.username;
  ctx.body = {
    msg: 'login success'
  }
})
router.get('/getUser',ctx => {
  ctx.body = ctx.session.userInfo;
})
router.post('/logout', (ctx, next) => {
  delete ctx.session.userInfo;
  ctx.body ={
    msg: 'logout'
  }
})
app.use(router.routes())

app.listen(3000)
