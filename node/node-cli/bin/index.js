#! /usr/bin/env node

const {program} = require('commander')
const log = require('../lib/index')
// 定制version 命令
program.version(require('../package.json').version);
// 定制init命令
program.command('init <name>')
  .description('init name')
  .action(log)

program.parse(process.argv);