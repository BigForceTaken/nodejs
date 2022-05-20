const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');
const redisStore = require('koa-redis')
const redis = require('redis');
const redisClient = redis.createClient(6379,'localhost');

const wrapper = require('co-redis');
const client = wrapper(redisClient);

app.use(session({
    key: 'koa:sess',
    store: redisStore({client})
},app))

app.use(async (ctx,next) => {
    const keys = await client.keys('*');
    keys.forEach(async key => {
        console.log(await client.get(key));
    })
    await next()
})
app.use(async (ctx) => {
    if(ctx.path === '/favicon.ico') return;

    let n = await client.get('views') || 0;
    ++n;
    await client.set('views',n)
    ctx.body = '第' + n + '访问'
})

app.listen(3000,() => {
    console.log('server listen in 3000');
})