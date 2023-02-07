const {Mongo} = require('./mongo')
const conf = require('./conf')
const mongo = new Mongo(conf);
mongo.once('connect',async () =>{
  console.log('连接成功')
  const col = mongo.col('fruits', 'myProject');
  await col.deleteMany();

  const data = new Array(100).fill().map((v,i) => ({
    name: 'XXX' + i,
    price: i,
    category: Math.random() > 0.5 ? '蔬菜' : '水果'
  }));
  console.log(JSON.stringify(data))
  await col.insertMany(data);

  mongo.conn.close()
})