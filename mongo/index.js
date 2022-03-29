(async () => {
  const { MongoClient } = require("mongodb");

  const dbInfo = require("./conf");

  const client = new MongoClient(dbInfo.address);
  // 连接
  let conn = await client.connect();
//   console.log('ret', ret)
  let db = conn.db(dbInfo.dbName);
  let fruits = db.collection('fruits');
  // 插入
  let ret = await fruits.insertOne({name: '芒果', price: 6})
  // 查询
  ret = await fruits.find({price:{$gt: 5}}).toArray()
//   console.log('ret', ret);
    //更新
  await fruits.updateMany({name: '苹果'},{
      $set: {name: '芒果'}
  });

  ret = await fruits.find().toArray();
//   console.log('ret', ret);
  
  ret = await fruits.deleteOne({name: '苹果'});

  ret = await fruits.find().toArray();
  console.log('ret', ret);

})();
