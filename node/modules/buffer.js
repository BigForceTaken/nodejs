var buff1 = Buffer.alloc(10) // 创建10个字节的buffer
console.log(buff1)
var mybuffer = Buffer.from('12345');
console.log(mybuffer)
console.log(mybuffer.toString())

buff1.write('hello')
console.log(buff1)

const buff4 = Buffer.concat([mybuffer,buff1]) //合并buffer
console.log(buff4)

