
const fs = require('fs');

const s1 = fs.createReadStream('./text.js');

const s2 = fs.createWriteStream('./text1.js');

s1.pipe(s2,{ // 设置 end 为 false 写入的目标流将会一直处于打开状态
    end: false
});
s1.on('end', function() { //此时就需要监听可读流的 end 事件，结束之后手动调用可写流的 end 事件。
    s2.end('结束');
})
//如果可读流期间发生什么错误，则写入的目标流将不会关闭, 所以还需要监听可读流的error事件
s1.on('error', function(err) {
    console.log('error', err);
    s2.close();
});
