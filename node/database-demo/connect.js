const { MongoClient } = require("mongodb");

const url = "mongodb://admin:123456@127.0.0.1:27017";
var client = new MongoClient(url); // 创建客户端
// Database Name
const dbName = "myProject";
(async function () {
  // Use connect method to connect to the server
  let ret;
  console.log("start connect");
  const conn = await client.connect();// 建立连接
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const col = await db.collection("sites");
  // const col = await db.createCollection('sites');
  console.log("创建collection 成功");
  // ret  = await col.insertOne({ name: "菜鸟教程", url: "www.runoob" })
  // console.log(ret)
  var myobj = [
    { name: "菜鸟工具", url: "https://c.runoob.com", type: "cn", score: 5 },
    { name: "Google", url: "https://www.google.com", type: "en", score: 2 },
    { name: "Facebook", url: "https://www.google.com", type: "en", score:10  },
  ];
  // ret = await col.insertMany(myobj)
  // conn.close()
  // return
  // console.log(ret)
  ret = await col.find({}).toArray();
  var whereStr = { name: "菜鸟教程" }; // 查询条件
  // ret = await col.find(whereStr).toArray()
  var updateStr = { $set: { url: "https://www.runoob.com" } };
  // ret = await col.updateOne(whereStr,updateStr) // 更新数据

  whereStr = {"type":'en'};  // 查询条件
  // ret = await col.updateMany(whereStr, updateStr);


  whereStr = {'name': '菜鸟教程'}
  // ret = await col.deleteOne(whereStr) // 删除一条数据
  
  whereStr = { type: "en" }
  // ret = await col.deleteMany(whereStr) //删除多条

  var mysort = { score:-1}; // 按照score 字段 降序排序， 升序就设置为1
  // ret = await col.find({}).sort(mysort).toArray()

  // ret = await col.find().sort(mysort).limit(2).toArray() // 返回指定的条数

  // ret = await col.find().sort(mysort).skip(1).limit(2).toArray() // skip 用来跳过指定的条数

  // console.log(ret);
  // 左连接
  // 新建一个collections : orders ,pruducts
  // const orderCol = await db.createCollection('orders');
  // const productCol = await db.createCollection('products');
  // await orderCol.insertOne({ _id: 1, product_id: 154, status: 1 })
  // await productCol.insertMany([
  //   { _id: 154, name: '笔记本电脑' },
  //   { _id: 155, name: '耳机' },
  //   { _id: 156, name: '台式电脑' }
  // ])
  const orderCol = db.collection('orders');
  // const productCol = db.collection('products')
  // ret = await orderCol.aggregate([
  //   {
  //     $lookup:
  //     {
  //       from: 'products', // 右集合
  //       localField:'product_id', //左集合join 字段
  //       foreignField: '_id', // 右集合 join 字段
  //       as: 'orderdetails' // 新生成字段（类型array
  //     }
  //   }
  // ]).toArray()
  console.log(ret)

  
  conn.close();
})();
