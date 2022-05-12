/**
 * session 相对于cookie 的容量小和改篡改，要进步很多。
 * 可以在服务器存大容量的数据在内存中，无法在浏览器控制台修改值，如果修改服务器也没有值
 * 
 * 原理分析
 * 1. 服务器在接受客户端首次访问时在服务器端创建seesion，然后保存seesion(我们可以将
seesion保存在内存中，也可以保存在redis中，推荐使用后者)，然后给这个session生成一
个唯一的标识字符串,然后在响应头中种下这个唯一标识字符串。
2. 签名。这一步通过秘钥对sid进行签名处理，避免客户端修改sid。（非必需步骤）
3. 浏览器中收到请求响应的时候会解析响应头，然后将sid保存在本地cookie中，浏览器在下次
http请求的请求头中会带上该域名下的cookie信息，
4. 服务器在接受客户端请求时会去解析请求头cookie中的sid，然后根据这个sid去找服务器端
保存的该客户端的session，然后判断该请求是否合法。
 */

const http = require('http');
const session = {}
const app = http.createServer((req,res) => {
    console.log('url:', req.url);
    console.log('cookies:', req.headers.cookie);
    const cookie = req.headers.cookie;
    const sessionKey = 'sid';

    if(cookie && cookie.indexOf(sessionKey) > -1) {
        const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`);
        const sid = pattern.exec(cookie)[1];
        console.log('sid', session[sid]);
        res.setHeader('Content-Type','text/plain;charset=utf8;')
        if(session[sid]) {
            res.end('welcome back');
        }
        res.end('查无此人')
    } else {
        let random = (Math.random() * 9999999999).toFixed()
        console.log('random:', random);
        res.setHeader('Set-Cookie',`${sessionKey}=${random}`);
        session[random] = {name: '老王'}
        res.end('set cookie success')
    }
    res.end('cookie ')
})

app.listen(3000,() => {
    console.log('server listen in 3000');
})