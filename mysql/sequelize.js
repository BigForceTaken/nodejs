 ( async () => {
    const { Sequelize, Model, DataTypes } = require('sequelize');
    
    let seq = new Sequelize('test','root','mysql3306',{
        host: 'localhost',
        dialect: 'mysql'
    });

    const Fruit = seq.define('Fruit',{
        name: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        price: { type: Sequelize.FLOAT, allowNull: false },
        stock: { type: Sequelize.INTEGER, defaultValue: 0 }
    },
    {  timestamps: false } // 避免生成时间戳
    )
    let ret = seq.sync({force: true}); //同步执行到数据库，如果定义了模型，没有执行该语句，不会同步创建数据库
    // seq.sync({force: true}); // 强制同步，删除数据库和数据
    //新增
    // ret = await Fruit.create({
    //     name: 'banana',
    //     price: 3.5
    // });
    // ret = await Fruit.findAll()
    // 更新
    // await Fruit.update(
    //     { price: 4, },
    //     {
    //         where: {
    //             name: 'banana'
    //         }
    //     }
    // )
    const Op = Sequelize.Op;
    ret = await Fruit.findAll({
        where: {
            price: {
                [Op.lt]: 5,
                [Op.gt]: 2
            }
        }
    })
     console.log('findAll', JSON.stringify(ret, '', '\t'))
    // 连接测试
    // try {
    //     await seq.authenticate();
    //     console.log('Connection has been established successfully.');
    //   } catch (error) {
    //     console.error('Unable to connect to the database:', error);
    //   }
 })();