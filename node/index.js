console.log(require('./modules/a'))

process.argv.forEach(item => {
    console.log(item)
})

console.log('dirname: ', __dirname)
console.log('filename: ', __filename)