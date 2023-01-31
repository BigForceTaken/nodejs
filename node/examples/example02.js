const fs = require('fs'),path = require('path');

const files = fs.readdirSync(__dirname +'/' +'css')
console.log('files:', files)
console.log('dirname',__dirname)
files.forEach((file) => {
    if(/\.css/.test(file)){
        fs.watch(__dirname,function(eventType,filename) {
            console.log('eventType: ', eventType)
            console.log('filename: ', filename)
        })
    }
})
console.log('process end')