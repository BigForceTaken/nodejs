// const Koa = require('koa');
// const app = new Koa();

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

// app.listen(3000);
const http = require('http')
class MyKoa {
    // 1.use 方法，
    // 2.listen方法
    constructor() {
        this.callbacks = [];
        this.app = http.createServer((req, res) => {
            this.callbacks(cb => {
                cb.call(req,res)
            })
        })
    }
    use(cb) {
        this.callbacks.push(cb)
    }
    listen(port){

    }
}

module.exports = MyKoa