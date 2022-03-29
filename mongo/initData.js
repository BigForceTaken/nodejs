(async () => {
  const db = require('./db')
  db.once('connect',async () => {
      console.log('监听回调');
      await db.col('fruits').deleteMany()
      let arr = new Array(100).fill().map((v,i) => {
          return {
              name: 'xxx' + i,
              price: i,
              category: Math.random() < 0.5 ? '蔬菜': '水果'
          }
      })
      console.log(arr);

      await db.col('fruits').insertMany(arr)
      
      let ret = await db.col('fruits').find().toArray()
      console.log(ret);
  })
})()