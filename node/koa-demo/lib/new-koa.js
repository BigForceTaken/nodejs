const http = require("http");
const request = require('./koa-request')
const response = require('./koa-response');
const context = require('./context')
class Koa {
  constructor() {
    this.middleWares = [];
  }
  use(cb){
    this.middleWares.push(cb);
  }
  listen(...args){
    // 创建一个原生服务器
    const app = http.createServer(async (req,res) => {
      const ctx = this.createContext(req,res);
      const fn = this.compose(this.middleWares);
      await fn(ctx);
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
  compose(middlewares) {
    return function (ctx) {
        return dispatch(0)
        function dispatch(i) {
            let fn = middlewares[i]
            if (!fn) {
                return Promise.resolve()
            }
            return Promise.resolve(
                fn(ctx, function next() {
                    return dispatch(i + 1)
                })
            )
        }
    }
}
}
module.exports = Koa