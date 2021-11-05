const qs = require('querystring')

function sendName(name) {
    require('http').request({
        host: '127.0.0.1',
        port: 3000,
        path: '/name',
        method: 'POST'
    },function (res) {
        var body = ''
        res.setEncoding('utf-8')
        res.on('data',function (data) {
            body += data
        })
        res.on('end',function (params) {
            process.stdout.write('request is complete!')
            process.stdout.write('callback: ', qs.parse(body))
        })
    }).end(qs.stringify({name}))
}
var inputName = ''
process.stdout.write('please input your name: ');
process.stdin.resume();
process.stdin.setEncoding('utf-8')
process.stdin.on('data', function (name) {
    inputName += name;
    sendName(name)
    console.log('name' + name);
})