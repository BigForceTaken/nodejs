// var start = Date.now();

// setTimeout(() => {
//     console.log(Date.now() - start);

//     for(var i =0;i<1000000000;i++){}
// },1000)

// setTimeout(() => {
//     console.log(Date.now() - start);
// },2000)

var http = require("http");
var server = http.createServer(function(req,res){
    response.end("Hello JShaman.com");
});
server.listen(8000);

process.on("uncaughtException",function(err){
    console.error(err.message,err.stack);

    server.close();
    setTimeout(process.exit(),3000);
})
// console.log(process)
// console.log(global);
console.log(require('events').EventEmitter)
