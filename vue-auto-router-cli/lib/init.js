const figlet = require("util").promisify(require('figlet'));
const clear = require('clear');
const chalk = require('chalk');
const log = (content) => console.log(chalk.green(content));
const { clone } = require('./download');
// 通过子进程运行安装依赖的命令行
const spawn = async (...args) => {
    const { spawn } = require('child_process');
    return new Promise((resolve) => {
        const proc = spawn(...args);
        proc.stdout.pipe(process.stdout);
        proc.stderr.pipe(process.stderr);
        proc.on('close', () => {
            resolve()
        })
    })
}
module.exports = async (name) => {
    clear();
    const data = await figlet(`Welcome ${name}!`)
    log(data)
    log('火箭 创建项目：'+ name);
    //这里的地址， 必须是一个仓库地址 不能是仓库下面的地址
    await clone('github:su37josephxia/vue-template', name)
    log('下载完成，安装依赖.');
    // windows 下 执行的命令不一样
    await spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install'], { cwd: `./${name}`});
    log(`
    👌安装完成：
    To get Start:
    ===========================
        cd ${name}
        npm run serve
    ===========================
                `);
    const open = require('open');
    open('http://localhost:8080')
    await spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run','serve'], { cwd: `./${name}`});
}