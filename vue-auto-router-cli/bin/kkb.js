#!/usr/bin/env node

const  program = require('commander')
program.version('1.0.0')

program.command('init <name>').description('init project').action(require('../lib/init.js'))
program.command('watch').description('watch src').action(require('../lib/watch.js'))
//通过program.parse(arguments)方法处理参数
program.parse(process.argv)