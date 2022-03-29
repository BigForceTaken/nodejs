const conf = require('./conf');
const { MongoClient } = require('mongodb');
const {EventEmitter} = require('events');

class Mongodb {
    constructor(conf){
      this.emitter = new EventEmitter();
      // 建立连接
      this.client = new MongoClient(conf.address);
      this.client.connect(err => {
          if(err) {
               throw err
          }
          console.log('connect success')
          this.emitter.emit('connect')
      })
    }

    col(col,dbName = conf.dbName) {
       return this.client.db(dbName).collection(col)
    }

    once(eventName,cb) {
        this.emitter.once(eventName,cb)
    }
}

module.exports = new Mongodb(conf);