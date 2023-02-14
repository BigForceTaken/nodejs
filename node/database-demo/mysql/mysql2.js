(async () => {
  const mysql = require('mysql2/promise')
  const cfg = {
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'test'
  }
  const conn = await mysql.createConnection(cfg);
  // console.log(conn)
  // 创建表
  // conn.execute(` 
  //   CREATE TABLE IF NOT EXISTS test (
  //     id INT NOT NULL AUTO_INCREMENT,
  //     message VARCHAR(45) NULL,
  //     PRIMARY KEY(id)
  //   )
  // `)
  // conn.execute(`
  //   INSERT INTO test(message) VALUES(?)
  // `,['ABC'])
  ret = await conn.execute(`
            SELECT * FROM test
    `)
    console.log(JSON.stringify(ret[0]));
  conn.end(); // 关闭客户端连接
})()