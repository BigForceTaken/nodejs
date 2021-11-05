const connect = require('connect'),
    logger = require('connect-logger');

const server = connect()
server.use(logger('dev'))
server.listen(3000)

