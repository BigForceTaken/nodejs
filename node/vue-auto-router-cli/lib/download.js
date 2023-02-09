const {promisify} = require('util')
module.exports = async (repo, des) => {
    const ora = require('ora');
    const download = promisify(require('download-git-repo'))
    const process = ora('下载:' + repo);
    process.start()
    await download(repo,des)
    process.succeed();
}