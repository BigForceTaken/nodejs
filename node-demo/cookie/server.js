const http = require('http');

const app = http.createServer((req,res) => {
    console.log('url:', req.url);
    console.log('cookies:', req.headers.cookie);
    res.setHeader('Set-Cookie','cookie=100')
    res.end('cookie ')
})

app.listen(3000,() => {
    console.log('server listen in 3000');
})