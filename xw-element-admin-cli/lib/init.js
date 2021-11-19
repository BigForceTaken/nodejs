const { promisify } = require('util')
const figlet = promisify(require('figlet'));
const chalk = require('chalk');
const clear = require('clear');
const {clone} = require('../lib/clone')
const log = (name) => {
    console.log(chalk.green(name))
}

const spawn = async (...args) => { // 重写spawn
  const { spawn } = require('child_process')
  return new Promise((resolve,reject) => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on('close',function() {
      resolve()
    })
  })
}

module.exports = async (name) => {
  const data = await figlet('WELCOME TO USE');
  clear()
  log(data)
  log(`🚀正在创建${name}中`)
  await clone('direct:https://gitee.com/panjiachen/vue-element-admin.git',name)
  //安装依赖 在windows下执行的npm 命令方法不同，如下：
  await spawn(process.platform === "win32" ? "npm.cmd" : "npm",['install'],{cwd: `./${name}`})
  log(chalk.green(`
  👌安装完成：
  To get Start:
  ===========================
    cd ${name}
    npm run dev
  ===========================`));
  await spawn(process.platform === "win32" ? "npm.cmd" : "npm",['run','dev'],{cwd: `./${name}`})
}