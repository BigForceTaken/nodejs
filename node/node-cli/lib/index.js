const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const { promisify } = require("util");

figlet = promisify(figlet);
module.exports = async (name) => {
  clear();
  const data = await figlet("Welcome"); // 排版
  function log(str) {
    chalk.green(str);
  }
  log(data);
};
