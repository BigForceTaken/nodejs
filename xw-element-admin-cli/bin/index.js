#!/usr/bin/env node


// 1.使用命令行参数接收命令行 xw init <name> 来创建一个项目
// 创建文件夹

const { program } = require('commander');
const init = require('../lib/init')

program.version(require('../package.json').version)
program.command('create <name>')
        .description('create a vue-element-admin project')
        .action(init)

//接收命令行参数
program.parse(process.argv)