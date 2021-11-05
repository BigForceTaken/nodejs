const http = require('http');
const qs = require('querystring') //NODE提供的解析查询字符串的工具

http.createServer(function (req, res) {
    console.log(req.url)
    if('/' === req.url) {
        //, 
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end([
            '<form method="POST" action="/url">'
        ,       '<h1>My form</h1>'
        ,       '<fieldset>'
        ,       '<label>Personal information</label>'
        ,       '<p>What is your name?</p>'
        ,       '<input type="text" name="name">'
        ,       '<p><button>Submit</button></p>'
        ,       '</fieldset>'
        ,   '</form>'
    ].join(''))
    } else if('/url' === req.url && 'POST' === req.method) {
        var body = '';
        console.log(req.method)
        req.on('data', function (data) {
            console.log('data:', data);
            body += data;
        })
        req.on('end',function () {
            console.log("body", qs.parse(body));
            res.writeHead(200)
            res.end('your name is '+ qs.parse(body).name)
        })
    } else if('/name' === req.url){
        var body = ''
        req.on('data', function (data) { 
            body += data;
        })
        req.on('end',function () {
            console.log('we got your name is :', qs.parse(body).name);
            res.writeHead(200);
            res.end('Done')
        })
    } else if('request' === req.url){
        res.writeHead(200);
        res.end('Hello World')
    } else {
        res.writeHead(404);
        res.end('404')
    }
}).listen(3000)