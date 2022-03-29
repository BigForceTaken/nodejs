/**
 * 实现一个简单的文件系统存储功能，
 * 把存储的对象存入本地json文件中
 */
/**
 * 获取文件系统的json文件，传入key，返回value
 * @param {*} key 
 */
const fs = require('fs');
const readline = require('readline')

function get(key) {
    fs.readFile('./db.json', (err,data) => {
        if(data) {
            const _data = JSON.parse(data);
            console.log(_data[key])
        } else {
            console.log('err')
        }
    })    
}

function set(key, value) {
    fs.readFile('./db.json',(err,data) => {
        if(err) {
            console.log('err', err);
            return
        }
         data = data.toString(); // 如果是空白的话，JSON.parse会报错，
            let temp = data ? JSON.parse(data) : {}; 
            temp[key] = value;
            
            console.log(temp)
            fs.writeFile('./db.json',JSON.stringify(temp), (err) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log('写入成功')
                }
            })
    })
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.on('line', function(input) {
    const [op,key,value] = input.split(" ");
    if(op === 'set') {
        set(key,value)
    } else if(op === 'get') {
        get(key)
    } else if(op === 'quit') {
        rl.close()
    } else {
        console.log('没有该指令')
    }
});

rl.on('close',function() {
    console.log('程序结束')
    process.exit(0)
})