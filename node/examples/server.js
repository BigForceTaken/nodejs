// /**
//  * 服务器端接收客户端发送的消息
//  */
// const qs = require('querystring')
// require('http').createServer((req,res) =>{
//     var body= ''
//     req.on('data',function(data){
//         body += data;
//     })
//     req.on('end', function(){
//         res.writeHead(200)
//         console.log('got name is ' + qs.parse(body).name)
//         res.end('Done')
//     })
// }).listen(3000)
var qs = require('querystring');

require('http').createServer(function (req, res) {
  var body = '';

  req.on('data', function (chunk) {
    body += chunk;
  });

  req.on('end', function () {
    res.writeHead(200);
    res.end('Done');

    console.log('\n  got name \033[90m' + qs.parse(body).name + '\033[39m\n');
  });
}).listen(3000);