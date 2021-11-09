const connect = require('connect'),
        logger = require('connect-logger'),
        time = require('./request-time')
const server = connect();

server.use(logger());

server.use(time({time: 500}));

server.use(function(req, res, next) {
    if('/a' == req.url) {
        res.writeHead(200);
        console.log('Fast!');
        res.end('Fast Request')
    } else {
        next()
    }
})

server.use(function (req, res, next) {
    if('/b' == req.url) {
        setTimeout(() => {
            res.writeHead(200);
            console.log('slow');
            res.end('Slow Request');
        }, 2000)
    } else {
        next()
    }
})

server.listen(3000)
