// /**
//  * 服务器端发送HTTP请求
//  */
// const qs = require('querystring'),
//       http = require('http');

// function send(name) {
//     console.log('name:', name)
//     http.request({
//         host: '127.0.0.1',
//         port: 3000,
//         method: 'POST',
//         url: '/'
//     },function(res) {
//         console.log('client callback')
//         res.setEncoding('utf-8')
//         res.on('end', function(){
//             console.log('\n  \033[90m request completed !  \033[39m')
//             process.stdout.write('\n your name :')
//         })

//     }).end(qs.stringify({name}))
// }

// process.stdout.write('please input your name!');
// process.stdin.resume();
// process.stdin.setEncoding('utf-8')
// process.stdin.on('data', function(name) {
//     send(name.replace('\r', ''))
// })
var http = require('http')
  , qs = require('querystring')

function send (theName) {
  http.request({ host: '127.0.0.1', port: 3000, url: '/', method: 'POST' }, function (res) {
    res.setEncoding('utf8');
    res.on('end', function () {
      console.log('\n  \033[90m✔ request complete!\033[39m');
      process.stdout.write('\n  your name: ');
    });
  }).end(qs.stringify({ name: theName }));
}

process.stdout.write('\n  your name: ');
process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function (name) {
  send(name.replace('\n', ''));
});