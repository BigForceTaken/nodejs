const fs = require('fs'),http = require('http');

http.createServer(function (req,res) {
    console.log("url",req.url);
    function sendFile(path,type) {
        res.writeHead(200, {'Content-Type': type})
        fs.createReadStream(path).pipe(res)
    }
    if('/images' == req.url.substr(0,7) && 'GET' == req.method && '.jpeg' == req.url.substr(-5)){
        fs.stat(__dirname + req.url,(err,stat) => {
            if(err || !stat.isFile()) {
                res.writeHead(404);
                res.end('Not Found');
                return
            }
            sendFile(__dirname + req.url, 'application/jpeg')
        })
    } else if('/' == req.url && 'GET' == req.method) {
        sendFile(__dirname + '/index.html', 'text/html')
    } else {
        res.writeHead(404);
        res.end('Not Found')
    }
}).listen(3000)