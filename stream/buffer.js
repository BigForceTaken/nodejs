// 创建一个长度为10字节以0填充的Buffer
const buf1 = Buffer.alloc(10);
console.log(buf1);

const buf2 = Buffer.from('a')
console.log(buf2,buf2.toString())
// buffer 默认是以utf-8
const buf3 = Buffer.from('Buffer创建方法');
console.log(buf3);

// 写入Buffer数据
buf1.write('hello');
console.log(buf1);
// 读取Buffer数据
console.log(buf3.toString());

// 合并Buffer
const buf4 = Buffer.concat([buf1, buf3]);
console.log(buf4.toString());
//Buffer类似数组，所以很多数组方法它都有  
// 二进制和字符串 转码 解码 iconv-lite
const iconv = require('iconv-lite');
let  gbk_buf = iconv.encode("你好我来自vue！", 'gbk');  //gbk编码
let  gbk_str= iconv.decode(gbk_buf , 'gbk'); //gbk解码

console.log(1111)
console.log(gbk_buf,gbk_str)