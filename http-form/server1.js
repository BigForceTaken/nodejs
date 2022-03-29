const http = require('http');
const fs = require('fs');

const server = http.createServer(async (req,res) => {
    const { url, method } = req;
    if(url === '/' && method === 'GET'){
        console.log(url);
       const data = await fs.promises.readFile('./index.html');
       res.end(data)
    } else if(url === '/json' && method === 'GET') {
        res.writeHead(200,{
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({
            username: 'zhaoyun1'
        }))
    }
});

server.listen(3000)