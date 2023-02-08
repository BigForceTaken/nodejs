const {MongoClient} = require('mongodb');
const {EventEmitter} = require('events')
const conf = require('./conf')
class Mongo {
  constructor(conf){
    this.conf = conf;
    this.emitter = new EventEmitter();
    this.client = new MongoClient(conf.url)
    this.client.connect().then((conn)=>{
      this.conn = conn;
      this.emitter.emit('connect')
    })
  }
  col(colName,dbName = 'test'){
    return this.client.db(dbName).collection(colName)
  }
  once(event ,cb) {
    this.emitter.on(event,cb)
  }
}

module.exports = new Mongo(conf)