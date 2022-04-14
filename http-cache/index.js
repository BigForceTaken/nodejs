const http = require('http');

function updateTime() {
    this.timer = this.timer || setInterval(() => {
        this.time = new Date();
    },5000)
    console.log('time:', this.time);
    return this.time;
}

const app = http.createServer((req,res) => {
    const { url } = req;
    if('/' === url) {
        const content = `
            <html>
                <body>
                当前时间： ${updateTime()}
                <script src="main.js"></script>
                </body>

            </html>
        `;
        res.writeHead(200,{
            'Content-Type': 'text/html;charset=utf-8'
        });
        res.end(content)
    } else if(url === '/main.js') {
        const content = `document.writeln('<br>JS   Update Time:${updateTime()}')`
        
        // res.writeHead(200,{
        //     'Content-Type': 'text/plain;',
        //      "Expires": new Date(Date.now() + 3*1000).toUTCString(), // 强缓存
        //      "Cache-Control": 'private,max-age=5', //强缓存
            
        // })
        // 协商缓存 last-modified
        res.setHeader("Cache-Control",'private,no-cache');
        // res.setHeader('last-modified',new Date().toUTCString());
        // console.log(req.headers['if-modified-since']);
        // if(new Date(req.headers['if-modified-since']).getTime() + 5*1000 > Date.now()) {
        //     res.statusCode = 304;
        //     res.end();
        //     return
        // }
        const crypto = require('crypto');
        const hash = crypto.createHash('sha1').update(content).digest('hex');
        console.log('hash',hash);
        res.setHeader('Etag', hash);
        // 协商缓存 etag
        console.log(req.headers['if-none-match']);
        if(req.headers['if-none-match'] === hash){
            console.log('Etag协商缓存命中.....')
            res.statusCode = 304
            res.end()
            return 
        }

        res.statusCode = 200;
        res.end(content)
    } else if (url === '/favicon.ico') {
        console.log('favicon..')
        res.end('')
    }
});

app.listen(3000,() => {
    console.log('server run at 3000');
})