const watch= require('watch');
const path = require('path')
const refresh = require('./refresh')
/**
 * 监听src下面的文件变动，重新生成App.vue和router.js
 */
module.exports = async () => {
    let proc;
    let isRefresh = false;
    watch.watchTree(path.resolve(__dirname, '../hello/src'),async function() {
        if(!isRefresh) {
            isRefresh = true;
            proc && proc.kill();
            await refresh(path.resolve(__dirname, '../hello/src/views'))
            setTimeout(() => { isRefresh = false }, 5000)
            proc = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run','serve'],{ cwd: path.resolve(__dirname, '../hello')})
        }
    })
}

const spawn = (...args) => {
    const { spawn } = require('child_process');
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    return proc
}