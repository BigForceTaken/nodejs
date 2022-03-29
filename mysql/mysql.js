(async () => {
  const mysql2 = require("mysql2/promise");
  const conn = await mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "test",
    password: "mysql3306",
  });
  let start = '3';
  let end = '5';
//   await conn.execute(`INSERT INTO students(class_id,name,gender,score) VALUES(?,?,?,?)`,['2','晓东','M', '100']);
  const [row, field] = await conn.execute('SELECT * FROM `students` LIMIT ? , ?',[start,end]); // 参数必须是字符串
  console.log(row);
//   await conn.execute('DELETE FROM students WHERE id = ?',['13']) // 删除
  await conn.execute('UPDATE students SET name=? WHERE id = ?',['小赵','10'])
//   console.log(field);
})();
