// fs模块是node唯一一个同时提供同步和异步的API
const fs = require('fs');
const stdin = process.stdin,
    stdout = process.stdout;

fs.readdir(__dirname, (err,files) => {
    // console.log(typeof files)
    // process.stdout.write(''+files) // 这个方法只接收字符串
    console.log(" ")
    if(!files.length) {
        return console.log("当前文件夹为空")
    }
    function file(i) {
        const filename = files[i]; //readdir读出来的是filename
        fs.stat(__dirname +'/' + filename,function(err,file) { // stat会给出文件或目录的元数据
            if(file.isDirectory()) {
                console.log(i+' 文件夹： ' + filename)
            }else {
                console.log(i + ' 文 件： ' + filename)
            }
        })
        i++;
        if(i == files.length) {
            console.log("")
            read()
        }else {
            file(i)
        }
    }
    
    function read() {
        process.stdout.write('请输入你选择的文件编号:');
                stdin.resume();
                stdin.setEncoding('utf8');
        stdin.on('data',options);
        function options(data) {
            var filename = files[Number(data)]
            if(!filename){
                stdout.write('请输入你的选择: ')
            } else {
                stdin.pause(); // 停止监听
                fs.readFile(__dirname + '/' +filename,'utf8',(err,data) => {
                    console.log(data)
                })
            }
        }
    }
    file(0)
})