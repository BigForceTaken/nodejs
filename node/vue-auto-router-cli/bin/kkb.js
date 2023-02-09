#! /usr/bin/env node

const {program} = require('commander')
const log = require('../lib/index')
// 定制version 命令
program.version(require('../package.json').version);
// 定制init命令
program.command('init <name>')
  .description('init name')
  .action(log)
program.command('refresh')
  .description('auto generate router')
  .action(require('../lib/refresh'))
program.command("serve")
  .description("serve routers...")
  .action(require('../lib/serve.js'));
program.parse(process.argv);