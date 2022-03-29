const { promisify } = require('util')
module.exports.clone = async (repo,desc) =>{
    // 打印日志
    const ora = require('ora');
    const process = ora(`download ${repo} 中...`);
    process.start();
    const download = promisify(require('download-git-repo'));
    await download(repo, desc);
    process.succeed();
}