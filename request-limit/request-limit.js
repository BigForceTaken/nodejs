/**
 * 实现同时只能执行2个的函数，如果多个传入则排队执行
 */
class RequestLimit {
    constructor(limit) {
        this.limit = limit;
        this.stackQueue = [];
        this.currentReqNum = 0;
    }
    async  request(fn){ // 传入执行队列的必须是一个函数
        if(!fn ) {
            throw new Error('fn is required')
        }
        if(Object.prototype.toString.call(fn) !== '[object Function]'){
            throw new Error('fn must be function')
        }
        if(this.currentReqNum >= this.limit) { // 如果前面有任务的话， 新建一个promise ，这个promise需要resolve才会执行完下一句
            await new Promise(resolve => this.stackQueue.push(resolve))
        }
        return this._handlerReq(fn)
    }

    async _handlerReq(fn) {
        this.currentReqNum++;
        try {
            await fn();
        } catch (error) {
            return new Promise.reject(err);
        } finally{
            this.currentReqNum--;
            if(this.stackQueue.length){
                this.stackQueue[0](); // 将最先进入阻塞队列的 Promise 从 Pending 变为 Fulfilled
                this.stackQueue.shift();
            }
        }
    }
}