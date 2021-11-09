module.exports = function (opts) {
    var time = opts.time || 100;
    return function (req, res, next) {
        var timer = setTimeout(() => {
            console.log('warning：request take too long', req.method, req.url)
            
        },time)
        var end = res.end;
        res.end = function (chunk, encoding) {
            clearTimeout(timer)
            res.end = end;
            res.end(chunk, encoding)
        }
        next()
    }
}