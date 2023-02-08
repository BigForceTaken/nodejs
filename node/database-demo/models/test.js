const mongo = require('./mongo')

mongo.once('connect',async () =>{
  console.log('连接成功')
  const col = mongo.col('fruits', 'test');
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