const Koa = require('./lib/new-koa')

const app = new Koa();

// app.use((req,res) => {
//   res.end('hello koa1')
// })
app.use(ctx => {
  ctx.body = 'hello koa!'
})
app.listen(3000, ()=>{
  console.log('koa server listen in 3000')
})