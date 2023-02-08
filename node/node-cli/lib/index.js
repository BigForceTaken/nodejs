const chalk = require("chalk");
const clear = require("clear");
const { promisify } = require("util");
const clone = require('./download');
const figlet = promisify(require("figlet"));

const spwan = (...args) =>{
  const {spawn} = require('child_process');
  return new Promise(resolve =>{
    const ls = spawn(...args);
    ls.stdout.pipe(process.stdout);
    ls.stderr.pipe(process.stderr);
    ls.on('close',() =>{
      resolve()
    })
  })
  
}
module.exports = async (name) => {
  clear();
  const data = await figlet("Welcome!"); // 排版出数据
  const  log = (str) =>console.log(chalk.green(str)); //打印出转义过的str
  log(data);

  log('开始下载' + name)
  await clone('su37josephxia/vue-template','./'+name)
  
  log(chalk.green('安装依赖'))
  await spwan(process.platform === 'win32' ? 'npm.cmd':'npm',['install'],{cwd: `./${name}`})
  log(chalk.green(`
        安装完成！
        To get start:
        =======================
        cd ${name}
        npm run server
        =======================
  `))
};
