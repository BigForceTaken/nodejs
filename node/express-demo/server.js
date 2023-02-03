const express = require('express');
const app = express();
app.use(express.static('./public'))

const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', (socket) => { 
    socket.on('join', function(name){
        console.log(name + ' join us');
        socket.nickname = name;
        // 广播,本次连接不会，收到，其他的登录才会收到消息，所以要开两个以上连接
        socket.broadcast.emit('announcement', name + ' joined the chat.')
    });
    socket.on('text', function(msg,fn) {
        socket.broadcast.emit('text', socket.nickname, msg);
        fn(Date.now())
    })
});
server.listen(3000);