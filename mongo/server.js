// (async () => {
//   const mongo = require("./db");

//   let ret = await mongo.col("fruits").find().toArray();

//   console.log(ret);
// })();
const path = require('path')
const Koa = require('koa');
const static = require('koa-static')
const router = require('koa-router')() // 引入路由方式
const app = new Koa();
const mongo = require('./db')
// 引入静态文件
app.use(static(path.join(__dirname, 'static')))

router.get('/api/category',async (ctx,next) => {
    const col = mongo.col('fruits');
    const category = await col.distinct('category');
    console.log("category", category);
    ctx.body = {data: category}
})

router.get('/api/list',async (ctx,next) => {
    const { query } = ctx.request;
    // console.log('req',query);
    const {page = 1,category,keyword} = query;
    const condition = {};
    if(keyword) {
        condition.name = keyword
    }
    if(category) {
        condition.category = category;
    }
    const col = mongo.col('fruits');
    const total = await col.find(condition).count();
    const ret = await col.find(condition).skip((page - 1) * 5).limit(5).toArray()
    console.log('ret', ret);
    ctx.body = {ok: 1, data: {fruits: ret, page: {page,total}}}
})

app.use(router.routes()); //启动路由
app.use(router.allowedMethods());
app.listen(3000,() => {
    console.log('server listen in 3000');
})