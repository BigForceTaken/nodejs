const http = require('http'),
    fs = require("fs"), path = require('path')
let fileData = [];
http.createServer((req, res) => {
  const { url,method } = req;
  if(url ==='/upload' && method === 'POST') {
    let filename = req.headers['file-name']? req.headers['file-name'] : 'xxx_file';
    console.log('filename:', filename);
    let fis = fs.createWriteStream(path.resolve(__dirname, filename));

    // req.on("data", function(data){
    //   fis.write(data)
    // });
    // req.on("end",function(){
    //   fis.end()
    //   res.end()
    // })

    req.pipe(fis)
    res.end()
  } else if(url === '/' && method === 'GET') {
    // fs.readFile('./index.html', function(err, data){
    //   if(err) {
    //     throw err;
    //   }
    //   res.end(data)
    // })
    let stream = fs.createReadStream(path.resolve(__dirname, './index.html'));
    stream.pipe(res)
  }
}).listen(3000, ()=>{
  console.log('server listen in 3000')
})