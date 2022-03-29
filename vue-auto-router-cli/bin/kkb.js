#!/usr/bin/env node

const { program }= require('commander')
program.version('1.0.0')

program.command('init <name>').description('init project').action(require('../lib/init.js'))

//通过program.parse(arguments)方法处理参数
program.parse(process.argv)