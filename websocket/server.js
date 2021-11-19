const express = require('express');
const wsio = require('websocket.io');

const app = express.createServer();
const ws = wsio.attach(app);

app.use(express.static('./public'))

ws.on('connection', function (socket) {
    socket.on('message',function(msg) {
        console.log('get msg from bs: ', msg)
        socket.send('pong')
    })
})

app.listen(3000)