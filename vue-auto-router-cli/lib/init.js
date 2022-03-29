const figlet = require("util").promisify(require('figlet'));
const clear = require('clear');
const chalk = require('chalk');
const log = (content) => console.log(chalk.green(content));

module.exports = async (name) => {
    clear();
    const data = await figlet(`Welcome ${name}!`)
    log(data)
}