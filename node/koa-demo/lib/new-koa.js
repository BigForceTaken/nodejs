const http = require("http");
const request = require('./koa-request')
const response = require('./koa-response');
const context = require('./context')
class Koa {
  use(cb){
    this.callback = cb;
  }
  listen(...args){
    // 创建一个原生服务器
    const app = http.createServer((req,res) => {
      const ctx = this.createContext(req,res);
      this.callback(ctx)
      res.end(ctx.body)
    });
    app.listen(...args)
  }
  createContext(req,res){
    const ctx = Object.create(context);
    ctx.request = Object.create(request)
    ctx.response = Object.create(response)

    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx
  }
}
module.exports = Koa