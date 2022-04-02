const fs = require('fs');
// JSONStream 是用来处理大文件JSON的，流式的处理JSON，不会占用太多的内存空间，基于事件驱动的
// 思想，只有解析到指定的结构才会处理事件
const JSONStream = require('JSONStream');

(async () => {
    const readable = fs.createReadStream('./examples/data2.json', {
        encoding: 'utf-8',
        highWaterMark: 10
    });
    const parser = JSONStream.parse('list.*');
    // const parser = JSONStream.parse('.'); // 解决data1
    readable.pipe(parser);
    parser.on('data', function(data){ 
        console.log(data);
    });
})()