
const {promisify} = require('util')
module.exports.clone = async (repo,desc) => {
    const download = promisify(require('download-git-repo'))
    const ora = require('ora') // 高版本的ora 不能使用require引入，必须使用import
    const process = ora(`下载${repo}中...`)
    process.start()
    await download(repo, desc)
    process.succeed()
}