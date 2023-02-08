
function promisify(fn) {
  return function() {
    return new Promise(async (resolve,rejected) => {
      let args = [...arguments,(err, data) => {
        if(err) {
          rejected(err)
          return
        }
        resolve(data)
      }];
      fn.apply(null,args)
    }).catch(err => {
      rejected(err)
    })
  }
}
const readFile = promisify(require('fs').readFile)

readFile('./config.js').then(data => {
  console.log(data.toString())
})