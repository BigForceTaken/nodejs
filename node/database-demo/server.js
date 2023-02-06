(async function () {
  const express = require("express"),
    mongodb = require("mongodb"),
    cookieParser = require("cookie-parser"),
    session = require("express-session");
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session({ secret: "keyboard cat" }));
  // 连接mongo
  const { MongoClient } = require("mongodb");

  const url = "mongodb://admin:123456@127.0.0.1:27017";
  var client = new MongoClient(url);
  // Database Name
  const dbName = "myProject";
  console.log("start connect");
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("users");

  app.set("views", "./views");
  app.set("view engine", "pug");

  app.get("/", function (req, res) {
    res.render("index", { authenticated: false });
  });
  app.get("/login/:email", function (req, res) {
    console.log(req.params.email)
    res.render("login",{email: req.params.email});
  });
  app.get('/login', function(req, res){
    console.log(req.session)
    res.render('login')
  })
  app.post('/login', async function(req, res) {
   const results = await collection.findOne({email: req.body.email, password: req.body.password})
   console.log('results', results)
   if(results && results.email){
    req.session.loggedIn = results._id.toString();
    // res.redirect('/')
    res.render('index',{authenticated: true, me: req.body.email})
   } else {
    console.log('not found')
    return res.send('<p>User not found. Go back and try again.</p>')
   }
  })
  app.get("/signup", function (req, res) {
    res.render("signup");
  });
  app.get('/logout', function(req, res){
    req.session.loggedIn = null;
    res.redirect('/')
  })
  app.post("/register",async function (req, res) {
    console.log(req.headers['content-type'])
    console.log(req.body);
    const results = await collection.insertOne(req.body);
    console.log(results)
    if(results) {
        res.redirect('/login/'+ req.body.email);
    }
  });

  app.listen(3000);
})();
