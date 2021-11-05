const http = require('http')

http.request({
    host: '127.0.0.1',
    port: 3000,
    method: 'GET',
    url: '/request'
},function (res) {
    var body = ''
    res.setEncoding('utf-8')
    res.on('data', function (data) {
        body += data;
    })
    res.on('end', function () {
        console.log('We got ', body);
    })
}).end()