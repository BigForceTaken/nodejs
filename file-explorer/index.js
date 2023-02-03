const fs = require("fs"),
  stdin = process.stdin,
  stdout = process.stdout;

fs.readdir(__dirname, (err, files) => {
  if (err) {
    console.log("error ");
    return;
  }
  if (!files.length) {
    console.log("no files");
    return;
  }
  var stats = [];
  // 读取当前目录的文件列表
  function file(i) {
    var filename = files[i];
    fs.stat(__dirname + "/" + filename, (err, stat) => {
      stats[i] = stat; // 暂存当前文件列表信息
      console.log(" ");
      console.log(filename);
      i++;
      if (i === files.length) {
        read();
      } else {
        file(i);
      }
    });
  }
  // 处理用户输入
  function option(data) {
    var filename = files[Number(data)];
    console.log('1111',filename)
    if (!stats[Number(data)]) {
        stdout.write("please select your choice again:");
      } else {
        if(stats[Number(data)].isDirectory()) {
            fs.readdir(__dirname + '/' + filename, (err,files) => {
                files.forEach(file => {
                    console.log('  ' + file)
                })
            })
        } else  {
            fs.readFile(__dirname + "/" +filename,'utf-8',(err,data) =>{
                console.log(data)
            })
        }
      }
  }
  // 读取用户输入
  function read() {
    stdout.write("please select your choice: ");
    stdin.resume();
    stdin.setEncoding("utf-8");
    stdin.on("data", option);
  }
  
  file(0);
});
