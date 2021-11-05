const net = require('net')

var count = 0,
    users={};
const server = net.createServer((conn) => { // conn.Stream也是一个EventEmitter
    console.log('connect incoming!');
    conn.setEncoding('utf8')
    conn.write('welcome! other people connect count: '+count 
                +'\n' +'please write you username:');
    count++;
    conn.on('close',function () {
        count--;
    });
    conn.on('data',function (data) {
        console.log(data);
        var nickname;
        data = data.replace('\n\r','');
        if(!nickname) {
            if(users[data]){
                conn.write('name aleady exist,please try again:');
                return;
            }else {
                nickname = data;
                users[nickname] = conn;
                broadcast(data,users[nickname])
            }
        }
        function broadcast(msg,notSelf) { // 如果不传人的话，全部用户都要广播
            for(var i in users){
                if(!notSelf || i != nickname){
                    users[i].write(msg)
                }
            }
        }
    })
    
})

server.listen(3000,function () { // listen是异步函数，所以有回调函数作为参数
    console.log('server listen in port: 3000');
})