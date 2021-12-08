async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");// 主程序执行

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();// 主程序执行

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});

console.log("script end");
/**
 * 1. 主程序执行
 * script start ->async1 start
 * 2. 微任务执行
 * async2 -> 
 * 3. 主程序执行
 * promise1 ->script end
 * 4. 微任务执行
 * async1 end ->promise2
 * 5. 宏任务执行
 * setTimeout
 */