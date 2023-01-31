const http = require('http'),
      qs = require('querystring');

http.createServer((req,res) => {
    console.log('url', req.url)
    console.log('method', req.method) // method 是大写

    if(req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(
            [
                '<form method="POST" action="/url">'
                ,   '<h1>My form</h1>'
                ,   '<fieldset>'
                ,   '<label>Personal information</label>'
                ,   '<p>What is your name?</p>'
                ,   '<input type="text" name="name" />'
                ,   '<p><button>Submit</button></p>'
                ,   '</fieldset>'
                ,'</form>'
            ].join(' ')
        )
    } else if(String(req.url).indexOf('/url') > -1 && req.method === 'POST') {
        var body = ''
        req.on('data',function(data){
            body += data;
        });
        req.on('end', function() {
            
            res.writeHead(200, {'Content-Type': 'text/html'});
            // res.end('<p>content-type: '+ req.headers['content-type']+'</p> \n data:' + body );
            res.end('<b>Your name is  '+qs.parse(body).name+' </b>')
            // content-type:  application/x-www-form-urlencoded  浏览器也会自动在提交表单数据时设置content-type
        })
    } else {
        res.writeHead(404);
        res.end('Not Found')
    }
}).listen(3000)