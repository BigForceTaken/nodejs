require('http').createServer((req,res) => {
   
    res.writeHead(200,{'Content-Type': 'image/jpg'});
    // 方法一;
    var stream = require('fs').createReadStream('./images/01.jpg')
    stream.on('data',function(data){
        res.write(data)
    })
    stream.on('end',function(){
        res.end();
    })
    //方法二： Node 提供了一种便捷的方法
    // require('fs').createReadStream('./images/01.jpg').pipe(res)
}).listen(3000)