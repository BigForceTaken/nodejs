const figlet = require("util").promisify(require('figlet'));
const clear = require('clear');
const chalk = require('chalk');
const log = (content) => console.log(chalk.green(content));
const { clone } = require('./download')
module.exports = async (name) => {
    clear();
    const data = await figlet(`Welcome ${name}!`)
    log(data)
    log('火箭 创建项目：'+ name);
    await clone('github:BigForceTaken/nodejs/tree/master/vue-template', name)
}