const Koa = require("koa");

const bodyParser = require("koa-bodyparser");

const app = new Koa();

app.use(bodyParser());

// 初始化数据库
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");
const router = require("koa-router")();
// 加载用户 - 代替鉴权
app.use(async (ctx, next) => {
  const user = await User.findByPk(1);
  ctx.user = user;
  await next();
});
router.get('/', async (ctx, next) => {
  ctx.body= 'test page'
})
router.get("/admin/products", async (ctx, next) => {
  // const products = await ctx.user.getProducts()
  console.log('getproducts')
  const products = await Product.findAll();
  ctx.body = { prods: products };
});

router.post('/admin/product', async ctx => {
  const body = ctx.request.body
  const res = await ctx.user.createProduct(body)
  ctx.body = { success: true }
})

router.delete('/admin/product/:id', async (ctx, next) => {
  const id = ctx.params.id
  const res = await Product.destroy({
      where: {
          id
      }
  })
  ctx.body = { success: true }
})

router.post('/cart', async ctx => {
  const cart = await ctx.user.getCart()
  const products = await cart.getProducts()
  ctx.body = { products }
})

app.use(router.routes());

Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {
  through: CartItem,
});
Product.belongsToMany(Cart, {
  through: CartItem,
});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {
  through: OrderItem,
});
Product.belongsToMany(Order, {
  through: OrderItem,
});

sequelize.sync().then(async (result) => {
  let user = await User.findByPk(1);
  if (!user) {
    user = await User.create({
      name: "Sourav",
      email: "sourav.dey9@gmail.com",
    });
    await user.createCart();
  }
  app.listen(3000, () => console.log("Listening to port 3000"));
});

app.use(router.routes());
