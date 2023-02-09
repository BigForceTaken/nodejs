
require('http').createServer((req,res) => {
  res.writeHead(200)
  res.end('hello world')
}).listen(3000, ()=>{
  console.log('server listen in 3000.')
})