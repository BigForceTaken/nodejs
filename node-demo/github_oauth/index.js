const config = {
    client_id:'66c087ff559a3859c669',
    client_secret: 'ceb29027c49440abf5fb058fdefdac6792b1b3cb'
}

const Koa = require('koa')
const app = new Koa();
const router = require('koa-router')()
const static = require('koa-static')
const querystring = require('querystring')
const axios = require('axios')

app.use(static(__dirname + '/'))
router.get('/github/login',async ctx => {
  console.log(ctx.request.url);  
  //重定向到认证接口,并配置参数
  var path = "https://github.com/login/oauth/authorize";
  path += '?client_id=' + config.client_id;
  //转发到授权服务器
  ctx.redirect(path);
})

router.get('/auth/github/callback', async ctx => {
    console.log('callback',ctx.query.code);
    const {code} = ctx.query
    const params = {
        code,
        client_id: config.client_id,
        client_secret: config.client_secret
    }
    let res = await axios.post('https://github.com/login/oauth/access_token',params)
    console.log('res',querystring.parse(res.data));
    const { access_token} = querystring.parse(res.data)
    res = await axios.get('https://api.github.com/user?access_token='+access_token)
    console.log('res2',res.data);
    ctx.body = `
        <h1>Hello ${res.data.login}</h1>
        <img src="${res.data.avatar_url}" alt=""/>
        `
    
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(7001,() => {
    console.log('server listen in 7001');
})