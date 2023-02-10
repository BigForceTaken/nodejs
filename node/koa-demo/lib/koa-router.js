// koa 也是通过中间件的方式来引入路由的
// 实现方法基于策略模式

class Router {
  constructor(){
    this.stock = []
  }
  get(path, cb){
    this.stock.push({
      path,
      method: 'get',
      cb
    })
  }
  post(path, cb){
    this.stock.push({
      path,
      method: 'post',
      cb
    })
  }
  routes(){
    let that = this;
    return async function (ctx,next) {
      let fn;
      that.stock.forEach(item => {
        if(item.path === ctx.url && item.method === ctx.method) {
          fn = item.cb;
        }
      });
      if(typeof fn === 'function'){
        await fn(ctx);
      }
      await next()
    }
  }

}


module.exports = Router