/**
 * 事件循环的执行任务顺序是：
 * 1. 先执行主程序
 * 2. 再执行微任务
 * 3. 再执行宏任务
 * 事件循环中并非只维护着一个队列，事实上是有两个队列：

宏任务队列（macrotask queue）：ajax、setTimeout、setInterval、DOM监听、UI Rendering等
微任务队列（microtask queue）：Promise的then回调、 Mutation Observer API、queueMicrotask()等
 */
setTimeout(function () {
  // 宏任务执行
  console.log("set1");

  new Promise(function (resolve) {
    resolve();
  }).then(function () {
    new Promise(function (resolve) {
      resolve();
    }).then(function () {
      console.log("then4");
    });
    console.log("then2");
  });
});

new Promise(function (resolve) {
  console.log("pr1"); // 主程序执行
  resolve();
}).then(function () {
  // Promise.then() 微任务执行
  console.log("then1");
});

setTimeout(function () {
  // 宏任务执行
  console.log("set2");
});

console.log(2); // 主程序执行

queueMicrotask(() => {
  // 微任务执行 queueMicrotask
  console.log("queueMicrotask1");
});

new Promise(function (resolve) {
  resolve(); // 主程序执行
}).then(function () {
  console.log("then3");
});
/**
 * 预执行结果：
 * 第一轮：主程序代码执行
 * pr1 -> 2
 * 第二轮：微任务执行
 * then1 -> queueMicrotask1 -> then3
 * 第三轮：宏任务执行
 * set1
 * 第四轮：微任务执行
 * then2 -> then4
 * 第五轮：宏任务执行
 * set2
 */
