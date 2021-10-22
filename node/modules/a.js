// exports 是默认导出的对象，实际上还是module.exports的引用
exports.a  = 'module a';
exports.b = 'module b';
//覆盖掉exports 默认的对象
module.exports = function a () {
    return 'function a'
}