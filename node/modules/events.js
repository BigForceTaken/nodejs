const EventEmitter = require('events').EventEmitter; // httpServer也是继承自该类才有事件监听和分发功能
// const a = new EventEmitter();
// a.on('event1',function (params) {
//     console.log('event exec')
// });
// setTimeout(() => {

//     a.emit('event1')
// },1000)

function MyClass(params) {
    
}
MyClass.prototype.__proto__ = EventEmitter.prototype; // node 中的继承方式

const a = new MyClass();
a.on("event",function (params) {
    console.log('event exce1')
})
setTimeout(() => {
    a.emit('event')
}, 1000);

