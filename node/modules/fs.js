const fs = require('fs');
const path = require('path')
const { promisify } = require('util');
var lastdate = new Date().getTime()
// const data = fs.readFileSync('./2.pdf')

// fs.readFile('./1.jpg', function (err,data) {
    
//     console.log('data',new Date().getTime()-lastdate +'ms')
// })
// console.log(new Date().getTime() - lastdate)

// const readFile = promisify(fs.readFile);

// readFile('./a.js',{encoding: 'utf-8'}).then(res => { // 如果不配置encoding则返回的是Buffer
//     console.log('read',res)
// })
//新建文件夹
const dirname = '../testDir'
if(!fs.existsSync(dirname)) {
    fs.mkdir(dirname, (err) => {
      console.log('err',err);  
    })
}
fs.writeFile(path.join(dirname, 'foo1.txt'), 'Hello foo', err => {
    console.log(err);
})
//读文件夹
// fs.readdir(dirname,(err,files) => {
//     console.log(files);
// })
// 遍历文件夹中的文件
function readDir(dirs) {
    fs.readdir(dirs, {withFileTypes: true},(err,files) => {
        files.forEach(file => {
            if(file.isDirectory()) {
                const newDir = path.resolve(dirs, file.name);
                readDir(newDir)
            } else {
                console.log(file.name)
            }
        })
    })
}
readDir(dirname)