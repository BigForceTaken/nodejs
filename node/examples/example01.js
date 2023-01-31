console.log(process.argv)
/** 打印结果
 * [
  'C:\\nodejs\\node.exe',
  'D:\\Nodejs\\node\\examples\\example01.js',
  '--ds',
  '--ah'
]
 */

console.log("该文件所在的文件系统目录:", __dirname) // 该文件所在的文件系统目录

console.log('当前工作目录：', process.cwd())
NODE_ENV='production'

console.log('环境变量env', process.env.NODE_ENV)

