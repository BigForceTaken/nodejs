
  const Koa = require("koa");
  const session = require("koa-session");
  const { createClient } = require("redis");
  const wrapper = require('co-redis')
  const redisStore = require("koa-redis");
  const client = wrapper(createClient(6379, "localhost"));
  const app = new Koa();
  app.keys = ["some secret"];

  const CONFIG = {
    key: "koa:sid",
    store: redisStore({ client }),
  };
  app.use(session(CONFIG, app));

  app.use(async (ctx) => {
    // 查看redis
    const keys = await client.keys("*");
    console.log("keys", keys);
    
    if (ctx.path === "/favicon.ico") return;
    let n = ctx.session.count || 0;
    ctx.session.count++;
    ctx.body = `你是第${n}次登录`;
  });

  app.listen(3000);

