const EventEmmiter = require('events'); // httpServer也是继承自该类才有事件监听和分发功能
// const a = new EventEmitter();
// a.on('event1',function (params) {
//     console.log('event exec')
// });
// setTimeout(() => {

//     a.emit('event1')
// },1000)

// function MyClass(params) {
    
// }
// MyClass.prototype.__proto__ = EventEmitter.prototype; // node 中的继承方式

// const a = new MyClass();
// a.on("event",function (params) {
//     console.log('event exce1')
// })
// setTimeout(() => {
//     a.emit('event')
// }, 1000);


// 监听事件
const bus = new EventEmmiter();

function clickHanlde(args) {
  console.log("监听到click事件", args);
}

bus.on("click", clickHanlde);

setTimeout(() => {
  bus.emit("click", "coderwhy");
  bus.off("click", clickHanlde);
  bus.emit("click", "kobe");
}, 2000);

const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.once('click', (args) => {
  console.log("监听到事件", args);
})

setTimeout(() => {
  emitter.emit('click', 'coderwhy');
  emitter.emit('click', 'coderwhy');
}, 2000);

// 移除emitter上的所有事件监听
emitter.removeAllListeners();
// 移除emitter上的click事件监听
emitter.removeAllListeners("click");