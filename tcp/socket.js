const net = require('net')

const server = net.createServer();

let clientList = [];
server.on('connection', client => {
    console.log('conn in ', client);
    clientList.push(client)
    client.on('data', function (data) {
        console.log('data:', data.toString())
        clientList.forEach(item => {
            item.write(data)
        })
    })
    
})

server.listen(9000)