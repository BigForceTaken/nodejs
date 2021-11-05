const connect =  require('connect')
const static = require('serve-static') // middlewire

const server = connect()

server.use(static(__dirname+'/static'))

server.listen(3000)