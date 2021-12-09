/**
 * 该方法运行有问题，文件处理需要其他的方式，仅供参考
 */

const http = require('http'),fs = require('fs'),qs = require('querystring')

const server = http.createServer((req, res) => {
    if(req.url ==='/' && req.method === 'GET'){
        fs.createReadStream('./index.html').pipe(res)
    }else if (req.url === '/upload') {
      if (req.method === 'POST') {
        // 图片文件必须设置为二进制的
        // req.setEncoding('binary');
  
        // 获取content-type中的boundary的值
        // var boundary = req.headers['content-type'].split('; ')[1].replace('boundary=','');
        
        // 记录当前数据的信息
        const fileSize = req.headers['content-length'];
        let curSize = 0;
        let body = '';
  
        // 监听当前的数据
        req.on("data", (data) => {
          curSize += data.length;
          res.write(`文件上传进度: ${curSize/fileSize * 100}%\n`);
        //   body += data;
        });
  
        // 数据结构
        req.on('end', () => {
          // 切割数据
        //   const payload = qs.parse(body, "\r\n", ":");
          // 获取最后的类型(image/png)
        //   const fileType = payload["Content-Type"].substring(1);
          // 获取要截取的长度
        //   const fileTypePosition = body.indexOf(fileType) + fileType.length;
        //   let binaryData = body.substring(fileTypePosition);
        //   binaryData = binaryData.replace(/^\s\s*/, '');
  
          // binaryData = binaryData.replaceAll('\r\n', '');
        //   const finalData = binaryData.substring(0, binaryData.indexOf('--'+boundary+'--'));
  
        //   fs.writeFile('./boo.png', finalData, 'binary', (err) => {
            // console.log(err);
            res.end("文件上传完成~");
        //   })
        })
      }
    } else {
      res.end("error message");
    }
  });

  server.listen(3000)