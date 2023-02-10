const f1 = async function(next) {
  console.log('f1 start')
  await next()
  console.log('f1 end')
}

const f2 = async function(next) {
  console.log('f2 start')
  await next();
  console.log('f2 end')
}

const f3 = async function(next){
  console.log('f3')
}
const compose = (middleware) => {
  return () => {//  返回的函数递归调用传入的middleware
    return dispatch(0) // 执行返回的函数时，会递归去调用middleware，先从第一个开始，
    function dispatch(i) { // 那么定义的每一个中间件函数都接收一个参数就是next函数
      let fn = middleware[i];// next函数实际上就是去执行下一个中间件函数，
      if(!fn) {
       return Promise.resolve()
      }
      return Promise.resolve(
        fn(function next(){ // 直到不在执行next函数时再回去执行前一个函数,这就形成了洋葱圈模型
          return dispatch(i + 1)
        })
      )
    }
  }
}

const ret = compose([f1,f2,f3])
ret().then((res) => {
  console.log(11,res)
})