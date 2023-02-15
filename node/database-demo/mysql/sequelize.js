(async () => {
  const  { Sequelize,DataTypes  } = require('sequelize')
  // 创建数据库连接
  const sequelize = new Sequelize('test', 'root', '12345', {
    host: 'localhost',
    dialect:'mysql' /*方言： 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */ // 
  });

  const Fruit = sequelize.define('Fruit',{
    id: { // 重新定义默认的id, 不重复id
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price:{
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: { msg: "价格字段请输入数字" },
        min: { args: [0], msg: "价格字段必须大于0" }
      }
    },
    stock:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  await Fruit.sync({
    force: true  // 强制同步， 如果表存在的话会删除
  }); // 同步模型： 创建表

  await Fruit.create({ // 插入数据
    name: '苹果',
    price: 3.0,
    stock: 100
  })

  let ret = await Fruit.findAll() // 查询所有
  // console.log(JSON.stringify(ret))

  let Op = Sequelize.Op;

  ret = await Fruit.findAll({where:{
    price :{
      [Op.gt]: 4
    }
  }})
  console.log(JSON.stringify(ret))
})()