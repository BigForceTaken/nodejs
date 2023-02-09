// 组合函数
const compose = (...fns) => (...args) => {
  let first = fns.shift();
  let ret = first(...args)
  fns.forEach(fn => {
      ret = fn(ret)    
  })
  return ret;
}
const f1 = (x,y) => x + y;
const f2 = (x) => x * x;

let fn = compose(f1,f2,f2)
console.log(fn(1,2))