const http = require('http');
const fs = require('fs');

const server = http.createServer(async (req,res) => {
    const { url, method } = req;
    console.log(url);
    console.log(method);
    console.log( req.headers.accept)
    if(url === '/' && method === 'GET'){
       const data = await fs.promises.readFile('./index.html');
       res.end(data)
    } else if(url === '/json' && method === 'GET') {
        res.writeHead(200,{
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({
            username: 'zhaoyun1'
        }))
    } else if(method === 'GET' && req.headers.accept.indexOf('image/*') > -1) {
        fs.createReadStream('.' + url).pipe(res)
    }
});

server.listen(3000)