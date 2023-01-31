const net = require('net');

var count = 0, users = {};

const server = net.createServer((conn) => { // conn 是一个net.Stream ，也是EventEmitter 
    // console.log('conn:' + JSON.stringify(conn));
    console.log('\033[90m new connection! \033[30m')
    conn.write(
    ' \n welcome!' +
    '\n there is ' + count + ' people connect,'+
    '\n please set your name!'
    );

    count++;
    conn.setEncoding('utf-8'); // TCP协议是面向字节的，所以需要转码
   
    var nickname; // 本次连接的nickname
    var str = ''; // 本次连接存储临时输入的data
    conn.on('data', function(data){
         // 广播消息
        function broadcast(msg, exceptMyself) {
            for(var i in users) {
                if(!exceptMyself || i !== nickname) {
                    users[i].write(msg)
                }
            }
        }
        str += data;
        if(str.indexOf('\n') < 0 ) {
            console.log('str:', str);
            return;
        }
        data = str.replace('\n\r', '');
        str = '';
        console.log('data', data)
        if(!nickname) {
            if(users[data]) {
                conn.write('\033[93m > nickname already in use. try again:\033[39m ');
                return;
            } else {
                nickname = data;
                users[nickname] = conn;
                // 广播加入信息
                broadcast('\033[90m > ' + nickname + ' joined the room\033[39m\n', true)
            }
        } else {
            // 广播发言内容
            broadcast('\033[96m > ' + nickname + ':\033[39m ' + data + '\n',true)
        }
    });
    conn.on('close', function() {
        count--;
        delete users[nickname];
        broadcast('\033[90m > ' + nickname + ' left the room\033[39m\n');
    })
});
server.listen(3000, function(){
    console.log('\033[96m   server listening on *:3000\033[39m');
})