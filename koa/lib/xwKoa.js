const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')
module.exports = class {
    constructor() {
        this.middlewares = []
    }
    listen(...args) {
        const server = http.createServer(async (req,res) => {
            const ctx = this.createContext(req,res)
            // 把middleware的函数聚合成一个函数，
            const fn = this.compose(this.middlewares);
            await fn(ctx)
            res.end(ctx.body)
        });
        server.listen(...args)
    }

    createContext(req, res) {
        // 新建一个ctx
        const ctx = Object.create(context);
        ctx.request = Object.create(request);
        ctx.response = Object.create(response);

        ctx.req = ctx.request.req = req;
        ctx.res= ctx.response.res = res;
        
        return ctx;
    }
    use(callback) {
        this.middlewares.push(callback)

    }
    compose(middlewares) {
        return function (ctx) {
            return dispatch(0)
            function dispatch(i) { // 执行第一个函数，函数题要return 一个Promise
                let fn = middlewares[i]
                if (!fn) { // 直到最后一个i+1 不存在时就返回resolve() 算是返回完了。
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