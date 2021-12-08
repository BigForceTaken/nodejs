/**
 * 但是，Node中的事件循环不只是 微任务队列和 宏任务队列：

微任务队列：
next tick queue：process.nextTick；
other queue：Promise的then回调、queueMicrotask；
宏任务队列：
timer queue：setTimeout、setInterval；
poll queue：IO事件；
check queue：setImmediate；
close queue：close事件；
所以，在每一次事件循环的tick中，会按照如下顺序来执行代码：

next tick microtask queue；
other microtask queue；
timer queue；
poll queue；
check queue；
close queue；
 */
async function async1() {
  console.log("async1 start"); // 2
  await async2();
  console.log("async1 end"); //9
}

async function async2() {
  console.log("async2"); // 3
}

console.log("script start"); // 1

setTimeout(function () {
  console.log("setTimeout0"); // 11
}, 0);

setTimeout(function () {
  console.log("setTimeout2"); // 13
}, 300);

setImmediate(() => console.log("setImmediate"));// 12

process.nextTick(() => console.log("nextTick1")); //7

async1();

process.nextTick(() => console.log("nextTick2")); //8

new Promise(function (resolve) {
  console.log("promise1"); // 4
  resolve();
  console.log("promise2"); // 5
}).then(function () {
  console.log("promise3"); // 10
});

console.log("script end"); // 6
